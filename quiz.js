// ============================================================
//  PRIDE QUIZ v3 — QUIZ.JS
//  Flow: intro → hello → onboard2 → q1-3 → onboard4 →
//        q4-6 → onboard6 → q7-9 → onboard8 → q10 → result
// ============================================================

let currentQuestionIndex = 0;
let answers = [];
let resultCharId = null;
let _skipTyping = false;

// ─── SCREEN NAVIGATION ───────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
    s.style.opacity = '';
    s.style.transition = '';
  });
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'flex';
  void el.offsetHeight;
  el.classList.add('active');
  window.scrollTo(0, 0);
}

// ─── ASYNC HELPERS ───────────────────────────────────────────
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Type text into element character by character (pre-wrap for \n)
function typeText(el, text, speed = 36) {
  return new Promise(resolve => {
    el.textContent = '';
    el.classList.remove('done');
    let i = 0;
    function tick() {
      if (_skipTyping) {
        el.textContent = text;
        el.classList.add('done');
        resolve();
        return;
      }
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        el.classList.add('done');
        resolve();
        return;
      }
      setTimeout(tick, speed);
    }
    setTimeout(tick, speed);
  });
}

// Slide a character in by adding slide-in class
function slideChar(el, delay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      el.classList.add('slide-in');
      // resolve after animation (~900ms max)
      setTimeout(resolve, 900);
    }, delay);
  });
}

// Show bubble
function showBubble(el) {
  el.classList.add('show');
}

// Show action button
function showBtn(el) {
  el.classList.add('show');
}

// ─── ONBOARDING 1 — HELLO ────────────────────────────────────
function goToOnboarding() {
  showScreen('screen-hello');
  const helloEl = document.getElementById('helloText');
  helloEl.classList.remove('visible');

  setTimeout(() => helloEl.classList.add('visible'), 200);
  setTimeout(() => helloEl.classList.remove('visible'), 1600);
  setTimeout(() => startOnboard2(), 2500);
}

// ─── ONBOARDING 2 — SCENE 1 ──────────────────────────────────
async function startOnboard2() {
  showScreen('screen-onboard2');
  _skipTyping = false;

  const mainEl  = document.getElementById('ob2-main');
  const leftEl  = document.getElementById('ob2-left');
  const rightEl = document.getElementById('ob2-right');
  const bubble  = document.getElementById('ob2-bubble');
  const textEl  = document.getElementById('ob2-text');
  const skipBtn = document.getElementById('ob2-skip');
  const startBtn = document.getElementById('ob2-start');

  // Reset state
  [mainEl, leftEl, rightEl].forEach(e => { e.classList.remove('slide-in'); });
  bubble.classList.remove('show');
  startBtn.classList.remove('show');
  skipBtn.style.display = 'block';
  textEl.textContent = '';
  textEl.classList.remove('done');

  // Skip button: jump to end
  skipBtn.onclick = () => {
    _skipTyping = true;
    ob2Finish(bubble, textEl, skipBtn, startBtn);
  };

  // Slide characters in
  slideChar(mainEl, 100);
  await wait(350);
  slideChar(leftEl, 0);
  slideChar(rightEl, 100);
  await wait(600);

  if (_skipTyping) return;
  showBubble(bubble);
  await wait(200);

  const msgs = [
    'นี่คือ "ขบวนแห่งความภูมิใจ"\nและต่อจากนี้... คือพื้นที่\nที่คุณจะได้ประกาศตัวตน 🌈',
    'ถึงเวลาเช็กอินตำแหน่งหัวใจ...',
    'เลือกคำตอบที่ใช่\nแล้วก้าวเดินไปในแบบที่เป็นคุณ✨',
  ];

  for (let i = 0; i < msgs.length; i++) {
    await typeText(textEl, msgs[i]);
    if (_skipTyping) break;
    if (i < msgs.length - 1) await wait(950);
  }

  ob2Finish(bubble, textEl, skipBtn, startBtn);
}

