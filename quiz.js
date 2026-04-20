// ============================================================
//  PRIDE QUIZ v2 — QUIZ.JS
//  Flow: intro → onboard1 → onboard2 → onboard3 →
//        questions (with break steps) → lastq intro →
//        q10 → outro loading → result
// ============================================================

let currentQuestionIndex = 0;
let answers = [];
let currentBreakDef = null;
let currentBreakStep = 0;
let resultCharId = null;

// ─── SCREEN NAVIGATION ───────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = 'flex';
  void el.offsetHeight; // reflow for animation
  el.classList.add('active');
  window.scrollTo(0, 0);
}

// ─── ONBOARDING ──────────────────────────────────────────────
function goToOnboarding() {
  showScreen('screen-onboard1');
}
function goToOnboard2() {
  showScreen('screen-onboard2');
}
function goToOnboard3() {
  showScreen('screen-onboard3');
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
  const pct = (currentQuestionIndex / total) * 100;

  // Progress
  const prog = document.getElementById('qProgress');
  if (prog) prog.style.width = Math.max(pct, 5) + '%';

  // Card animation reset
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  void card.offsetHeight;
  card.style.animation = '';

  // Question text (support \n)
  document.getElementById('questionText').innerHTML =
    q.text.replace(/\n/g, '<br/>');

  // Options
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
  // Highlight selected
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  btn.disabled = true;

  // Save answer
  answers.push({ qIndex: currentQuestionIndex, optionIndex });

  // Advance after short delay
  setTimeout(() => advance(), 400);
}

// ─── ADVANCE ─────────────────────────────────────────────────
function advance() {
  // Check if there's a break after current question
  const breakDef = BREAKS.find(b => b.afterIndex === currentQuestionIndex);

  currentQuestionIndex++;

  if (breakDef) {
    currentBreakDef = breakDef;
    currentBreakStep = 0;
    showBreakStep();
    return;
  }

  // Last question intro (q10 is index 9)
  if (currentQuestionIndex === 9) {
    showLastQIntro();
    return;
  }

  if (currentQuestionIndex >= QUESTIONS.length) {
    showOutro();
    return;
  }

  showScreen('screen-question');
  renderQuestion();
}

// ─── BREAK STEPS ─────────────────────────────────────────────
function showBreakStep() {
  const step = currentBreakDef.steps[currentBreakStep];
  if (!step) {
    // All steps done
    if (currentBreakDef.steps[currentBreakDef.steps.length - 1].isLastQ) {
      showLastQIntro();
    } else {
      showScreen('screen-question');
      renderQuestion();
    }
    return;
  }

  // Update break screen
  const bubble = document.getElementById('breakBubble');
  if (bubble) {
    document.getElementById('breakText').innerHTML = step.text.replace(/\n/g, '<br/>');
  }

  // Update progress
  const prog = document.getElementById('breakProgress');
  if (prog) {
    const pct = (currentQuestionIndex / QUESTIONS.length) * 100;
    prog.style.width = pct + '%';
  }

  // Render break characters
  renderBreakChars(step.charStyle);

  // Show skip or button
  const btn = document.getElementById('breakBtn');
  if (step.hasBtn) {
    btn.style.display = 'flex';
    btn.textContent = step.btnText || 'ไปต่อเลย →';
    btn.style.position = 'static';
    btn.style.transform = 'none';
    btn.style.left = 'auto';
    btn.style.margin = '0 auto';
  } else {
    btn.style.display = 'none';
  }

  showScreen('screen-break');

  // Auto-skip after 2s if no button
  if (step.hasSkip && !step.hasBtn) {
    btn.style.display = 'none';
    const skipTimer = setTimeout(() => {
      currentBreakStep++;
      showBreakStep();
    }, 2200);
    // Also allow manual skip
    btn.style.display = 'block';
    btn.textContent = 'skip →';
    btn.style.background = 'none';
    btn.style.color = 'rgba(100,80,140,0.55)';
    btn.style.boxShadow = 'none';
    btn.style.border = 'none';
    btn.style.textDecoration = 'underline';
    btn.style.font = "500 0.95rem 'Kanit', sans-serif";
    btn.style.position = 'absolute';
    btn.style.bottom = '32px';
    btn.style.left = '50%';
    btn.style.transform = 'translateX(-50%)';
    btn.onclick = () => {
      clearTimeout(skipTimer);
      currentBreakStep++;
      showBreakStep();
    };
  }
}

