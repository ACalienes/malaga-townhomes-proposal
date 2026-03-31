/**
 * @kameha/analytics - Core Tracker
 * Session management, visitor identity, click/scroll tracking.
 */

import { addEvent } from './transport.js';

const VID_KEY = '_ka_vid';
const SID_KEY = '_ka_sid';

let _session = null;
let _config = null;
let _maxScrollDepth = 0;
let _lastScrollProgress = -1;
let _scrollInterval = null;

/**
 * Initialize the tracker. Generates/restores visitor ID, creates session.
 * @param {object} config - { projectId, debug }
 * @returns {object} session object
 */
export function initTracker(config) {
  if (typeof window === 'undefined') return null;

  _config = config;

  const visitorId = _getOrCreateVisitorId();
  const sessionId = crypto.randomUUID();

  _session = {
    id: sessionId,
    project_id: config.projectId,
    visitor_id: visitorId,
    device: _detectDevice(),
    viewport_w: window.innerWidth,
    viewport_h: window.innerHeight,
    user_agent: navigator.userAgent || '',
    referrer: document.referrer || '',
    started_at: new Date().toISOString(),
  };

  _startClickTracking();
  _startScrollTracking();

  return _session;
}

/**
 * Get the current session object.
 */
export function getSession() {
  return _session;
}

/**
 * Get the persisted visitor ID.
 */
export function getVisitorId() {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(VID_KEY);
  } catch (_e) {
    return null;
  }
}

/**
 * Get the max scroll depth reached in this session.
 */
export function getMaxScrollDepth() {
  return _maxScrollDepth;
}

// --- Private ---

function _getOrCreateVisitorId() {
  try {
    let vid = localStorage.getItem(VID_KEY);
    if (!vid) {
      vid = crypto.randomUUID();
      localStorage.setItem(VID_KEY, vid);
    }
    return vid;
  } catch (_e) {
    // localStorage unavailable (private browsing, etc.)
    return crypto.randomUUID();
  }
}

function _detectDevice() {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function _startClickTracking() {
  try {
    document.addEventListener('click', _onDocumentClick, { passive: true, capture: true });
  } catch (_e) { /* swallow */ }
}

function _onDocumentClick(e) {
  try {
    const el = e.target;
    if (!el) return;

    let textContent = '';
    try {
      textContent = (el.textContent || '').trim().slice(0, 50);
    } catch (_e) { /* swallow */ }

    addEvent('click', {
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
      tag: el.tagName ? el.tagName.toLowerCase() : '',
      id: el.id || '',
      classList: el.classList ? Array.from(el.classList).join(' ') : '',
      text: textContent,
      scene: (typeof window !== 'undefined' && window.__deckActiveScene) || null,
    });
  } catch (_e) { /* swallow */ }
}

function _startScrollTracking() {
  _scrollInterval = setInterval(_sampleScroll, 250);
}

function _sampleScroll() {
  try {
    let progress;

    // Prefer deck-specific scroll progress if available
    if (typeof window !== 'undefined' && typeof window.__deckScrollProgress === 'number') {
      progress = window.__deckScrollProgress;
    } else {
      // Fallback to standard scroll progress
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    }

    // Round to 4 decimal places
    progress = Math.round(progress * 10000) / 10000;

    // Only record if changed by more than 0.01
    if (Math.abs(progress - _lastScrollProgress) > 0.01) {
      _lastScrollProgress = progress;

      if (progress > _maxScrollDepth) {
        _maxScrollDepth = progress;
      }

      addEvent('scroll', {
        progress,
        max_depth: _maxScrollDepth,
        scene: (typeof window !== 'undefined' && window.__deckActiveScene) || null,
      });
    }
  } catch (_e) { /* swallow */ }
}

/**
 * Tear down tracker (for cleanup/testing).
 */
export function destroyTracker() {
  if (_scrollInterval) {
    clearInterval(_scrollInterval);
    _scrollInterval = null;
  }

  try {
    document.removeEventListener('click', _onDocumentClick, { capture: true });
  } catch (_e) { /* swallow */ }

  _session = null;
  _config = null;
  _maxScrollDepth = 0;
  _lastScrollProgress = -1;
}
