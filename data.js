// ============================================================
//  PRIDE QUIZ v2 — DATA.JS
// ============================================================

// ─── CHARACTERS ─────────────────────────────────────────────
const CHARACTERS = {
  leader: {
    id: 'leader',
    name: 'The Leader',
    tagline: '"หัวหน้าที่ใครก็ตามได้"',
    thai: 'หัวแถวขบวน',
    desc: 'คุณไม่จำเป็นต้องมีตำแหน่ง ทุกคนก็รู้อยู่แล้วว่าใครคือ แกนกลาง คุณคือคนที่กลุ่มพึ่งได้โดยไม่ต้องพูด เวลาทุกอย่างพังคุณไม่ตื่นตระหนก แค่บอกว่า "โอเค เดี๋ยวจัดการให้" แล้วคุณก็ทำมันได้จริง ๆ',
    matchId: 'sunshine',
    matchName: 'The Sunshine',
    matchThai: 'เซเรปประจำขบวน',
    parades: [
      { label: 'ขบวนสีแดง', color: '#ff6060' },
      { label: 'ขบวนสีเหลือง', color: '#ffd700' },
    ],
    // Character visual colors
    c1: '#c8a8f0', c2: '#a878d8',
    gradient: 'linear-gradient(145deg, #c8a8f0 0%, #a878d8 60%, #9060c8 100%)',
    // Blush / detail color
    blush: true,
    item: '📋',
  },
  thinker: {
    id: 'thinker',
    name: 'The Thinker',
    tagline: '"คนที่คิดลึกแต่พูดได้โดน"',
    thai: 'คนมีเสน่ห์',
    desc: 'เงียบไม่ได้แปลว่าว่างเปล่า คุณมักสังเกตสิ่งที่คนอื่นมองข้าม และเมื่อพูดออกมาแต่ละคำก็โดนเป้าหมายทุกครั้ง ความลึกซึ้งที่อยู่ข้างในคุณทำให้ทุกการสนทนากับคุณมีความหมาย',
    matchId: 'observer',
    matchName: 'The Observer',
    matchThai: 'นักสังเกต',
    parades: [
      { label: 'ขบวนสีน้ำเงิน', color: '#6080ff' },
      { label: 'ขบวนสีม่วง', color: '#9060d0' },
    ],
    c1: '#a8c8f0', c2: '#7898d0',
    gradient: 'linear-gradient(145deg, #a8c8f0 0%, #7898d0 60%, #5878c0 100%)',
    blush: false,
    item: '🔍',
  },
  sunshine: {
    id: 'sunshine',
    name: 'The Sunshine',
    tagline: '"แสงสว่างประจำขบวน"',
    thai: 'เสเรปประจำขบวน',
    desc: 'ขบวนจะมืดลงทันทีถ้าไม่มีคุณ คุณคือคนที่ทำให้บรรยากาศเบาลงด้วยรอยยิ้มและพลังงานที่ล้นออกมา คนรอบข้างชาร์จแบตผ่านคุณโดยไม่รู้ตัว',
    matchId: 'leader',
    matchName: 'The Leader',
    matchThai: 'หัวแถวขบวน',
    parades: [
      { label: 'ขบวนสีส้ม', color: '#ffa040' },
      { label: 'ขบวนสีชมพู', color: '#ff80a0' },
    ],
    c1: '#f8d090', c2: '#f0b060',
    gradient: 'linear-gradient(145deg, #f8e090 0%, #f0b060 60%, #e89040 100%)',
    blush: true,
    item: '☀️',
  },
  backbone: {
    id: 'backbone',
    name: 'The Backbone',
    tagline: '"เส้นเลือดใหญ่ของขบวน"',
    thai: 'เพื่อนร่วมอุดมการณ์',
    desc: 'คุณไม่เคยทิ้งใครไว้ข้างหลัง เชื่อในสิ่งที่ทำและทำมันด้วยหัวใจทั้งดวง อุดมการณ์ของคุณคือแรงผลักดันที่ทำให้ขบวนเดินต่อไปได้ แม้ในวันที่ยากที่สุด',
    matchId: 'guardian',
    matchName: 'The Guardian',
    matchThai: 'ผู้สนับสนุน',
    parades: [
      { label: 'ขบวนสีเขียว', color: '#50d080' },
      { label: 'ขบวนสีเหลือง', color: '#ffd700' },
    ],
    c1: '#a0e0c0', c2: '#60c090',
    gradient: 'linear-gradient(145deg, #a0e0c0 0%, #60c090 60%, #40a870 100%)',
    blush: false,
    item: '💪',
  },
  freeSpirit: {
    id: 'freeSpirit',
    name: 'The Free Spirit',
    tagline: '"คนที่ไม่มีกรอบ"',
    thai: 'คนรักอิสระ',
    desc: 'คุณไม่ชอบกรอบ ไม่ชอบเส้นทางที่คนอื่นวางไว้ให้ คุณสร้างเส้นทางเองตามแบบที่รู้สึกว่าใช่ อิสระคือออกซิเจนของคุณ และความสดใหม่ของคุณทำให้ขบวนไม่น่าเบื่อ',
    matchId: 'dreamer',
    matchName: 'The Dreamer',
    matchThai: 'นักสร้างสรรค์',
    parades: [
      { label: 'ขบวนสีฟ้า', color: '#60b0ff' },
      { label: 'ขบวนสีชมพู', color: '#ff80b0' },
    ],
    c1: '#b0d8ff', c2: '#80b0f0',
    gradient: 'linear-gradient(145deg, #b0d8ff 0%, #80b0f0 60%, #6090e0 100%)',
    blush: true,
    item: '🦋',
  },
  dreamer: {
    id: 'dreamer',
    name: 'The Dreamer',
    tagline: '"นักฝันผู้สร้างสรรค์"',
    thai: 'นักสร้างสรรค์',
    desc: 'ความฝันของคุณใหญ่กว่าสิ่งที่ตาเห็น คุณมองโลกในแบบที่คนอื่นยังนึกไม่ถึง และสร้างสรรค์สิ่งใหม่จากทุกแรงบันดาลใจรอบตัว ขบวน Pride ต้องการนักสร้างสรรค์อย่างคุณ',
    matchId: 'freeSpirit',
    matchName: 'The Free Spirit',
    matchThai: 'คนรักอิสระ',
    parades: [
      { label: 'ขบวนสีม่วง', color: '#c080ff' },
      { label: 'ขบวนสีชมพู', color: '#ff90c0' },
    ],
    c1: '#f0b8d0', c2: '#e080a8',
    gradient: 'linear-gradient(145deg, #f0b8d0 0%, #e080a8 60%, #c86090 100%)',
    blush: true,
    item: '🎨',
  },
  listener: {
    id: 'listener',
    name: 'The Listener',
    tagline: '"พื้นที่ปลอดภัยในขบวน"',
    thai: 'พื้นที่ปลอดภัยในขบวน',
    desc: 'คุณไม่ได้ฟังเพื่อตอบ คุณฟังเพื่อเข้าใจ ทุกคนรู้สึกปลอดภัยเวลาอยู่กับคุณ เพราะคุณไม่ตัดสิน คุณแค่อยู่ตรงนั้น และบางครั้งการอยู่ตรงนั้นก็เป็นสิ่งที่ยิ่งใหญ่ที่สุด',
    matchId: 'backbone',
    matchName: 'The Backbone',
    matchThai: 'เพื่อนร่วมอุดมการณ์',
    parades: [
      { label: 'ขบวนสีฟ้า', color: '#60c0f0' },
      { label: 'ขบวนสีม่วงอ่อน', color: '#c0a0ff' },
    ],
    c1: '#a0c8e8', c2: '#70a8d0',
    gradient: 'linear-gradient(145deg, #a0c8e8 0%, #70a8d0 60%, #5090c0 100%)',
    blush: false,
    item: '💙',
  },
  depth: {
    id: 'depth',
    name: 'The Depth',
    tagline: '"ลึกกว่าที่เห็น"',
    thai: 'นักคิดที่แอบมาเดิน',
    desc: 'คุณเหมือนมหาสมุทร ข้างบนอาจดูสงบ แต่ข้างในมีความลึกที่หาก้นไม่เจอ คุณคิดเยอะกว่าที่แสดงออก รู้สึกเยอะกว่าที่บอก และนั่นทำให้คุณมีมิติที่คนอื่นต้องใช้เวลาทำความเข้าใจ',
    matchId: 'thinker',
    matchName: 'The Thinker',
    matchThai: 'คนมีเสน่ห์',
    parades: [
      { label: 'ขบวนสีกรม', color: '#4060b0' },
      { label: 'ขบวนสีม่วง', color: '#8060c0' },
    ],
    c1: '#9090d8', c2: '#6868c0',
    gradient: 'linear-gradient(145deg, #9090d8 0%, #6868c0 60%, #5050a8 100%)',
    blush: false,
    item: '🌊',
  },
  observer: {
    id: 'observer',
    name: 'The Observer',
    tagline: '"นักสังเกตที่แม่นยำ"',
    thai: 'นักสังเกต',
    desc: 'คุณเห็นสิ่งที่คนอื่นพลาด ไม่ต้องพูดเยอะ แค่สังเกตก็รู้แล้วว่าอะไรกำลังเกิดขึ้น ความสามารถในการอ่านสถานการณ์ของคุณแม่นยำเหมือนเรดาร์',
    matchId: 'depth',
    matchName: 'The Depth',
    matchThai: 'นักคิดที่แอบมาเดิน',
    parades: [
      { label: 'ขบวนสีเขียว', color: '#40c080' },
      { label: 'ขบวนสีน้ำเงิน', color: '#5080e0' },
    ],
    c1: '#90d8b0', c2: '#60b888',
    gradient: 'linear-gradient(145deg, #90d8b0 0%, #60b888 60%, #409868 100%)',
    blush: false,
    item: '🔭',
  },
  advocate: {
    id: 'advocate',
    name: 'The Advocate',
    tagline: '"เสียงที่กล้าพูดความจริง"',
    thai: 'นักล่าฝัน',
    desc: 'คุณไม่แค่ฝัน คุณลุกขึ้นสู้เพื่อฝันนั้น คุณเชื่อในความเป็นธรรม เชื่อในสิทธิของทุกคน และพร้อมจะพูดดัง ๆ ในเวลาที่คนอื่นยังกล้า ๆ กลัว ๆ',
    matchId: 'leader',
    matchName: 'The Leader',
    matchThai: 'หัวแถวขบวน',
    parades: [
      { label: 'ขบวนสีแดง', color: '#ff5050' },
      { label: 'ขบวนสีส้ม', color: '#ff9040' },
    ],
    c1: '#f09080', c2: '#e06860',
    gradient: 'linear-gradient(145deg, #f09080 0%, #e06860 60%, #c84848 100%)',
    blush: false,
    item: '✊',
  },
  entertainer: {
    id: 'entertainer',
    name: 'The Entertainer',
    tagline: '"ผู้สร้างรอยยิ้มของขบวน"',
    thai: 'นักสร้างรอยยิ้มของขบวน',
    desc: 'ขบวนไม่มีเสียงหัวเราะถ้าขาดคุณไป คุณคือคนที่ทำให้ทุกอย่างสนุก ทุกช่วงเวลายากก็เบาลงได้เพราะคุณอยู่ตรงนั้น พลังงานของคุณติดต่อ',
    matchId: 'sunshine',
    matchName: 'The Sunshine',
    matchThai: 'เสเรปประจำขบวน',
    parades: [
      { label: 'ขบวนสีเหลือง', color: '#ffd040' },
      { label: 'ขบวนสีส้ม', color: '#ff9040' },
    ],
    c1: '#f8d070', c2: '#f0a040',
    gradient: 'linear-gradient(145deg, #f8d070 0%, #f0a040 60%, #e08030 100%)',
    blush: true,
    item: '🎭',
  },
  guardian: {
    id: 'guardian',
    name: 'The Guardian',
    tagline: '"ผู้ปกป้องที่ไม่เคยเรียกร้อง"',
    thai: 'ผู้สนับสนุน',
    desc: 'คุณคือคนที่คอยดูแลทุกคนข้างหลังโดยไม่เรียกร้องการยอมรับ คุณแน่วแน่ ปกป้อง และสนับสนุนอย่างไม่มีเงื่อนไข ขบวนเดินต่อไปได้เพราะมีคุณค้ำอยู่ข้างหลัง',
    matchId: 'listener',
    matchName: 'The Listener',
    matchThai: 'พื้นที่ปลอดภัยในขบวน',
    parades: [
      { label: 'ขบวนสีน้ำเงิน', color: '#4080e0' },
      { label: 'ขบวนสีเขียว', color: '#40c080' },
    ],
    c1: '#80b8e8', c2: '#5090d0',
    gradient: 'linear-gradient(145deg, #80b8e8 0%, #5090d0 60%, #3070b8 100%)',
    blush: false,
    item: '🛡️',
  },
};

