/**
 * @kameha/analytics - Transport Module
 * Batching, buffering, and network delivery of analytics events.
 */

let _config = null;
let _buffer = [];
let _session = null;
let _sessionSent = false;
let _flushInterval = null;
let _sceneDwellGetter = null;

/**
 * Initialize the transport layer.
 * @param {object} config - { endpoint, apiKey, debug }
 * @param {function} getSession - returns current session object
 * @param {function} getSceneDwell - returns scene dwell array
 */
export function initTransport(config, getSession, getSceneDwell) {
  _config = config;
  _session = getSession;
  _sceneDwellGetter = getSceneDwell;
  _sessionSent = false;
  _buffer = [];

  _flushInterval = setInterval(flush, 10000);

  if (typeof document !== 'undefined') {
    try {
      document.addEventListener('visibilitychange', _onVisibilityChange);
    } catch (_e) { /* swallow */ }
  }

  if (typeof window !== 'undefined') {
    try {
      window.addEventListener('beforeunload', _onBeforeUnload);
    } catch (_e) { /* swallow */ }
  }
}

/**
 * Add an event to the buffer.
 * @param {string} type - event type (click, scroll, scene_enter, scene_exit, interaction)
 * @param {object} data - event payload
 */
export function addEvent(type, data) {
  if (!_config) return;

  const event = {
    type,
    timestamp: new Date().toISOString(),
    data: data || {},
  };

  _buffer.push(event);

  if (_config.debug) {
    try {
      console.log('[KA]', type, event.data);
    } catch (_e) { /* swallow */ }
  }
}

/**
 * Flush buffered events to the configured endpoint.
 * Uses fetch for normal flushes, sendBeacon for unload scenarios.
 */
export async function flush() {
  if (!_config || _buffer.length === 0) return;

  const events = _buffer.splice(0);
  const payload = _buildPayload(events);

  try {
    const res = await fetch(_config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': _config.apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      _sessionSent = true;
    } else {
      // Put events back on failure
      _buffer.unshift(...events);
    }
  } catch (_e) {
    // Put events back on network failure
    _buffer.unshift(...events);
  }
}

/**
 * Flush via sendBeacon (for unload/visibility change).
 */
function _beaconFlush() {
  if (!_config || _buffer.length === 0) return;

  const events = _buffer.splice(0);
  const payload = _buildPayload(events);

  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const sent = navigator.sendBeacon(_config.endpoint, blob);
      if (sent) {
        _sessionSent = true;
      } else {
        _buffer.unshift(...events);
      }
    } else {
      // Fallback: try fetch with keepalive
      fetch(_config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': _config.apiKey,
        },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
      _sessionSent = true;
    }
  } catch (_e) {
    // Swallow errors silently. Never break the deck.
  }
}

function _buildPayload(events) {
  const payload = {
    events,
    scene_dwell: _sceneDwellGetter ? _sceneDwellGetter() : [],
  };

  if (!_sessionSent && _session) {
    payload.session = typeof _session === 'function' ? _session() : _session;
  }

  return payload;
}

function _onVisibilityChange() {
  try {
    if (document.hidden) {
      _beaconFlush();
    }
  } catch (_e) { /* swallow */ }
}

function _onBeforeUnload() {
  try {
    _beaconFlush();
  } catch (_e) { /* swallow */ }
}

/**
 * Tear down transport (for cleanup/testing).
 */
export function destroyTransport() {
  if (_flushInterval) {
    clearInterval(_flushInterval);
    _flushInterval = null;
  }

  if (typeof document !== 'undefined') {
    try {
      document.removeEventListener('visibilitychange', _onVisibilityChange);
    } catch (_e) { /* swallow */ }
  }

  if (typeof window !== 'undefined') {
    try {
      window.removeEventListener('beforeunload', _onBeforeUnload);
    } catch (_e) { /* swallow */ }
  }

  _config = null;
  _buffer = [];
  _session = null;
  _sessionSent = false;
  _sceneDwellGetter = null;
}
