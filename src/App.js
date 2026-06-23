import { useState, useEffect, useRef } from "react";

const FLAG = { black: "#1a1a1a", red: "#DD0000", gold: "#FFCE00" };
const ADMIN_PASSWORD = "pioneer@admin2024";
const TEACHER_PHONE = "919855991214";
const COURSE_PRICE = "Rs.500/month";
const VOUCHER_CODES = [
  "PIONEER2024","DEUTSCH2024","MORINDA01","LEARN123",
  "PEM2024A","PEM2024B","PEM2024C","PEM2024D","PEM2024E","PEM2024F",
  "STUDENT01","STUDENT02","STUDENT03","STUDENT04","STUDENT05",
  "STUDENT06","STUDENT07","STUDENT08","STUDENT09","STUDENT10",
  "STUDENT11","STUDENT12","STUDENT13","STUDENT14","STUDENT15",
  "STUDENT16","STUDENT17","STUDENT18","STUDENT19","STUDENT20",
  "PEM001","PEM002","PEM003","PEM004","PEM005",
  "PEM006","PEM007","PEM008","PEM009","PEM010",
  "MORINDA2024","GERMAN2024","DEUTSCH01","DEUTSCH02","DEUTSCH03",
];

const TOPICS = {
  A1: {
    Grammar: [
      "Conjugation of Regular Verbs","The Nominative Case","Numbers 1-100",
      "Gender Rules - der die das","Plural Forms","Irregular Verbs",
      "Formal Salutation","Word Order of Main Clauses","Separable and Inseparable Verbs",
      "Modal Verbs","Negation with nicht and kein","How to Form Questions",
      "Conjunctions - und aber oder","The Imperative","Accusative Case",
    ],
    Conversation: [
      "Pronunciation Rules","How to Introduce Yourself","How to Make Appointments",
      "Using Public Transport","Looking for Apartments","Asking for and Giving Directions",
      "How to Say the Time and Date","Doctor Visit Conversation","How to Order Food in a Restaurant",
      "Shopping Conversation","Telephone Basics","At the Hotel",
    ],
    Vocabulary: [
      "The Alphabet","Colors","Numbers","Family Members","Body Parts",
      "Clothing Items","At Home - Furniture","Food and Beverages","Animals",
      "Professions and Jobs","Weather","Leisure Time Activities",
      "Emotions and Adjectives","Countries and Nations","Means of Transport",
      "School and Education","Days and Months","Common Verbs","Common Adjectives","Greetings and Farewells",
    ],
  },
  A2: {
    Grammar: [
      "Perfect Tense with haben","Perfect Tense with sein","Imperfect Tense",
      "Dative Case","Two-Way Prepositions","Comparative and Superlative",
      "Reflexive Verbs","Subordinate Clauses","Relative Clauses","Passive Voice Basics",
    ],
    Conversation: [
      "Talking about the Past","Making Plans with Friends","At the Bank",
      "Health and Illness","Job Interview Basics","Describing your Home",
      "Discussing Hobbies","Travel Planning","Giving Advice","Expressing Opinions",
    ],
    Vocabulary: [
      "Travel and Tourism","Health and Body","Work and Office",
      "Food and Cooking","Nature and Environment","Sports and Fitness",
      "Technology Basics","Feelings and Emotions","City and Places","Banking and Money",
    ],
  },
  B1: {
    Grammar: [
      "Konjunktiv II - Wishes","Passive Voice Advanced","Infinitive Constructions",
      "Extended Adjective Phrases","Genitive Case","Indirect Speech",
      "Advanced Conjunctions","Participial Phrases","Conditional Sentences","Nominalization",
    ],
    Conversation: [
      "Discussing Current Events","Job Applications","Formal Complaints",
      "Debating Topics","Giving Presentations","Discussing Culture",
      "Environmental Issues","Technology and Society","Health Discussions","Career Planning",
    ],
    Vocabulary: [
      "Politics and Society","Environment and Climate","Media and News",
      "Work and Career Advanced","Education System","Culture and Arts",
      "Science and Technology","Economy and Finance","Global Issues","Abstract Concepts",
    ],
  },
};

const REMINDERS = [
  "Hallo! Haven't practiced today? Just 5 minutes makes a difference!",
  "Keep your streak alive! Open the app and do a quick quiz!",
  "New vocabulary is waiting for you. Let's learn some German!",
  "You're doing great! Stay consistent, practice makes perfect!",
  "Did you know? Learning 10 words a day equals 3650 words a year!",
  "Your German journey continues! Come back and earn more XP!",
  "Don't break your streak! A quick flashcard session takes 2 minutes!",
];

function useStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch { return def; }
  });
  const save = v => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE"; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

function openWhatsApp(name) {
  const text = "Assalam o Alaikum! I am " + name + " and I want to upgrade to Premium on the Pioneer Education Morinda German app. Please share the voucher code for " + COURSE_PRICE + " full access. Thank you!";
  window.open("https://wa.me/" + TEACHER_PHONE + "?text=" + encodeURIComponent(text), "_blank");
}

async function callAI(prompt) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await res.json();
    const text = data.content[0].text.trim().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
  } catch (e) { return null; }
}

function LoadingSpinner({ text }) {
  return (
    <div style={{ textAlign: "center", padding: 48, background: "#f9f9f9", borderRadius: 16, border: "2px dashed #ddd" }}>
      <div style={{ fontSize: 42, marginBottom: 12 }}>🤖</div>
      <div style={{ fontWeight: 600, fontSize: 16, color: "#555", marginBottom: 8 }}>{text}</div>
      <div style={{ fontSize: 13, color: "#aaa" }}>AI is generating content... please wait</div>
    </div>
  );
}