function continueFromBreak() {
  // Reset button style for next time
  const btn = document.getElementById('breakBtn');
  btn.style.cssText = '';
  btn.onclick = continueFromBreak;

  currentBreakStep++;
  if (currentBreakStep >= currentBreakDef.steps.length) {
    const lastStep = currentBreakDef.steps[currentBreakDef.steps.length - 1];
    if (lastStep.isLastQ) {
      showLastQIntro();
      return;
    }
    if (currentQuestionIndex >= QUESTIONS.length) {
      showOutro();
    } else {
      showScreen('screen-question');
      renderQuestion();
    }
  } else {
    showBreakStep();
  }
}

// Break character rendering
function renderBreakChars(style) {
  const container = document.getElementById('breakChars');
  container.innerHTML = '';

  const configs = {
    break1a: {
      main: { c1: '#a8c8e8', c2: '#78a8d0', mouth: 'o', glasses: true },
      sides: [{ c: '#f8b870', side: 'left' }, { c: '#f0a0b0', side: 'right' }],
    },
    break1b: {
      main: { c1: '#a8c8e8', c2: '#78a8d0', mouth: 'o', glasses: true },
      sides: [{ c: '#f8b870', side: 'left' }, { c: '#f0a0b0', side: 'right' }],
    },
    break2a: {
      main: { c1: '#f8b870', c2: '#e89050', mouth: 'smile' },
      sides: [{ c: '#a8d8f0', side: 'left' }, { c: '#c8b0f0', side: 'right' }],
    },
    break2b: {
      main: { c1: '#f8b870', c2: '#e89050', mouth: 'smile' },
      sides: [{ c: '#a8d8f0', side: 'left' }, { c: '#c8b0f0', side: 'right' }],
    },
    break3: {
      main: { c1: '#ddb0f8', c2: '#b888e0', mouth: 'smile' },
      sides: [],
      miniParade: true,
    },
  };

  const cfg = configs[style] || configs.break1a;

  // Side chars
  cfg.sides.forEach(s => {
    const el = document.createElement('div');
    el.className = `break-char-side ${s.side}`;
    el.style.background = s.c;
    container.appendChild(el);
  });

  // Main char
  const main = document.createElement('div');
  main.className = 'break-char-main';
  main.style.background = `linear-gradient(145deg, ${cfg.main.c1}, ${cfg.main.c2})`;

  if (cfg.main.glasses) {
    const g = document.createElement('div');
    g.style.cssText = `
      position:absolute; top:55px; left:50%; transform:translateX(-50%);
      width:52px; height:20px; display:flex; gap:4px; align-items:center;
      pointer-events:none;
    `;
    g.innerHTML = `
      <div style="width:22px;height:18px;border:2.5px solid #333;border-radius:50%;background:rgba(180,220,255,0.3);"></div>
      <div style="width:4px;height:2px;background:#333;border-radius:2px;"></div>
      <div style="width:22px;height:18px;border:2.5px solid #333;border-radius:50%;background:rgba(180,220,255,0.3);"></div>
    `;
    main.appendChild(g);
  }

  if (cfg.main.mouth === 'o') {
    const m = document.createElement('div');
    m.style.cssText = `
      position:absolute; bottom:30px; left:50%; transform:translateX(-50%);
      width:18px; height:20px; background:#1a1a2e; border-radius:50%;
      pointer-events:none;
    `;
    main.appendChild(m);
  }

  // Rainbow flag item
  const flag = document.createElement('div');
  flag.style.cssText = 'font-size:1.4rem; text-align:center; margin-top:-4px; animation: flagWiggle 2s ease-in-out infinite;';
  flag.textContent = '🏳️‍🌈';

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;z-index:2;';
  wrap.appendChild(main);
  wrap.appendChild(flag);
  container.appendChild(wrap);

  // Mini parade for break3
  if (cfg.miniParade) {
    const parade = document.createElement('div');
    parade.style.cssText = 'position:absolute;top:0;width:100%;text-align:center;font-size:1.2rem;letter-spacing:4px;';
    parade.innerHTML = '🏳️‍🌈🏳️‍⚧️🏳️‍🌈🏳️‍⚧️🏳️‍🌈';
    container.insertBefore(parade, container.firstChild);
  }
}

// ─── LAST Q INTRO ─────────────────────────────────────────────
function showLastQIntro() {
  showScreen('screen-lastq');
  setTimeout(() => {
    showScreen('screen-question');
    renderQuestion();
  }, 2200);
}