function ob2Finish(bubble, textEl, skipBtn, startBtn) {
  _skipTyping = false;
  bubble.classList.add('show');
  textEl.classList.add('done');
  skipBtn.style.display = 'none';
  showBtn(startBtn);
}

function ob2SkipAll() {
  _skipTyping = true;
}

// ─── START QUIZ ───────────────────────────────────────────────
function startQuiz() {
  currentQuestionIndex = 0;
  answers = [];
  showScreen('screen-question');
  renderQuestion();
}

// ─── RENDER QUESTION ─────────────────────────────────────────
function renderQuestion() {
  const q = QUESTIONS[currentQuestionIndex];
  const total = QUESTIONS.length;
  const pct = ((currentQuestionIndex + 1) / total) * 100;

  const prog = document.getElementById('qProgress');
  if (prog) prog.style.width = Math.max(pct, 5) + '%';

  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  void card.offsetHeight;
  card.style.animation = '';

  document.getElementById('questionText').innerHTML = q.text.replace(/\n/g, '<br/>');

  const list = document.getElementById('optionsList');
  list.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = opt.text.replace(/\n/g, '<br/>');
    btn.setAttribute('data-index', i);
    btn.onclick = () => selectOption(i, btn);
    list.appendChild(btn);
  });
}

// ─── SELECT OPTION ────────────────────────────────────────────
function selectOption(optionIndex, btn) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  btn.disabled = true;
  answers.push({ qIndex: currentQuestionIndex, optionIndex });
  setTimeout(() => advance(), 400);
}

// ─── ADVANCE ─────────────────────────────────────────────────
function advance() {
  currentQuestionIndex++;

  if (currentQuestionIndex === 3) { startOnboard4(); return; }
  if (currentQuestionIndex === 6) { startOnboard6(); return; }
  if (currentQuestionIndex === 9) { startOnboard8(); return; }
  if (currentQuestionIndex >= QUESTIONS.length) { showOutro(); return; }

  showScreen('screen-question');
  renderQuestion();
}

// ─── ONBOARDING 4 — SCENE 2 (break after q3) ─────────────────
async function startOnboard4() {
  showScreen('screen-onboard4');
  _skipTyping = false;

  const mainEl  = document.getElementById('ob4-main');
  const leftEl  = document.getElementById('ob4-left');
  const rightEl = document.getElementById('ob4-right');
  const bubble  = document.getElementById('ob4-bubble');
  const textEl  = document.getElementById('ob4-text');
  const btn     = document.getElementById('ob4-btn');

  [mainEl, leftEl, rightEl].forEach(e => e.classList.remove('slide-in'));
  bubble.classList.remove('show');
  btn.classList.remove('show');
  textEl.textContent = '';
  textEl.classList.remove('done');

  slideChar(mainEl, 100);
  await wait(350);
  slideChar(leftEl, 0);
  slideChar(rightEl, 100);
  await wait(600);

  if (_skipTyping) { ob4Finish(bubble, textEl, btn); return; }
  showBubble(bubble);
  await wait(200);

  const msgs = [
    'โอ้โห .... คุณน่าสนใจกว่าที่คิดไว้มากเลยนะ !',
    'ขบวนนี้จะสมบูรณ์ไม่ได้เลย\nถ้าขาดคนแบบคุณนะเนี่ย',
  ];
  for (let i = 0; i < msgs.length; i++) {
    await typeText(textEl, msgs[i]);
    if (_skipTyping) break;
    if (i < msgs.length - 1) await wait(950);
  }

  ob4Finish(bubble, textEl, btn);
}

function ob4Finish(bubble, textEl, btn) {
  _skipTyping = false;
  bubble.classList.add('show');
  textEl.classList.add('done');
  showBtn(btn);
}

function continueToSet2() {
  showScreen('screen-question');
  renderQuestion();
}