// ─── QUESTIONS ────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'q1',
    text: 'ตอนเจอปัญหาที่ไม่คาดคิด\nคุณมักจะ...',
    options: [
      { text: 'หยุดนิ่งแปป… ตั้งสติแล้วค่อย ๆ\nคิดทางออกทีละขั้น', scores: { thinker:3, observer:2, depth:1 } },
      { text: 'โทรหาคนที่ไว้ใจได้ทันที',              scores: { listener:2, backbone:2, guardian:2 } },
      { text: 'แก้ปัญหาไปก่อนเลย\nเรื่องนอยด์ค่อยว่ากันทีหลัง', scores: { leader:3, advocate:2, freeSpirit:1 } },
      { text: 'ปล่อยให้ความรู้สึกนำทางก่อน\nตอนใจเย็นแล้วค่อยว่ากัน', scores: { dreamer:2, depth:2, sunshine:1 } },
    ],
  },
  {
    id: 'q2',
    text: 'เพื่อนมักบอกว่า\nคุณเป็นคนแบบไหน?',
    options: [
      { text: 'ตัวตึงเรื่องความชัวร์ พึ่งพาได้เสมอ',      scores: { backbone:3, guardian:2, leader:1 } },
      { text: 'คิดเยอะนะ แต่พอพูดแล้วโดนมาก',             scores: { thinker:3, depth:2, observer:1 } },
      { text: 'เอนเนอร์จี้ล้น อยู่ด้วยแล้วสนุกสุดๆ',       scores: { sunshine:3, entertainer:2, freeSpirit:1 } },
      { text: 'สายซัพพอร์ต ฟังเก่ง\nอยู่ด้วยแล้วสบายใจสุด ๆ', scores: { listener:3, guardian:2, backbone:1 } },
    ],
  },
  {
    id: 'q3',
    text: 'วันที่รู้สึกแย่ที่สุด\nคุณอยากทำอะไร?',
    options: [
      { text: 'มุดตัวอยู่เงียบ ๆ คนเดียว\nขอชาร์จแบตให้เต็มก่อน',          scores: { depth:3, thinker:2, observer:1 } },
      { text: 'ออกไปเที่ยวข้างนอก เปลี่ยนที่\nไปเรื่อย ๆ ให้ลืมเรื่องแย่ ๆ', scores: { freeSpirit:3, entertainer:2, sunshine:1 } },
      { text: 'นัดเจอหรือโทรคุยกับคนที่ไว้ใจ\nนั่งระบายจนกว่าจะโล่ง',       scores: { listener:2, backbone:2, guardian:2 } },
      { text: 'หาอะไรที่ชอบทำ\nหมกมุ่นกับมันจนลืมเวลาไปเลย',              scores: { dreamer:3, depth:1, freeSpirit:2 } },
    ],
  },
  // BREAK 1 after q3
  {
    id: 'q4',
    text: 'ในกลุ่มเพื่อน\nคุณมักเป็น...',
    options: [
      { text: 'พส.คนดี คอยเช็กว่าเพื่อน ๆ\nโอเคกันไหม',      scores: { guardian:3, listener:2, backbone:1 } },
      { text: 'ตัวเปิด ชวนทุกคนออกไป\nลองอะไรใหม่ ๆ',       scores: { freeSpirit:3, sunshine:2, entertainer:1 } },
      { text: 'คนสร้างบรรยากาศ\nคอยเบรกความเครียดในวง',    scores: { entertainer:3, sunshine:2, freeSpirit:1 } },
      { text: 'คนคุมเกม\nคอยมองภาพรวมให้เพื่อน ๆ',         scores: { leader:3, observer:2, thinker:1 } },
    ],
  },
  {
    id: 'q5',
    text: 'ถ้าเพื่อนมีปัญหา\nคุณจะ...',
    options: [
      { text: 'ตั้งใจฟังเงียบ ๆ ไม่ขัด\nให้เขาได้ระบายออกมาจนหมด', scores: { listener:3, guardian:2, depth:1 } },
      { text: 'สวมร่างที่ปรึกษา\nช่วยหาวิธีแก้ปัญหาให้เดี๋ยวนี้เลย', scores: { leader:2, thinker:2, backbone:2 } },
      { text: 'ไม่พูดเยอะ\nแค่อยู่ข้าง ๆ เป็นเพื่อนก็พอ',           scores: { guardian:3, listener:2, observer:1 } },
      { text: 'ชวนออกไปทำอะไรสนุก ๆ\nดึงเพื่อนออกจากความเศร้า',    scores: { entertainer:3, sunshine:2, freeSpirit:1 } },
    ],
  },
  {
    id: 'q6',
    text: 'สิ่งที่คุณให้คุณค่ากับมิตรภาพ\nมากที่สุดคือ...',
    options: [
      { text: 'ความซื่อสัตย์ พูดตรง ๆ ได้',            scores: { backbone:3, advocate:2, leader:1 } },
      { text: 'การเติบโตไปด้วยกัน',                    scores: { dreamer:2, depth:2, thinker:2 } },
      { text: 'ความสนุกและความทรงจำดี ๆ',              scores: { sunshine:2, entertainer:2, freeSpirit:2 } },
      { text: 'การยอมรับกันในแบบที่เป็น',              scores: { listener:3, guardian:2, depth:1 } },
    ],
  },
  // BREAK 2 after q6
  {
    id: 'q7',
    text: 'อะไรที่ทำให้คุณรู้สึก\n"มีพลัง" ที่สุด?',
    options: [
      { text: 'ได้ทำสิ่งที่ตัวเองเชื่อจริง ๆ',                  scores: { advocate:3, backbone:2, leader:1 } },
      { text: 'ได้เห็นคนรอบข้างมีความสุข',                       scores: { guardian:2, listener:2, sunshine:2 } },
      { text: 'ได้ลองอะไรใหม่ ๆ\nที่ไม่เคยทำมาก่อน',             scores: { freeSpirit:3, entertainer:2, dreamer:1 } },
      { text: 'ได้มีเวลาเงียบ ๆ กับตัวเอง',                      scores: { depth:3, thinker:2, observer:1 } },
    ],
  },
  {
    id: 'q8',
    text: 'ถ้าเปรียบตัวเองเป็นโทนสี\nคุณคิดว่าคุณอยู่โทนสีไหน?',
    options: [
      { text: 'สีโทนร้อน', scores: { leader:2, sunshine:2, advocate:2 } },
      { text: 'สีโทนเย็น', scores: { thinker:2, listener:2, depth:2 } },
      { text: 'สีเอิร์ธโทน', scores: { backbone:2, guardian:2, observer:2 } },
      { text: 'สีพาสเทล', scores: { dreamer:2, freeSpirit:2, entertainer:2 } },
    ],
  },
  {
    id: 'q9',
    text: 'สิ่งที่คุณภูมิใจในตัวเอง\nมากที่สุดคือ...',
    options: [
      { text: 'ไม่เคยทิ้งคนที่สำคัญ',                          scores: { backbone:3, guardian:2, listener:1 } },
      { text: 'กล้าเป็นตัวเองเสมอ',                            scores: { freeSpirit:3, advocate:2, entertainer:1 } },
      { text: 'ทำให้คนอื่นยิ้มได้',                            scores: { sunshine:3, entertainer:2, listener:1 } },
      { text: 'รู้จักตัวเองดีพอที่จะรู้ว่าต้องการอะไร',         scores: { depth:3, thinker:2, observer:1 } },
    ],
  },
  // BREAK 3 after q9
  {
    id: 'q10',
    text: 'ถ้าขบวน Pride คือช่วงเวลาหนึ่งของชีวิต\nคุณอยากให้มันเป็นแบบไหน?',
    options: [
      { text: 'เดินช้า ๆ ค่อย ๆ\nซึมซับทุกอย่างรอบข้าง',              scores: { observer:3, depth:2, listener:1 } },
      { text: 'วิ่งนำหน้าขบวนไปเลย\nตื่นเต้น เร้าใจ ไม่ชอบรอใคร',    scores: { leader:3, freeSpirit:2, advocate:1 } },
      { text: 'เดินเบียดเสียดท่ามกลางผู้คน\nรู้สึกว่าไม่ได้สู้คนเดียว', scores: { sunshine:2, entertainer:2, backbone:2 } },
      { text: 'ยืนมองภาพรวมให้ชัดก่อน\nแล้วค่อยก้าวเข้าไปแบบมั่นใจ', scores: { thinker:3, dreamer:2, guardian:1 } },
    ],
  },
];

