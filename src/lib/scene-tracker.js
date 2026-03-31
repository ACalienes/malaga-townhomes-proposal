/**
 * @kameha/analytics - Scene Tracker
 * Tracks scene transitions and per-scene dwell time.
 */

import { addEvent } from './transport.js';

let _pollInterval = null;
let _currentScene = null;
let _sceneEnteredAt = null;
let _sceneDwell = {};  // { scene_id: { total_dwell_ms, enter_count } }

/**
 * Initialize scene tracking. Polls window.__deckActiveScene every 200ms.
 */
export function initSceneTracker() {
  if (typeof window === 'undefined') return;

  // Capture initial scene if already set
  _currentScene = window.__deckActiveScene || null;
  if (_currentScene) {
    _sceneEnteredAt = performance.now();
    _ensureDwellEntry(_currentScene);
    _sceneDwell[_currentScene].enter_count++;

    addEvent('scene_enter', { scene: _currentScene });
  }

  _pollInterval = setInterval(_pollScene, 200);
}

/**
 * Get scene dwell data as an array suitable for the flush payload.
 * @returns {Array<{scene_id, total_dwell_ms, enter_count}>}
 */
export function getSceneDwell() {
  // Update current scene dwell before returning
  _updateCurrentDwell();

  return Object.entries(_sceneDwell).map(([scene_id, data]) => ({
    scene_id,
    total_dwell_ms: Math.round(data.total_dwell_ms),
    enter_count: data.enter_count,
  }));
}

/**
 * Flush the scene tracker. Emits a final scene_exit for the current scene.
 * Called before transport flush on unload.
 */
export function flushSceneTracker() {
  if (_currentScene && _sceneEnteredAt !== null) {
    const dwell = performance.now() - _sceneEnteredAt;
    _ensureDwellEntry(_currentScene);
    _sceneDwell[_currentScene].total_dwell_ms += dwell;

    addEvent('scene_exit', {
      scene: _currentScene,
      dwell_ms: Math.round(dwell),
    });

    _sceneEnteredAt = performance.now();
  }
}

// --- Private ---

function _pollScene() {
  try {
    if (typeof window === 'undefined') return;

    const newScene = window.__deckActiveScene || null;

    if (newScene !== _currentScene) {
      const now = performance.now();

      // Exit previous scene
      if (_currentScene && _sceneEnteredAt !== null) {
        const dwell = now - _sceneEnteredAt;
        _ensureDwellEntry(_currentScene);
        _sceneDwell[_currentScene].total_dwell_ms += dwell;

        addEvent('scene_exit', {
          scene: _currentScene,
          dwell_ms: Math.round(dwell),
        });
      }

      // Enter new scene
      _currentScene = newScene;
      _sceneEnteredAt = now;

      if (_currentScene) {
        _ensureDwellEntry(_currentScene);
        _sceneDwell[_currentScene].enter_count++;

        addEvent('scene_enter', { scene: _currentScene });
      }
    }
  } catch (_e) { /* swallow */ }
}

function _updateCurrentDwell() {
  if (_currentScene && _sceneEnteredAt !== null) {
    const elapsed = performance.now() - _sceneEnteredAt;
    _ensureDwellEntry(_currentScene);
    // Do not add to total yet (that happens on exit). Just snapshot for reporting.
    // We temporarily add it so getSceneDwell returns accurate data.
    _sceneDwell[_currentScene].total_dwell_ms += elapsed;
    _sceneEnteredAt = performance.now();
  }
}

function _ensureDwellEntry(sceneId) {
  if (!_sceneDwell[sceneId]) {
    _sceneDwell[sceneId] = { total_dwell_ms: 0, enter_count: 0 };
  }
}

/**
 * Tear down scene tracker (for cleanup/testing).
 */
export function destroySceneTracker() {
  if (_pollInterval) {
    clearInterval(_pollInterval);
    _pollInterval = null;
  }
  _currentScene = null;
  _sceneEnteredAt = null;
  _sceneDwell = {};
}