// ─── OUTRO / LOADING ─────────────────────────────────────────
function showOutro() {
  // Create and show loading overlay over result
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });

  // Create a temporary loading screen
  const loadEl = document.createElement('div');
  loadEl.className = 'screen active';
  loadEl.id = 'screen-loading-temp';
  loadEl.style.cssText = `
    display:flex; flex-direction:column; align-items:center;
    justify-content:center; gap:24px;
    background:linear-gradient(160deg,#f8f0ff 0%,#ede0ff 40%,#e0f0ff 100%);
    min-height:100svh; max-width:390px; margin:0 auto;
    animation:screenFadeIn 0.4s both;
  `;

  loadEl.innerHTML = `
    <div style="font-size:2.4rem; animation:mainCharFloat 3s ease-in-out infinite;">🎉</div>
    <div style="font-family:'Kanit',sans-serif;font-size:1.2rem;font-weight:700;color:#1a1a2e;text-align:center;line-height:1.5;">
      กำลังค้นหาตัวตนของคุณ<br/>ในขบวน...
    </div>
    <div class="loading-dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot"></div>
    </div>
    <div id="loadingText" style="font-family:'Kanit',sans-serif;font-size:0.95rem;color:rgba(80,60,120,0.6);">
      วิเคราะห์บุคลิกของคุณ... 🌈
    </div>
  `;
  document.body.appendChild(loadEl);

  // Cycle loading text
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
    setTimeout(() => { textEl.textContent = texts[ti]; textEl.style.opacity = '1'; }, 200);
  }, 800);

  // Calculate and show result
  setTimeout(() => {
    clearInterval(interval);
    loadEl.remove();
    const { charId } = calculateResult(answers);
    resultCharId = charId;
    buildResultScreen(charId);
    showScreen('screen-result');
    launchConfetti();
    if (typeof trackResult === 'function') trackResult(charId, CHARACTERS[charId].name);
  }, 3000);
}

// ─── BUILD RESULT SCREEN ─────────────────────────────────────
function buildResultScreen(charId) {
  const char = CHARACTERS[charId];

  // Header — big character
  const header = document.getElementById('resultHeader');
  header.style.background = `linear-gradient(180deg, ${char.c1}44 0%, transparent 100%)`;
  header.innerHTML = `
    <div class="result-logos">
      <span class="logo-text-patch sm">PATCH THE WORLD<br/><em>— WITH PRIDE —</em></span>
      <span class="logo-text-bkk sm">🏳️‍🌈 BANGKOK PRIDE</span>
    </div>
    <div class="result-char-display">
      <div class="result-char-body" style="background:${char.gradient};">
        ${char.blush ? '<div class="blush l"></div><div class="blush r"></div>' : ''}
      </div>
      <div class="result-char-flag">🏳️‍🌈</div>
    </div>
  `;

  // Result info
  document.getElementById('resultName').textContent = char.name;
  document.getElementById('resultTagline').textContent = char.tagline;
  document.getElementById('resultDesc').textContent = char.desc;

  // Match character
  const matchChar = CHARACTERS[char.matchId] || CHARACTERS.sunshine;
  document.getElementById('matchCharRow').innerHTML = `
    <div class="match-char-mini" style="background:${matchChar.gradient};"></div>
    <div class="match-char-info">
      <span class="match-char-en">${matchChar.name}</span>
      <span class="match-char-th">${matchChar.thai}</span>
    </div>
  `;

  // Parade dots
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
        left:${Math.random()*100}vw;
        top:0;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        width:${Math.random()*10+5}px;
        height:${Math.random()*10+5}px;
        border-radius:${Math.random()>0.5?'50%':'3px'};
        animation-duration:${Math.random()*2+2.5}s;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }, Math.random() * 1500);
  }
}

// ─── SAVE IMAGE (share) ───────────────────────────────────────
function saveImage() {
  const char = CHARACTERS[resultCharId] || {};
  const text = `ฉันได้เป็น "${char.name}" (${char.thai}) ในขบวน Pride! 🌈`;
  if (navigator.share) {
    navigator.share({ title: 'Pride Quiz — Patch The World', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text + '\n#PatchTheWorld #BangkokPride')
      .then(() => alert('คัดลอกแล้ว! วางไปแชร์ได้เลย 🎉'))
      .catch(() => alert(text));
  }
}

// ─── RETRY ────────────────────────────────────────────────────
function retryQuiz() {
  currentQuestionIndex = 0;
  answers = [];
  resultCharId = null;
  showScreen('screen-intro');
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showScreen('screen-intro');
});
