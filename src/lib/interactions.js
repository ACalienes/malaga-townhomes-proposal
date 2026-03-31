/**
 * @kameha/analytics - Interaction Events
 * Simple named event tracking with arbitrary data payloads.
 */

import { addEvent } from './transport.js';

/**
 * Track a named interaction event.
 * @param {string} eventName - descriptive event name (e.g. 'cta_click', 'option_select')
 * @param {object} [data={}] - arbitrary data payload
 */
export function track(eventName, data) {
  try {
    addEvent('interaction', {
      name: eventName,
      ...(data || {}),
    });
  } catch (_e) { /* swallow */ }
}