function NotifBanner({ msg, onClose }) {
  return (
    <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 680, background: FLAG.black, color: "#fff", padding: "12px 16px", zIndex: 999, display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ fontSize: 13, flex: 1 }}>🇩🇪 {msg}</div>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18 }}>x</button>
    </div>
  );
}

function UpsellCard({ onDismiss, studentName }) {
  return (
    <div style={{ background: "linear-gradient(135deg,#1a1a1a,#3a0000)", color: "#fff", borderRadius: 14, padding: 18, marginBottom: 14, border: "2px solid " + FLAG.gold }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>💎 Unlock Full A2 + B1 Access!</div>
      <div style={{ fontSize: 13, opacity: .85, marginBottom: 12 }}>Get all Grammar, Conversation and Vocabulary topics for just {COURSE_PRICE}. Contact your teacher on WhatsApp!</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => openWhatsApp(studentName || "Student")} style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 8, padding: "9px 14px", fontWeight: 700, cursor: "pointer", fontSize: 13, flex: 1 }}>💬 WhatsApp Teacher</button>
        <button onClick={onDismiss} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", borderRadius: 8, padding: "9px 12px", cursor: "pointer", fontSize: 13 }}>Later</button>
      </div>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useStorage("pem_v5_users", {});
  const [usedVouchers, setUsedVouchers] = useStorage("pem_v5_vouchers", []);
  const [currentUser, setCurrentUser] = useStorage("pem_v5_current", null);
  const [authScreen, setAuthScreen] = useState("login");
  const [loginForm, setLoginForm] = useState({ name: "", phone: "", pin: "" });
  const [authError, setAuthError] = useState("");
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherMsg, setVoucherMsg] = useState("");
  const [screen, setScreen] = useState("home");
  const [selLevel, setSelLevel] = useState("A1");
  const [selCategory, setSelCategory] = useState("Grammar");
  const [selTopic, setSelTopic] = useState("Conjugation of Regular Verbs");
  const [vocabData, setVocabData] = useState(null);
  const [vocabLoading, setVocabLoading] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizState, setQuizState] = useState({ idx: 0, score: 0, answered: null, done: false });
  const [exData, setExData] = useState(null);
  const [exLoading, setExLoading] = useState(false);
  const [fillState, setFillState] = useState({ idx: 0, input: "", result: null, done: false, score: 0 });
  const [adminPass, setAdminPass] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [genCode, setGenCode] = useState("");
  const [notif, setNotif] = useState(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [lastVisit, setLastVisit] = useStorage("pem_v5_lastvisit", null);
  const cache = useRef({});

  const user = currentUser ? users[currentUser] : null;
  const isPaid = user ? user.paid : false;
  const locked = lvl => !isPaid && lvl !== "A1";

  useEffect(() => {
    if (!currentUser || !users[currentUser]) return;
    const hoursSince = (Date.now() - (lastVisit || 0)) / 3600000;
    if (hoursSince > 8) setNotif(REMINDERS[Math.floor(Math.random() * REMINDERS.length)]);
    setLastVisit(Date.now());
  }, [currentUser]); // eslint-disable-line

  useEffect(() => {
    if (!currentUser || !users[currentUser] || users[currentUser].paid) return;
    const t = setTimeout(() => setShowUpsell(true), 30000);
    return () => clearTimeout(t);
  }, [currentUser]); // eslint-disable-line

  async function loadVocab() {
    const key = selLevel + selCategory + selTopic;
    if (cache.current[key]) { setVocabData(cache.current[key]); return; }
    setVocabLoading(true); setVocabData(null);
    const data = await callAI('Generate exactly 20 German vocabulary items for the topic "' + selTopic + '" (category: ' + selCategory + ') at CEFR level ' + selLevel + '. Return ONLY a JSON array. Format: [{"de":"German word or phrase","en":"English translation","emoji":"one relevant emoji","example":"short German example sentence"}]');
    if (data) { cache.current[key] = data; setVocabData(data); }
    setVocabLoading(false);
  }

  async function loadQuiz() {
    setQuizLoading(true); setQuizData(null);
    setQuizState({ idx: 0, score: 0, answered: null, done: false });
    const data = await callAI('Generate 10 multiple choice questions for German topic "' + selTopic + '" at ' + selLevel + ' level. Return ONLY a JSON array. Format: [{"question":"German word or sentence","correct":"correct English answer","options":["correct","wrong1","wrong2","wrong3"]}]');
    if (data) setQuizData(data);
    setQuizLoading(false);
  }

  async function loadExercises() {
    setExLoading(true); setExData(null);
    setFillState({ idx: 0, input: "", result: null, done: false, score: 0 });
    const data = await callAI('Generate 8 fill-in-the-blank German exercises for topic "' + selTopic + '" (' + selCategory + ') at ' + selLevel + ' level. Return ONLY a JSON array. Format: [{"sentence":"German sentence with ___ for the blank","answer":"missing word","hint":"(English translation of full sentence)"}]');
    if (data) setExData(data);
    setExLoading(false);
  }

  function updateScore(key, score, total) {
    if (!currentUser) return;
    const up = { ...users };
    if (!up[currentUser].scores) up[currentUser].scores = {};
    up[currentUser].scores[key] = Math.max(up[currentUser].scores[key] || 0, Math.round((score / total) * 100));
    up[currentUser].xp = (up[currentUser].xp || 0) + score * 10;
    setUsers(up);
  }

  function register() {
    const name = loginForm.name.trim(), phone = loginForm.phone.trim(), pin = loginForm.pin.trim();
    if (!name || !phone || pin.length < 4) { setAuthError("All fields required and PIN must be 4+ digits"); return; }
    if (users[name]) { setAuthError("Name already taken. Try logging in."); return; }
    setUsers({ ...users, [name]: { name, phone, pin, xp: 0, scores: {}, joined: new Date().toLocaleDateString(), paid: false } });
    setCurrentUser(name); setAuthError("");
  }

  function login() {
    const name = loginForm.name.trim();
    if (!users[name]) { setAuthError("Student not found. Please register."); return; }
    if (users[name].pin !== loginForm.pin.trim()) { setAuthError("Wrong PIN. Try again."); return; }
    setCurrentUser(name); setAuthError("");
  }

  function redeem() {
    const code = voucherInput.trim().toUpperCase();
    if (!VOUCHER_CODES.includes(code)) { setVoucherMsg("Invalid code. Ask your teacher for a valid voucher."); return; }
    if (usedVouchers.includes(code)) { setVoucherMsg("This code has already been used."); return; }
    const up = { ...users }; up[currentUser].paid = true;
    setUsers(up); setUsedVouchers([...usedVouchers, code]);
    setVoucherMsg("Full access unlocked! Herzlichen Glückwunsch!");
    setShowUpsell(false);
  }

  function getLevel(xp) {
    if (xp >= 2000) return { label: "Advanced B1", color: "#7c3aed" };
    if (xp >= 1000) return { label: "Intermediate A2", color: "#059669" };
    if (xp >= 400) return { label: "Elementary A1+", color: "#d97706" };
    return { label: "Beginner A1", color: FLAG.red };
  }

  function genVoucher() {
    const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    setGenCode("PEM-" + Array.from({ length: 8 }, () => c[Math.floor(Math.random() * c.length)]).join(""));
  }

  const s = {
    wrap: { fontFamily: "system-ui,sans-serif", maxWidth: 680, margin: "0 auto", paddingBottom: 90 },
    flagBar: { height: 6, background: "linear-gradient(to right,#1a1a1a 33%,#DD0000 33% 66%,#FFCE00 66%)" },
    header: { background: FLAG.black, color: "#fff", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 },
    card: { background: "#fff", borderRadius: 12, border: "1px solid #eee", padding: 16, marginBottom: 12 },
    btn: c => ({ background: c || FLAG.red, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14 }),
    inp: { width: "100%", padding: "11px 14px", fontSize: 15, borderRadius: 8, border: "1.5px solid #ddd", outline: "none", boxSizing: "border-box", marginBottom: 10 },
    nav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 680, background: "#fff", borderTop: "1px solid #eee", display: "flex", zIndex: 100 },
    nb: a => ({ flex: 1, padding: "6px 2px", border: "none", background: a ? "#fff8e1" : "transparent", cursor: "pointer", fontSize: 9, color: a ? FLAG.red : "#888", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }),
    lt: a => ({ flex: 1, padding: "8px", border: "none", borderRadius: 8, background: a ? FLAG.red : "#f3f3f3", color: a ? "#fff" : "#555", fontWeight: 600, cursor: "pointer", fontSize: 13 }),
    sel: { width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 8, border: "1.5px solid #ddd", outline: "none", background: "#fff", marginBottom: 10 },
  };

  const navItems = [
    { id: "home", emoji: "🏠", label: "Home" },
    { id: "lessons", emoji: "📚", label: "Lessons" },
    { id: "flashcards", emoji: "🃏", label: "Cards" },
    { id: "quiz", emoji: "🧠", label: "Quiz" },
    { id: "exercises", emoji: "✏️", label: "Exercises" },
    { id: "progress", emoji: "📊", label: "Progress" },
  ];

  // AUTH SCREEN
  if (!currentUser) return (
    <div style={s.wrap}>
      <div style={s.flagBar} />
      <div style={s.header}>
        <span style={{ fontSize: 24 }}>🇩🇪</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>Pioneer Education Morinda</div>
          <div style={{ fontSize: 11, opacity: .7 }}>Deutsch A1-B1 · Grammar · Vocab · Conversation</div>
        </div>
      </div>
      {adminOpen ? (
        <div style={{ padding: "20px 16px" }}>
          <button onClick={() => setAdminOpen(false)} style={{ background: "none", border: "none", color: FLAG.red, cursor: "pointer", fontWeight: 600, marginBottom: 14, padding: 0 }}>Back</button>
          {adminPass !== ADMIN_PASSWORD ? (
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 14 }}>Admin Login</div>
              <input style={s.inp} type="password" placeholder="Admin password" value={adminPass} onChange={e => setAdminPass(e.target.value)} />
              <button style={{ ...s.btn(), width: "100%" }} onClick={() => { if (adminPass !== ADMIN_PASSWORD) alert("Wrong password"); }}>Login</button>
            </div>
          ) : (
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Admin Panel</div>
              <div style={{ ...s.card, background: "#f0fdf4", display: "flex", gap: 20, justifyContent: "center", textAlign: "center" }}>
                <div><div style={{ fontWeight: 700, fontSize: 22 }}>{Object.keys(users).length}</div><div style={{ fontSize: 12, color: "#888" }}>Students</div></div>
                <div><div style={{ fontWeight: 700, fontSize: 22 }}>{Object.values(users).filter(u => u.paid).length}</div><div style={{ fontSize: 12, color: "#888" }}>Premium</div></div>
                <div><div style={{ fontWeight: 700, fontSize: 22 }}>{Object.values(users).reduce((a, u) => a + (u.xp || 0), 0)}</div><div style={{ fontSize: 12, color: "#888" }}>Total XP</div></div>
              </div>
              {Object.values(users).length === 0 && <div style={{ ...s.card, textAlign: "center", color: "#888" }}>No students yet</div>}
              {Object.values(users).map(u => (
                <div key={u.name} style={{ ...s.card, padding: "10px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{u.name} {u.paid ? "💎" : ""}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>📱 {u.phone} · {u.joined}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>⭐ {u.xp || 0} XP · {Object.keys(u.scores || {}).length} activities</div>
                    </div>
                    <button onClick={() => { const up = { ...users }; up[u.name].paid = !up[u.name].paid; setUsers(up); }} style={{ ...s.btn(u.paid ? "#ef4444" : "#22c55e"), padding: "6px 12px", fontSize: 12 }}>
                      {u.paid ? "Revoke" : "Grant"}
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ ...s.card, background: "#fffbea" }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Generate Voucher Code</div>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 10 }}>Generate a code and send it to the student on WhatsApp. They enter it in the app to unlock full access.</div>
                <button style={{ ...s.btn(), width: "100%", marginBottom: 10 }} onClick={genVoucher}>Generate New Code</button>
                {genCode && (
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 22, color: FLAG.red, letterSpacing: 3, textAlign: "center", padding: 12, background: "#fff", borderRadius: 10, border: "2px dashed #DD0000", marginBottom: 8 }}>{genCode}</div>
                    <button onClick={() => { try { navigator.clipboard.writeText(genCode); alert("Code copied! Send this to the student on WhatsApp."); } catch (e) { alert("Code: " + genCode); } }} style={{ ...s.btn("#333"), width: "100%", fontSize: 13 }}>Copy Code</button>
                  </div>
                )}
                <div style={{ marginTop: 12, fontSize: 12, color: "#888" }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Or use these ready codes:</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["STUDENT01","STUDENT02","STUDENT03","STUDENT04","STUDENT05","PEM001","PEM002","PEM003","PIONEER2024","MORINDA01"].map(c => (
                      <span key={c} style={{ background: "#f3f4f6", borderRadius: 6, padding: "3px 8px", fontSize: 11, fontFamily: "monospace" }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 52 }}>🎓</div>
            <div style={{ fontWeight: 700, fontSize: 22, marginTop: 8 }}>Welcome!</div>
            <div style={{ color: "#666", fontSize: 14, marginTop: 4 }}>Learn German from A1 to B1 level</div>
          </div>
          <div style={{ display: "flex", marginBottom: 14, borderRadius: 10, overflow: "hidden", border: "1.5px solid #ddd" }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => { setAuthScreen(t); setAuthError(""); }} style={{ flex: 1, padding: "10px", border: "none", background: authScreen === t ? FLAG.red : "#fff", color: authScreen === t ? "#fff" : "#333", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                {t === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>
          <input style={s.inp} placeholder="Your full name" value={loginForm.name} onChange={e => setLoginForm(f => ({ ...f, name: e.target.value }))} />
          {authScreen === "register" && <input style={s.inp} placeholder="Phone e.g. +92 300 1234567" value={loginForm.phone} onChange={e => setLoginForm(f => ({ ...f, phone: e.target.value }))} />}
          <input style={s.inp} placeholder="4-digit PIN" type="password" maxLength={6} value={loginForm.pin} onChange={e => setLoginForm(f => ({ ...f, pin: e.target.value }))} />
          {authError && <div style={{ color: FLAG.red, fontSize: 13, marginBottom: 10 }}>{authError}</div>}
          <button style={{ ...s.btn(), width: "100%", padding: 13 }} onClick={authScreen === "login" ? login : register}>
            {authScreen === "login" ? "Login" : "Create Account"}
          </button>
          <div style={{ ...s.card, background: "linear-gradient(135deg,#1a1a1a,#2d0000)", border: "2px solid " + FLAG.gold, color: "#fff", textAlign: "center", marginTop: 14 }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>💎</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Upgrade to Premium</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: FLAG.gold, marginBottom: 8 }}>{COURSE_PRICE}</div>
            <div style={{ fontSize: 13, opacity: .8, marginBottom: 12, textAlign: "left" }}>
              <div>✅ Grammar: 35 topics across A1, A2, B1</div>
              <div>✅ Conversation: 32 real-life scenarios</div>
              <div>✅ Vocabulary: 40 topic categories</div>
              <div>✅ AI-generated quizzes and exercises</div>
              <div>✅ Audio pronunciation for every word</div>
            </div>
            <button onClick={() => openWhatsApp("New Student")} style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 10, padding: 12, fontWeight: 700, cursor: "pointer", fontSize: 15, width: "100%", marginBottom: 8 }}>
              💬 Contact Teacher on WhatsApp
            </button>
            <div style={{ fontSize: 11, opacity: .6 }}>WhatsApp teacher - Pay - Get voucher code - Enter in app - Full access!</div>
          </div>
          <button onClick={() => setAdminOpen(true)} style={{ background: "none", border: "none", color: "#ccc", fontSize: 10, cursor: "pointer", marginTop: 8, display: "block", marginLeft: "auto" }}>Admin</button>
        </div>
      )}
    </div>
  );

  const level = getLevel(user.xp || 0);
  const categories = Object.keys(TOPICS[selLevel] || {});
  const topicsForCat = (TOPICS[selLevel] || {})[selCategory] || [];

  function TopicSelector() {
    return (
      <div>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {["A1", "A2", "B1"].map(l => (
            <button key={l} style={s.lt(selLevel === l)} onClick={() => {
              if (!locked(l)) {
                setSelLevel(l);
                const cats = Object.keys(TOPICS[l]);
                setSelCategory(cats[0]);
                setSelTopic(TOPICS[l][cats[0]][0]);
                setVocabData(null); setQuizData(null); setExData(null);
              } else setShowUpsell(true);
            }}>
              {l}{locked(l) ? " 🔒" : ""}
            </button>
          ))}
        </div>
        {locked(selLevel) ? (
          <UpsellCard onDismiss={() => setSelLevel("A1")} studentName={user.name} />
        ) : (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {categories.map(cat => (
                <button key={cat} style={{ ...s.lt(selCategory === cat), fontSize: 11, padding: "6px" }} onClick={() => {
                  setSelCategory(cat);
                  setSelTopic(TOPICS[selLevel][cat][0]);
                  setVocabData(null); setQuizData(null); setExData(null);
                }}>
                  {cat === "Grammar" ? "📖 Grammar" : cat === "Conversation" ? "💬 Talk" : "📝 Vocab"}
                </button>
              ))}
            </div>
            <select value={selTopic} onChange={e => { setSelTopic(e.target.value); setVocabData(null); setQuizData(null); setExData(null); }} style={s.sel}>
              {topicsForCat.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      {notif && <NotifBanner msg={notif} onClose={() => setNotif(null)} />}
      <div style={{ height: notif ? 48 : 0 }} />
      <div style={s.flagBar} />
      <div style={s.header}>
        <span style={{ fontSize: 20 }}>🇩🇪</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Pioneer Education Morinda</div>
          <div style={{ fontSize: 10, opacity: .7 }}>Deutsch A1-B1 · AI Powered</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          {isPaid && <div style={{ background: FLAG.gold, color: FLAG.black, borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>💎</div>}
          <div style={{ background: "#333", color: "#fff", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 600 }}>⭐{user.xp || 0}</div>
          <button onClick={() => { setCurrentUser(null); setScreen("home"); }} style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", fontSize: 11 }}>Out</button>
        </div>
      </div>

      <div style={{ padding: "12px 14px 0" }}>

        {screen === "home" && (
          <div>
            <div style={{ ...s.card, background: "linear-gradient(135deg,#1a1a1a,#333)", color: "#fff", border: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: FLAG.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: FLAG.black }}>{user.name[0].toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Hallo, {user.name}! 👋</div>
                  <div style={{ fontSize: 11, opacity: .7 }}>📱 {user.phone} · {level.label}</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <div style={{ background: level.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#fff" }}>{isPaid ? "💎 Premium" : "🆓 Free"}</div>
                </div>
              </div>
            </div>

            {!isPaid && (
              <div style={{ ...s.card, background: "linear-gradient(135deg,#fef9e7,#fffbea)", border: "2px solid " + FLAG.gold }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>🎟️ Have a voucher code?</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input value={voucherInput} onChange={e => setVoucherInput(e.target.value)} placeholder="Enter code e.g. STUDENT01" style={{ ...s.inp, marginBottom: 0, flex: 1 }} />
                  <button style={s.btn(FLAG.black)} onClick={redeem}>Apply</button>
                </div>
                {voucherMsg && <div style={{ fontSize: 13, fontWeight: 600, color: voucherMsg.includes("unlocked") ? "#16a34a" : FLAG.red, marginBottom: 8 }}>{voucherMsg}</div>}
                <button onClick={() => openWhatsApp(user.name)} style={{ background: "#25D366", color: "#fff", border: "none", borderRadius: 8, padding: 10, fontWeight: 700, cursor: "pointer", fontSize: 13, width: "100%" }}>
                  💬 Contact Teacher to Upgrade - {COURSE_PRICE}
                </button>
              </div>
            )}

            {showUpsell && !isPaid && <UpsellCard onDismiss={() => setShowUpsell(false)} studentName={user.name} />}

            <div style={{ ...s.card, background: "#e8f4fd", border: "1px solid #90caf9", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>🌟 Word of the day</div>
              <div style={{ fontSize: 44 }}>🎓</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Lernen</div>
              <div style={{ color: "#555", fontSize: 14 }}>To learn</div>
              <button onClick={() => speak("Ich lerne jeden Tag Deutsch")} style={{ ...s.btn("#e8f4fd"), color: "#1a6ca8", marginTop: 8, padding: "6px 16px", fontSize: 13, border: "1px solid #90caf9" }}>🔊 Listen</button>
            </div>

            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>What do you want to learn?</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { id: "lessons", emoji: "📚", label: "Lessons", desc: "Learn vocabulary & grammar" },
                { id: "flashcards", emoji: "🃏", label: "Flashcards", desc: "Practice with flip cards" },
                { id: "quiz", emoji: "🧠", label: "Quiz", desc: "Test your knowledge" },
                { id: "exercises", emoji: "✏️", label: "Exercises", desc: "Fill in the blanks" },
              ].map(item => (
                <div key={item.id} style={{ ...s.card, cursor: "pointer", textAlign: "center", padding: "14px 8px" }} onClick={() => setScreen(item.id)}>
                  <div style={{ fontSize: 28 }}>{item.emoji}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ ...s.card, background: "#f0fdf4", border: "1px solid #86efac" }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>📊 Your A1 Curriculum</div>
              {Object.entries(TOPICS.A1).map(([cat, topics]) => (
                <div key={cat} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>{cat === "Grammar" ? "📖" : cat === "Conversation" ? "💬" : "📝"} {cat} ({topics.length} topics)</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {topics.slice(0, 5).map(t => <span key={t} style={{ background: "#fff", border: "1px solid #d1fae5", borderRadius: 6, padding: "2px 8px", fontSize: 10 }}>{t}</span>)}
                    {topics.length > 5 && <span style={{ fontSize: 10, color: "#888", padding: "2px 4px" }}>+{topics.length - 5} more</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === "lessons" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>📚 Lessons</div>
            <TopicSelector />
            {!locked(selLevel) && (
              <div>
                {!vocabData && !vocabLoading && (
                  <div style={{ textAlign: "center", padding: 24, background: "#f9f9f9", borderRadius: 12 }}>
                    <div style={{ fontSize: 42, marginBottom: 8 }}>📖</div>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{selTopic}</div>
                    <div style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>{selCategory} · Level {selLevel} · 20 words with audio</div>
                    <button style={{ ...s.btn(), padding: "12px 32px" }} onClick={loadVocab}>Load Content 🤖</button>
                  </div>
                )}
                {vocabLoading && <LoadingSpinner text={"Generating " + selTopic + "..."} />}
                {vocabData && (
                  <div>
                    <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>{vocabData.length} items · {selCategory} · {selLevel}</div>
                    {vocabData.map((v, i) => (
                      <div key={i} style={{ ...s.card, display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
                        <div style={{ fontSize: 30, width: 40, textAlign: "center" }}>{v.emoji || "📝"}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{v.de}</div>
                          <div style={{ fontSize: 13, color: "#888" }}>{v.en}</div>
                          {v.example && <div style={{ fontSize: 12, color: FLAG.red, marginTop: 2, fontStyle: "italic" }}>{v.example}</div>}
                        </div>
                        <button onClick={() => speak(v.de)} style={{ background: "#e8f4fd", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 16 }}>🔊</button>
                      </div>
                    ))}
                    <button style={{ ...s.btn("#666"), width: "100%", marginTop: 4 }} onClick={() => { cache.current[selLevel + selCategory + selTopic] = null; loadVocab(); }}>🔄 Regenerate</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {screen === "flashcards" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🃏 Flashcards</div>
            <TopicSelector />
            {!locked(selLevel) && (
              <div>
                {!vocabData && !vocabLoading && (
                  <div style={{ textAlign: "center", padding: 24, background: "#f9f9f9", borderRadius: 12 }}>
                    <div style={{ fontSize: 42, marginBottom: 8 }}>🃏</div>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{selTopic}</div>
                    <button style={{ ...s.btn(), padding: "12px 32px" }} onClick={loadVocab}>Load Flashcards 🤖</button>
                  </div>
                )}
                {vocabLoading && <LoadingSpinner text="Generating flashcards..." />}
                {vocabData && vocabData.length > 0 && (() => {
                  const word = vocabData[cardIdx % vocabData.length];
                  return (
                    <div>
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Card {(cardIdx % vocabData.length) + 1} of {vocabData.length}</div>
                      <div onClick={() => setFlipped(f => !f)} style={{ background: flipped ? "#fff8e1" : "#e8f4fd", borderRadius: 16, border: "2px solid " + (flipped ? FLAG.gold : "#90caf9"), padding: 24, textAlign: "center", cursor: "pointer", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
                        <div style={{ fontSize: 60 }}>{word.emoji || "📝"}</div>
                        <div style={{ fontSize: 26, fontWeight: 800 }}>{flipped ? word.en : word.de}</div>
                        {flipped && word.example && <div style={{ fontSize: 13, color: "#888", fontStyle: "italic" }}>{word.example}</div>}
                        <div style={{ fontSize: 12, color: "#888" }}>{flipped ? "English" : "Deutsch"}</div>
                        {!flipped && <div style={{ fontSize: 11, color: "#ccc", marginTop: 4 }}>Tap to flip</div>}
                        <button onClick={e => { e.stopPropagation(); speak(word.de); }} style={{ background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontSize: 13, marginTop: 4 }}>🔊 Listen</button>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={s.btn("#999")} onClick={() => { setCardIdx(i => Math.max(0, i - 1)); setFlipped(false); }}>Prev</button>
                        <button style={{ ...s.btn("#22c55e"), flex: 1 }} onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }}>Know it ✓</button>
                        <button style={{ ...s.btn(FLAG.red), flex: 1 }} onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }}>Again</button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {screen === "quiz" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>🧠 Quiz</div>
            <TopicSelector />
            {!locked(selLevel) && (
              <div>
                {!quizData && !quizLoading && (
                  <div style={{ textAlign: "center", padding: 24, background: "#f9f9f9", borderRadius: 12 }}>
                    <div style={{ fontSize: 42, marginBottom: 8 }}>🧠</div>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{selTopic}</div>
                    <div style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>10 questions · {selCategory} · Level {selLevel}</div>
                    <button style={{ ...s.btn(), padding: "12px 32px" }} onClick={loadQuiz}>Start Quiz 🤖</button>
                  </div>
                )}
                {quizLoading && <LoadingSpinner text="Generating quiz questions..." />}
                {quizData && (
                  quizState.done ? (
                    <div style={{ ...s.card, textAlign: "center", padding: 32 }}>
                      <div style={{ fontSize: 52 }}>{quizState.score >= 8 ? "🏆" : quizState.score >= 5 ? "🎉" : "💪"}</div>
                      <div style={{ fontSize: 26, fontWeight: 700 }}>{quizState.score}/{quizData.length}</div>
                      <div style={{ color: FLAG.red, fontWeight: 600, marginTop: 6 }}>+{quizState.score * 10} XP!</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
                        <button style={s.btn()} onClick={() => { updateScore("quiz_" + selLevel + "_" + selTopic, quizState.score, quizData.length); setQuizState({ idx: 0, score: 0, answered: null, done: false }); }}>Try Again</button>
                        <button style={s.btn("#555")} onClick={loadQuiz}>New Quiz 🤖</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "#888" }}>
                        <span>Q{quizState.idx + 1}/{quizData.length}</span><span>Score: {quizState.score}</span>
                      </div>
                      <div style={{ background: "#eee", borderRadius: 8, height: 5, marginBottom: 12 }}>
                        <div style={{ width: ((quizState.idx / quizData.length) * 100) + "%", height: "100%", background: FLAG.red, borderRadius: 8 }} />
                      </div>
                      <div style={{ ...s.card, textAlign: "center", background: "#e8f4fd", border: "2px solid #90caf9", marginBottom: 12, padding: 20 }}>
                        <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>What does this mean?</div>
                        <div style={{ fontSize: 26, fontWeight: 800 }}>{quizData[quizState.idx].question}</div>
                        <button onClick={() => speak(quizData[quizState.idx].question)} style={{ background: "#e8f4fd", color: "#1a6ca8", border: "1px solid #90caf9", borderRadius: 8, padding: "5px 14px", cursor: "pointer", fontSize: 12, marginTop: 8 }}>🔊 Listen</button>
                      </div>
                      {quizData[quizState.idx].options.map(opt => {
                        const isC = opt === quizData[quizState.idx].correct, isA = quizState.answered !== null, isSel = quizState.answered === opt;
                        let bg = "#fff", border = "1.5px solid #ddd", col = "#333";
                        if (isA) { if (isC) { bg = "#dcfce7"; border = "1.5px solid #22c55e"; col = "#166534"; } else if (isSel) { bg = "#fee2e2"; border = "1.5px solid #ef4444"; col = "#991b1b"; } }
                        return (
                          <div key={opt} onClick={() => {
                            if (quizState.answered !== null) return;
                            const correct = opt === quizData[quizState.idx].correct, ns = correct ? quizState.score + 1 : quizState.score;
                            setQuizState(st => ({ ...st, answered: opt, score: ns }));
                            setTimeout(() => {
                              if (quizState.idx + 1 >= quizData.length) setQuizState(st => ({ ...st, done: true }));
                              else setQuizState(st => ({ ...st, idx: st.idx + 1, answered: null }));
                            }, 900);
                          }} style={{ ...s.card, cursor: isA ? "default" : "pointer", background: bg, border, color: col, marginBottom: 8, transition: "all 0.2s" }}>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {screen === "exercises" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✏️ Exercises</div>
            <TopicSelector />
            {!locked(selLevel) && (
              <div>
                {!exData && !exLoading && (
                  <div style={{ textAlign: "center", padding: 24, background: "#f9f9f9", borderRadius: 12 }}>
                    <div style={{ fontSize: 42, marginBottom: 8 }}>✏️</div>
                    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{selTopic}</div>
                    <div style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>8 fill-in-the-blank exercises · {selCategory} · Level {selLevel}</div>
                    <button style={{ ...s.btn(), padding: "12px 32px" }} onClick={loadExercises}>Generate Exercises 🤖</button>
                  </div>
                )}
                {exLoading && <LoadingSpinner text="Generating exercises..." />}
                {exData && (
                  fillState.done ? (
                    <div style={{ ...s.card, textAlign: "center", padding: 32 }}>
                      <div style={{ fontSize: 48 }}>🎉</div>
                      <div style={{ fontSize: 24, fontWeight: 700 }}>{fillState.score}/{exData.length}</div>
                      <div style={{ color: FLAG.red, fontWeight: 600, marginTop: 6 }}>+{fillState.score * 10} XP!</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
                        <button style={s.btn()} onClick={() => { updateScore("ex_" + selLevel + "_" + selTopic, fillState.score, exData.length); setFillState({ idx: 0, input: "", result: null, done: false, score: 0 }); }}>Try Again</button>
                        <button style={s.btn("#555")} onClick={loadExercises}>New Exercises 🤖</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Exercise {fillState.idx + 1} of {exData.length}</div>
                      <div style={{ ...s.card, background: "#f5f3ff", border: "2px solid #c4b5fd", marginBottom: 12 }}>
                        <div style={{ fontSize: 20, fontWeight: 700 }}>{exData[fillState.idx].sentence}</div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{exData[fillState.idx].hint}</div>
                      </div>
                      <input value={fillState.input} onChange={e => setFillState(st => ({ ...st, input: e.target.value }))}
                        onKeyDown={e => {
                          if (e.key === "Enter" && !fillState.result && fillState.input) {
                            const correct = fillState.input.trim().toLowerCase() === exData[fillState.idx].answer.toLowerCase();
                            setFillState(st => ({ ...st, result: correct ? "correct" : "wrong", score: correct ? st.score + 1 : st.score }));
                            setTimeout(() => {
                              if (fillState.idx + 1 >= exData.length) setFillState(st => ({ ...st, done: true }));
                              else setFillState(st => ({ ...st, idx: st.idx + 1, input: "", result: null }));
                            }, 1000);
                          }
                        }}
                        placeholder="Type the missing word..." style={{ ...s.inp, border: "2px solid " + (fillState.result === "correct" ? "#22c55e" : fillState.result === "wrong" ? "#ef4444" : "#ddd"), background: fillState.result === "correct" ? "#dcfce7" : fillState.result === "wrong" ? "#fee2e2" : "#fff" }} />
                      {fillState.result && (
                        <div style={{ ...s.card, background: fillState.result === "correct" ? "#dcfce7" : "#fee2e2", border: "none", marginBottom: 8, fontWeight: 600, color: fillState.result === "correct" ? "#166534" : "#991b1b", textAlign: "center" }}>
                          {fillState.result === "correct" ? "Richtig! Correct!" : "Wrong! Answer: " + exData[fillState.idx].answer}
                        </div>
                      )}
                      <button style={s.btn()} disabled={!fillState.input || !!fillState.result} onClick={() => {
                        const correct = fillState.input.trim().toLowerCase() === exData[fillState.idx].answer.toLowerCase();
                        setFillState(st => ({ ...st, result: correct ? "correct" : "wrong", score: correct ? st.score + 1 : st.score }));
                        setTimeout(() => {
                          if (fillState.idx + 1 >= exData.length) setFillState(st => ({ ...st, done: true }));
                          else setFillState(st => ({ ...st, idx: st.idx + 1, input: "", result: null }));
                        }, 1000);
                      }}>Check Answer</button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {screen === "progress" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>📊 My Progress</div>
            <div style={{ ...s.card, background: "linear-gradient(135deg,#1a1a1a,#333)", color: "#fff", border: "none", textAlign: "center", padding: 20 }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: FLAG.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, color: FLAG.black, margin: "0 auto" }}>{user.name[0].toUpperCase()}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8 }}>{user.name}</div>
              <div style={{ fontSize: 12, opacity: .7 }}>📱 {user.phone}</div>
              <div style={{ background: level.color, borderRadius: 20, padding: "3px 14px", fontSize: 12, fontWeight: 700, display: "inline-block", marginTop: 6 }}>{level.label}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 12 }}>
                <div><div style={{ fontSize: 22, fontWeight: 700 }}>{user.xp || 0}</div><div style={{ fontSize: 10, opacity: .7 }}>Total XP</div></div>
                <div><div style={{ fontSize: 22, fontWeight: 700 }}>{Object.keys(user.scores || {}).length}</div><div style={{ fontSize: 10, opacity: .7 }}>Activities</div></div>
                <div><div style={{ fontSize: 22, fontWeight: 700 }}>{isPaid ? "💎" : "🆓"}</div><div style={{ fontSize: 10, opacity: .7 }}>{isPaid ? "Premium" : "Free"}</div></div>
              </div>
            </div>
            {!isPaid && <UpsellCard onDismiss={() => { }} studentName={user.name} />}
            <div style={{ fontWeight: 600, fontSize: 14, margin: "8px 0 8px" }}>Level Roadmap</div>
            {[{ label: "Beginner A1", xp: 0 }, { label: "Elementary A1+", xp: 400 }, { label: "Intermediate A2", xp: 1000 }, { label: "Advanced B1", xp: 2000 }].map((lvl, i) => {
              const done = (user.xp || 0) >= lvl.xp;
              return (
                <div key={lvl.label} style={{ ...s.card, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? FLAG.gold : "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{done ? "⭐" : "○"}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{lvl.label}</div><div style={{ fontSize: 11, color: "#888" }}>{lvl.xp} XP required</div></div>
                  {done && <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 700 }}>✓</span>}
                </div>
              );
            })}
            <div style={{ fontWeight: 600, fontSize: 14, margin: "12px 0 8px" }}>Activity Scores</div>
            {Object.keys(user.scores || {}).length === 0 ? (
              <div style={{ ...s.card, textAlign: "center", color: "#888", padding: 20 }}>No scores yet — complete some activities!</div>
            ) : Object.entries(user.scores || {}).map(([key, val]) => (
              <div key={key} style={{ ...s.card, padding: "10px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 12 }}>{key.replace(/_/g, " ")}</span>
                  <span style={{ fontWeight: 700, color: val >= 70 ? "#22c55e" : val >= 50 ? "#d97706" : FLAG.red }}>{val}%</span>
                </div>
                <div style={{ background: "#eee", borderRadius: 8, height: 7, overflow: "hidden" }}>
                  <div style={{ width: val + "%", height: "100%", background: val >= 70 ? "#22c55e" : val >= 50 ? "#d97706" : FLAG.red, borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav style={s.nav}>
        {navItems.map(item => (
          <button key={item.id} style={s.nb(screen === item.id)} onClick={() => setScreen(item.id)}>
            <span style={{ fontSize: 15 }}>{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}