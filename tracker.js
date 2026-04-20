// ============================================================
//  PRIDE QUIZ v2 — TRACKER.JS
// ============================================================
const TRACKER_KEY = 'pride_quiz_v2_stats';

function trackResult(charId, charName) {
  try {
    const stats = getStats();
    const today = new Date().toISOString().split('T')[0];
    stats.total = (stats.total || 0) + 1;
    if (!stats.characters) stats.characters = {};
    stats.characters[charId] = (stats.characters[charId] || 0) + 1;
    if (!stats.daily) stats.daily = {};
    stats.daily[today] = (stats.daily[today] || 0) + 1;
    if (!stats.sessions) stats.sessions = [];
    stats.sessions.unshift({
      charId, charName,
      date: new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }),
      ts: Date.now(),
    });
    if (stats.sessions.length > 100) stats.sessions = stats.sessions.slice(0, 100);
    localStorage.setItem(TRACKER_KEY, JSON.stringify(stats));
  } catch (e) { console.warn('Tracker error:', e); }
}

function getStats() {
  try { return JSON.parse(localStorage.getItem(TRACKER_KEY)) || {}; }
  catch { return {}; }
}