// ─── BREAKS ──────────────────────────────────────────────────
const BREAKS = [
  {
    afterIndex: 2, // after q3
    steps: [
      {
        text: 'โอ้โห ....\nคุณน่าสนใจกว่าที่คิดไว้มากเลยนะ !',
        charStyle: 'break1a', // blue blob with glasses, mouth open
        hasSkip: true,
      },
      {
        text: 'ขบวนนี้จะสมบูรณ์ไม่ได้เลย\nถ้าขาดคนแบบคุณนะเนี่ย',
        charStyle: 'break1b',
        hasBtn: true, btnText: 'ไปท่อนต่อเลย →',
      },
    ],
  },
  {
    afterIndex: 5, // after q6
    steps: [
      {
        text: 'เยี่ยมไปเลยล่ะ!\nพวกเราเริ่มเห็นบทบาทของคุณแล้ว',
        charStyle: 'break2a',
        hasSkip: true,
      },
      {
        text: 'แต่ขออุ้บไว้ก่อนนะ\nยังเหลืออีกนิด ไปต่อกันก่อน ~',
        charStyle: 'break2b',
        hasBtn: true, btnText: 'ไปท่อนต่อเลย →',
      },
    ],
  },
  {
    afterIndex: 8, // after q9
    steps: [
      {
        text: 'ขบวนกำลังเริ่มเคลื่อน\nและมีที่ว่างสำหรับคุณอยู่เสมอ',
        charStyle: 'break3',
        hasBtn: true, btnText: 'ไปต่อเลย →',
        isLastQ: true,  // triggers lastq screen next
      },
    ],
  },
];

// ─── CALCULATE RESULT ─────────────────────────────────────────
function calculateResult(answers) {
  const scores = {};
  Object.keys(CHARACTERS).forEach(k => (scores[k] = 0));
  answers.forEach(({ qIndex, optionIndex }) => {
    const opt = QUESTIONS[qIndex].options[optionIndex];
    Object.entries(opt.scores).forEach(([charId, pts]) => {
      scores[charId] = (scores[charId] || 0) + pts;
    });
  });
  let topId = null, topScore = -1;
  Object.entries(scores).forEach(([id, s]) => {
    if (s > topScore) { topScore = s; topId = id; }
  });
  return { charId: topId, scores };
}