// ─── ONBOARDING 6 — SCENE 3 (break after q6) ─────────────────
async function startOnboard6() {
  showScreen('screen-onboard6');
  _skipTyping = false;

  const leftEl = document.getElementById('ob6-left');
  const rightEl = document.getElementById('ob6-right');
  const bubble  = document.getElementById('ob6-bubble');
  const textEl  = document.getElementById('ob6-text');
  const btn     = document.getElementById('ob6-btn');

  [leftEl, rightEl].forEach(e => e.classList.remove('slide-in'));
  bubble.classList.remove('show');
  btn.classList.remove('show');
  textEl.textContent = '';
  textEl.classList.remove('done');

  slideChar(leftEl, 100);
  slideChar(rightEl, 400);
  await wait(900);

  if (_skipTyping) { ob6Finish(bubble, textEl, btn); return; }
  showBubble(bubble);
  await wait(200);

  const msgs = [
    'เยี่ยมไปเลยล่ะ!\nพวกเราเริ่มเห็นบทบาทของคุณแล้ว',
    'แต่ขออุ๊บไว้ก่อนนะ\nยังเหลืออีกนิด ไปต่อกันก่อน ~',
  ];
  for (let i = 0; i < msgs.length; i++) {
    await typeText(textEl, msgs[i]);
    if (_skipTyping) break;
    if (i < msgs.length - 1) await wait(950);
  }

  ob6Finish(bubble, textEl, btn);
}

function ob6Finish(bubble, textEl, btn) {
  _skipTyping = false;
  bubble.classList.add('show');
  textEl.classList.add('done');
  showBtn(btn);
}

function continueToSet3() {
  showScreen('screen-question');
  renderQuestion();
}

// ─── ONBOARDING 8 — SCENE 4 (break after q9, auto-advance) ───
async function startOnboard8() {
  showScreen('screen-onboard8');
  _skipTyping = false;

  const botLeft  = document.getElementById('ob8-botleft');
  const topRight = document.getElementById('ob8-topright');
  const bubble   = document.getElementById('ob8-bubble');
  const textEl   = document.getElementById('ob8-text');

  [botLeft, topRight].forEach(e => e.classList.remove('slide-in'));
  bubble.classList.remove('show');
  textEl.textContent = '';
  textEl.classList.remove('done');

  slideChar(botLeft, 100);
  await wait(600);
  slideChar(topRight, 0);
  await wait(700);

  showBubble(bubble);
  await wait(200);

  const msgs = [
    'ขบวนกำลังเริ่มเคลื่อน\nและมีที่ว่างสำหรับคุณอยู่เสมอ',
    'คำถามสุดท้ายแล้ว\nตอบให้ตรงใจที่สุดนะ :)',
  ];
  for (let i = 0; i < msgs.length; i++) {
    await typeText(textEl, msgs[i]);
    if (i < msgs.length - 1) await wait(950);
  }
  textEl.classList.add('done');

  // Fade screen out → enter last question
  await wait(900);
  const screen = document.getElementById('screen-onboard8');
  screen.style.transition = 'opacity 0.9s ease';
  screen.style.opacity = '0';
  await wait(950);

  showScreen('screen-question');
  renderQuestion();
}

