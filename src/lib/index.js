/**
 * @kameha/analytics - Public API
 * Lightweight, zero-dependency analytics for Kameha pitch decks.
 *
 * Usage:
 *   import { initAnalytics, track } from '@kameha/analytics';
 *
 *   initAnalytics({
 *     projectId: 'malaga-townhomes',
 *     endpoint: 'https://xyz.supabase.co/functions/v1/ingest',
 *     apiKey: 'your-supabase-anon-key',
 *     debug: false,
 *   });
 *
 *   track('cta_click', { option: 'growth' });
 */

import { initTransport } from './transport.js';
import { initTracker, getSession } from './tracker.js';
import { initSceneTracker, getSceneDwell, flushSceneTracker } from './scene-tracker.js';
import { track } from './interactions.js';

let _initialized = false;

/**
 * Initialize the Kameha analytics tracker.
 * @param {object} config
 * @param {string} config.projectId - Project identifier (e.g. 'malaga-townhomes')
 * @param {string} config.endpoint - Supabase edge function URL for event ingestion
 * @param {string} config.apiKey - Supabase anon key
 * @param {boolean} [config.debug=false] - Log events to console with [KA] prefix
 */
export function initAnalytics(config) {
  if (typeof window === 'undefined') return;
  if (_initialized) return;

  // Validate required config
  if (!config || !config.projectId || !config.endpoint || !config.apiKey) {
    console.warn('[KA] Missing required config: projectId, endpoint, and apiKey are required.');
    return;
  }

  const resolvedConfig = {
    projectId: config.projectId,
    endpoint: config.endpoint,
    apiKey: config.apiKey,
    debug: config.debug || false,
  };

  // Initialize tracker first (creates session)
  initTracker(resolvedConfig);

  // Initialize transport with session getter and scene dwell getter
  initTransport(resolvedConfig, getSession, getSceneDwell);

  // Initialize scene tracker (starts polling)
  initSceneTracker();

  // Hook scene tracker flush into beforeunload/visibilitychange
  // so scene dwell is captured before transport flushes
  if (typeof document !== 'undefined') {
    try {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) flushSceneTracker();
      });
    } catch (_e) { /* swallow */ }
  }

  if (typeof window !== 'undefined') {
    try {
      window.addEventListener('beforeunload', () => flushSceneTracker());
    } catch (_e) { /* swallow */ }
  }

  _initialized = true;

  if (resolvedConfig.debug) {
    console.log('[KA] Analytics initialized for project:', resolvedConfig.projectId);
  }
}

export { track };