// ─── OUTRO / LOADING ─────────────────────────────────────────
function showOutro() {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  const loadEl = document.createElement('div');
  loadEl.className = 'screen active';
  loadEl.id = 'screen-loading-temp';
  loadEl.style.cssText = [
    'display:flex', 'flex-direction:column', 'align-items:center',
    'justify-content:center', 'gap:24px',
    'background:linear-gradient(160deg,#f8f0ff 0%,#ede0ff 40%,#e0f0ff 100%)',
    'min-height:100svh', 'max-width:390px', 'margin:0 auto',
    'animation:screenFadeIn 0.4s both',
  ].join(';');

  loadEl.innerHTML = `
    <div style="font-size:2.6rem;animation:mainCharFloat 3s ease-in-out infinite;">🎉</div>
    <div style="font-family:'LINE Seed Sans TH',sans-serif;font-size:1.2rem;font-weight:700;color:#1a1a2e;text-align:center;line-height:1.55;">
      กำลังค้นหาตัวตนของคุณ<br/>ในขบวน...
    </div>
    <div class="loading-dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot"></div>
    </div>
    <div id="loadingText" style="font-family:'LINE Seed Sans TH',sans-serif;font-size:0.95rem;color:rgba(80,60,120,0.6);transition:opacity 0.2s;">
      วิเคราะห์บุคลิกของคุณ... 🌈
    </div>
  `;
  document.body.appendChild(loadEl);

  const texts = [
    'วิเคราะห์บุคลิกของคุณ... 🌈',
    'จับคู่กับขบวน... ✨',
    'ค้นหาตัวตนของคุณ... 🎭',
    'เกือบแล้ว... 💫',
  ];
  let ti = 0;
  const textEl = loadEl.querySelector('#loadingText');
  const interval = setInterval(() => {
    ti = (ti + 1) % texts.length;
    textEl.style.opacity = '0';
    setTimeout(() => { textEl.textContent = texts[ti]; textEl.style.opacity = '1'; }, 220);
  }, 850);

  setTimeout(() => {
    clearInterval(interval);
    loadEl.remove();
    const { charId } = calculateResult(answers);
    resultCharId = charId;
    buildResultScreen(charId);
    showScreen('screen-result');
    launchConfetti();
    if (typeof trackResult === 'function') trackResult(charId, CHARACTERS[charId].name);
  }, 3200);
}

// ─── BUILD RESULT SCREEN ─────────────────────────────────────
function buildResultScreen(charId) {
  const char = CHARACTERS[charId];

  const header = document.getElementById('resultHeader');
  header.style.background = `linear-gradient(180deg, ${char.c1}55 0%, transparent 100%)`;

  const charImgTag = char.image
    ? `<img src="images/${encodeURIComponent(char.image)}" class="result-char-img" alt="${char.name}"/>`
    : `<div class="result-char-body" style="background:${char.gradient};">${char.blush ? '<div class="blush l"></div><div class="blush r"></div>' : ''}</div><div class="result-char-flag">🏳️‍🌈</div>`;

  header.innerHTML = `
    <div class="result-logo-bar">
      <img src="images/logopride.png" alt="Logo" class="result-logo-img"/>
    </div>
    <div class="result-char-display">
      ${charImgTag}
    </div>
  `;

  document.getElementById('resultName').textContent    = char.name;
  document.getElementById('resultTagline').textContent = char.tagline;
  document.getElementById('resultDesc').textContent    = char.desc;

  const matchChar = CHARACTERS[char.matchId] || CHARACTERS.sunshine;
  const matchImgTag = matchChar.image
    ? `<img src="images/${encodeURIComponent(matchChar.image)}" class="match-char-img" alt="${matchChar.name}"/>`
    : `<div class="match-char-mini" style="background:${matchChar.gradient};"></div>`;

  document.getElementById('matchCharRow').innerHTML = `
    ${matchImgTag}
    <div class="match-char-info">
      <span class="match-char-en">${matchChar.name}</span>
      <span class="match-char-th">${matchChar.thai}</span>
    </div>
  `;

  const dotsEl = document.getElementById('paradeDots');
  dotsEl.innerHTML = char.parades.map(p => `
    <div class="parade-dot">
      <div class="parade-dot-circle" style="background:${p.color};"></div>
      <span>${p.label}</span>
    </div>
  `).join('');
}

// ─── CONFETTI ─────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#ff6b6b','#ffa040','#ffd700','#60d060','#60a0ff','#c060ff','#ff80b0','#fff'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.cssText = `
        left:${Math.random() * 100}vw; top:0;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        width:${Math.random() * 10 + 5}px; height:${Math.random() * 10 + 5}px;
        border-radius:${Math.random() > 0.5 ? '50%' : '3px'};
        animation-duration:${Math.random() * 2 + 2.5}s;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }, Math.random() * 1500);
  }
}

// ─── SAVE IMAGE — Pure Canvas 9:16 portrait ──────────────────
async function saveImage() {
  const saveBtn = document.querySelector('.btn-save');
  if (saveBtn) { saveBtn.classList.add('loading'); saveBtn.textContent = 'กำลังสร้างรูป...'; }

  try {
    await document.fonts.ready;
    const char = CHARACTERS[resultCharId];
    if (!char) return;

    const W = 1080, H = 1920;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');

    const matchChar = CHARACTERS[char.matchId];

    // Load all images (errors silently caught)
    const [charImg, logoImg, bgImg, matchImg] = await Promise.all([
      char.image   ? _loadImg('images/' + char.image)         : Promise.resolve(null),
      _loadImg('images/logopride.png'),
      _loadImg('images/homepage.png'),
      (matchChar && matchChar.image) ? _loadImg('images/' + matchChar.image) : Promise.resolve(null),
    ].map(p => p.catch(() => null)));

    // ── Background gradient ──
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0,    '#f5e8ff');
    bgGrad.addColorStop(0.45, '#eedcff');
    bgGrad.addColorStop(1,    '#e8f4ff');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // homepage.png faint bg
    if (bgImg) {
      ctx.globalAlpha = 0.10;
      const bh = bgImg.height * (W / bgImg.width);
      ctx.drawImage(bgImg, 0, 0, W, bh);
      ctx.globalAlpha = 1;
    }

    // Character color radial accent
    const [r1,g1,b1] = _hexRgb(char.c1);
    const splash = ctx.createRadialGradient(W/2, 540, 60, W/2, 540, 500);
    splash.addColorStop(0, `rgba(${r1},${g1},${b1},0.55)`);
    splash.addColorStop(1, `rgba(${r1},${g1},${b1},0)`);
    ctx.fillStyle = splash;
    ctx.fillRect(0, 0, W, H);

    // ── Logo ──
    if (logoImg) {
      const lW = 270, lH = logoImg.height * (lW / logoImg.width);
      ctx.drawImage(logoImg, (W - lW) / 2, 52, lW, lH);
    }

    // ── Character image ──
    const CHAR_H = 640;
    if (charImg) {
      const cW = charImg.width * (CHAR_H / charImg.height);
      ctx.drawImage(charImg, (W - cW) / 2, 175, cW, CHAR_H);
    }

    // ── White card ──
    const CARD_X = 48, CARD_Y = 740;
    const CARD_W = W - 96, CARD_H = H - CARD_Y - 52;
    const PX = CARD_X + 68, PW = CARD_W - 136;

    ctx.shadowColor = 'rgba(140,90,220,0.22)';
    ctx.shadowBlur = 80; ctx.shadowOffsetY = 18;
    _rrect(ctx, CARD_X, CARD_Y, CARD_W, CARD_H, 58);
    ctx.fillStyle = 'rgba(255,255,255,0.94)';
    ctx.fill();
    ctx.shadowBlur = 0; ctx.shadowColor = 'transparent'; ctx.shadowOffsetY = 0;

    let cy = CARD_Y + 68;

    // Name
    ctx.font = `900 90px "LINE Seed Sans TH", sans-serif`;
    ctx.fillStyle = '#1a1a2e';
    ctx.textAlign = 'center';
    ctx.fillText(char.name, W / 2, cy + 90);
    cy += 115;

    // Tagline
    ctx.font = `600 44px "LINE Seed Sans TH", sans-serif`;
    ctx.fillStyle = '#7766aa';
    ctx.fillText(char.tagline, W / 2, cy + 44);
    cy += 76;

    // Divider
    ctx.strokeStyle = 'rgba(200,180,240,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PX, cy); ctx.lineTo(PX + PW, cy); ctx.stroke();
    cy += 44;

    // Description box
    ctx.font = `400 40px "LINE Seed Sans TH", sans-serif`;
    const descLines = _wrap(ctx, char.desc, PW);
    const descBoxH = descLines.length * 62 + 44;
    ctx.fillStyle = 'rgba(240,235,255,0.58)';
    _rrect(ctx, PX, cy, PW, descBoxH, 22); ctx.fill();
    cy += 30;
    ctx.fillStyle = '#444466';
    descLines.forEach(ln => { cy += 50; ctx.fillText(ln, W / 2, cy); cy += 12; });
    cy += 28;

    // Match section
    cy += 30;
    ctx.font = `500 33px "LINE Seed Sans TH", sans-serif`;
    ctx.fillStyle = '#aaaacc';
    ctx.textAlign = 'left';
    ctx.fillText('คุณเข้ากันได้ดีกับ...', PX, cy + 33);
    cy += 60;

    if (matchImg && matchChar) {
      const mH = 108, mW = matchImg.width * (mH / matchImg.height);
      ctx.fillStyle = 'rgba(240,235,255,0.58)';
      _rrect(ctx, PX, cy, PW, 128, 22); ctx.fill();
      ctx.drawImage(matchImg, PX + 18, cy + 10, mW, mH);
      const tx = PX + mW + 36;
      ctx.font = `700 42px "LINE Seed Sans TH", sans-serif`;
      ctx.fillStyle = '#1a1a2e';
      ctx.fillText(matchChar.name, tx, cy + 56);
      ctx.font = `400 36px "LINE Seed Sans TH", sans-serif`;
      ctx.fillStyle = '#888899';
      ctx.fillText(matchChar.thai, tx, cy + 102);
    }
    cy += 148;

    // Parade dots
    if (char.parades && char.parades.length) {
      ctx.font = `500 33px "LINE Seed Sans TH", sans-serif`;
      ctx.fillStyle = '#aaaacc';
      ctx.textAlign = 'left';
      ctx.fillText('คุณเหมาะกับ...', PX, cy + 33);
      cy += 60;
      let dx2 = PX;
      char.parades.forEach(p => {
        ctx.beginPath(); ctx.arc(dx2 + 15, cy + 15, 15, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.font = `600 36px "LINE Seed Sans TH", sans-serif`;
        ctx.fillStyle = '#1a1a2e'; ctx.textAlign = 'left';
        ctx.fillText(p.label, dx2 + 40, cy + 22);
        dx2 += ctx.measureText(p.label).width + 78;
      });
    }

    // Footer hashtag (bottom of card)
    ctx.font = `500 33px "LINE Seed Sans TH", sans-serif`;
    ctx.fillStyle = 'rgba(150,120,210,0.65)';
    ctx.textAlign = 'center';
    ctx.fillText('#PatchTheWorld  #BangkokPride  🏳️‍🌈', W / 2, CARD_Y + CARD_H - 48);

    // ── Download ──
    const link = document.createElement('a');
    link.download = `pride-quiz-${char.id}.png`;
    link.href = cv.toDataURL('image/png');
    link.click();

  } catch (err) {
    console.error('Canvas draw error:', err);
    const char = CHARACTERS[resultCharId] || {};
    const text = `ฉันคือ "${char.name}" (${char.thai || ''}) ในขบวน Pride! 🏳️‍🌈\n#PatchTheWorld #BangkokPride`;
    if (navigator.share) navigator.share({ title: 'Pride Quiz', text }).catch(() => {});
    else navigator.clipboard.writeText(text).catch(() => alert(text));
  } finally {
    if (saveBtn) {
      saveBtn.classList.remove('loading');
      saveBtn.innerHTML = '<span class="btn-icon">⬇</span> บันทึกรูปภาพ';
    }
  }
}

// ─── Canvas helpers ───────────────────────────────────────────
function _loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function _rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function _hexRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function _wrap(ctx, text, maxW) {
  const lines = [];
  let line = '';
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxW) {
      if (line) lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ─── RETRY ────────────────────────────────────────────────────
function retryQuiz() {
  currentQuestionIndex = 0;
  answers = [];
  resultCharId = null;
  _skipTyping = false;
  showScreen('screen-intro');
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-intro');
});
