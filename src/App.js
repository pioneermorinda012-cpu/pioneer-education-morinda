import { useState, useEffect } from "react";

const FLAG = { black: "#1a1a1a", red: "#DD0000", gold: "#FFCE00" };

const lessons = [
  { id:1, title:"Greetings", icon:"👋", color:"#e8f4fd", vocab:[
    {de:"Hallo",en:"Hello"},{de:"Guten Morgen",en:"Good morning"},{de:"Guten Tag",en:"Good day"},
    {de:"Guten Abend",en:"Good evening"},{de:"Tschüss",en:"Bye"},{de:"Auf Wiedersehen",en:"Goodbye"},
    {de:"Bitte",en:"Please"},{de:"Danke",en:"Thank you"},{de:"Entschuldigung",en:"Excuse me"},{de:"Ja",en:"Yes"},{de:"Nein",en:"No"}
  ]},
  { id:2, title:"Numbers", icon:"🔢", color:"#fef9e7", vocab:[
    {de:"Eins",en:"One"},{de:"Zwei",en:"Two"},{de:"Drei",en:"Three"},{de:"Vier",en:"Four"},
    {de:"Fünf",en:"Five"},{de:"Sechs",en:"Six"},{de:"Sieben",en:"Seven"},{de:"Acht",en:"Eight"},
    {de:"Neun",en:"Nine"},{de:"Zehn",en:"Ten"},{de:"Zwanzig",en:"Twenty"},{de:"Hundert",en:"Hundred"}
  ]},
  { id:3, title:"Colors", icon:"🎨", color:"#fdf2f8", vocab:[
    {de:"Rot",en:"Red"},{de:"Blau",en:"Blue"},{de:"Grün",en:"Green"},{de:"Gelb",en:"Yellow"},
    {de:"Schwarz",en:"Black"},{de:"Weiß",en:"White"},{de:"Orange",en:"Orange"},{de:"Lila",en:"Purple"},
    {de:"Rosa",en:"Pink"},{de:"Braun",en:"Brown"}
  ]},
  { id:4, title:"Family", icon:"👨‍👩‍👧", color:"#f0fdf4", vocab:[
    {de:"Mutter",en:"Mother"},{de:"Vater",en:"Father"},{de:"Bruder",en:"Brother"},{de:"Schwester",en:"Sister"},
    {de:"Kind",en:"Child"},{de:"Großmutter",en:"Grandmother"},{de:"Großvater",en:"Grandfather"},
    {de:"Tante",en:"Aunt"},{de:"Onkel",en:"Uncle"},{de:"Cousin",en:"Cousin"}
  ]},
  { id:5, title:"Food & Drink", icon:"🍎", color:"#fff7ed", vocab:[
    {de:"Brot",en:"Bread"},{de:"Wasser",en:"Water"},{de:"Milch",en:"Milk"},{de:"Kaffee",en:"Coffee"},
    {de:"Apfel",en:"Apple"},{de:"Fleisch",en:"Meat"},{de:"Käse",en:"Cheese"},{de:"Ei",en:"Egg"},
    {de:"Suppe",en:"Soup"},{de:"Kuchen",en:"Cake"},{de:"Tee",en:"Tea"},{de:"Saft",en:"Juice"}
  ]},
  { id:6, title:"Days & Months", icon:"📅", color:"#f5f3ff", vocab:[
    {de:"Montag",en:"Monday"},{de:"Dienstag",en:"Tuesday"},{de:"Mittwoch",en:"Wednesday"},
    {de:"Donnerstag",en:"Thursday"},{de:"Freitag",en:"Friday"},{de:"Samstag",en:"Saturday"},{de:"Sonntag",en:"Sunday"},
    {de:"Januar",en:"January"},{de:"Februar",en:"February"},{de:"März",en:"March"},{de:"Dezember",en:"December"}
  ]},
  { id:7, title:"Body Parts", icon:"🫀", color:"#fef2f2", vocab:[
    {de:"Kopf",en:"Head"},{de:"Auge",en:"Eye"},{de:"Nase",en:"Nose"},{de:"Mund",en:"Mouth"},
    {de:"Ohr",en:"Ear"},{de:"Hand",en:"Hand"},{de:"Fuß",en:"Foot"},{de:"Arm",en:"Arm"},
    {de:"Bein",en:"Leg"},{de:"Herz",en:"Heart"}
  ]},
  { id:8, title:"At School", icon:"🏫", color:"#ecfdf5", vocab:[
    {de:"Schule",en:"School"},{de:"Lehrer",en:"Teacher"},{de:"Schüler",en:"Student"},{de:"Buch",en:"Book"},
    {de:"Heft",en:"Notebook"},{de:"Stift",en:"Pen"},{de:"Tafel",en:"Blackboard"},{de:"Klasse",en:"Class"},
    {de:"Hausaufgabe",en:"Homework"},{de:"Prüfung",en:"Exam"}
  ]},
  { id:9, title:"Transport", icon:"🚌", color:"#eff6ff", vocab:[
    {de:"Auto",en:"Car"},{de:"Bus",en:"Bus"},{de:"Zug",en:"Train"},{de:"Fahrrad",en:"Bicycle"},
    {de:"Flugzeug",en:"Airplane"},{de:"Straße",en:"Street"},{de:"Bahnhof",en:"Train station"},
    {de:"Ticket",en:"Ticket"},{de:"Haltestelle",en:"Bus stop"}
  ]},
  { id:10, title:"Weather", icon:"🌤️", color:"#fafafa", vocab:[
    {de:"Sonne",en:"Sun"},{de:"Regen",en:"Rain"},{de:"Schnee",en:"Snow"},{de:"Wind",en:"Wind"},
    {de:"Wolke",en:"Cloud"},{de:"Warm",en:"Warm"},{de:"Kalt",en:"Cold"},{de:"Heiß",en:"Hot"},
    {de:"Gewitter",en:"Thunderstorm"},{de:"Nebel",en:"Fog"}
  ]},
];

const fillBlanks = [
  {sentence:"Ich ___ Student.",answer:"bin",hint:"(I am a student)"},
  {sentence:"Er ___ aus Deutschland.",answer:"kommt",hint:"(He comes from Germany)"},
  {sentence:"Wir ___ Deutsch.",answer:"lernen",hint:"(We learn German)"},
  {sentence:"Sie ___ einen Kaffee.",answer:"trinkt",hint:"(She drinks a coffee)"},
  {sentence:"Das Kind ___ gern.",answer:"spielt",hint:"(The child likes to play)"},
  {sentence:"Ich ___ Hunger.",answer:"habe",hint:"(I am hungry)"},
  {sentence:"Das Buch ___ interessant.",answer:"ist",hint:"(The book is interesting)"},
  {sentence:"Wir ___ in Berlin.",answer:"wohnen",hint:"(We live in Berlin)"},
];

const dialogues = [
  { title:"At the Café", lines:[
    {speaker:"Kellner",text:"Guten Tag! Was möchten Sie?"},
    {speaker:"Kunde",text:"Ich möchte einen Kaffee, bitte."},
    {speaker:"Kellner",text:"Groß oder klein?"},
    {speaker:"Kunde",text:"Klein, bitte. Was kostet das?"},
    {speaker:"Kellner",text:"Zwei Euro, bitte."},
  ], questions:[
    {q:"What does the customer order?",a:"A coffee",opts:["Tea","A coffee","Water","Juice"]},
    {q:"What does 'Was kostet das?' mean?",a:"How much does that cost?",opts:["What is that?","Do you have that?","How much does that cost?","Where is that?"]},
  ]},
  { title:"At School", lines:[
    {speaker:"Lehrerin",text:"Guten Morgen! Wie heißt du?"},
    {speaker:"Schüler",text:"Ich heiße Max. Guten Morgen!"},
    {speaker:"Lehrerin",text:"Wie alt bist du, Max?"},
    {speaker:"Schüler",text:"Ich bin zwölf Jahre alt."},
    {speaker:"Lehrerin",text:"Sehr gut! Setz dich bitte."},
  ], questions:[
    {q:"What is the student's name?",a:"Max",opts:["Tom","Max","Jan","Felix"]},
    {q:"How old is the student?",a:"12 years old",opts:["10 years old","11 years old","12 years old","13 years old"]},
  ]},
];

function useStorage(key, def) {
  const [val, setVal] = useState(() => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } });
  const save = v => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
}

const allVocab = lessons.flatMap(l => l.vocab.map(v => ({ ...v, lesson: l.title })));

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function getOpts(correct, pool) {
  const opts = [correct];
  const others = shuffle(pool.filter(e => e !== correct));
  for (const o of others) { if (opts.length < 4) opts.push(o); }
  return shuffle(opts);
}

export default function App() {
  const [users, setUsers] = useStorage("pem_users", {});
  const [currentUser, setCurrentUser] = useStorage("pem_current", null);
  const [authScreen, setAuthScreen] = useState("login");
  const [loginForm, setLoginForm] = useState({ name:"", pin:"" });
  const [authError, setAuthError] = useState("");

  const [screen, setScreen] = useState("home");
  const [activeLesson, setActiveLesson] = useState(null);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizWords, setQuizWords] = useState([]);
  const [quizState, setQuizState] = useState({ idx:0, score:0, answered:null, done:false });
  const [fillState, setFillState] = useState({ idx:0, input:"", result:null, done:false, score:0 });
  const [dlgIdx, setDlgIdx] = useState(0);
  const [dialogState, setDialogState] = useState({ qIdx:0, answered:null, score:0, done:false });

  const user = currentUser ? users[currentUser] : null;

  useEffect(() => {
    const words = shuffle(allVocab).slice(0, 10).map(w => ({
      question: w.de, correct: w.en,
      options: getOpts(w.en, allVocab.map(v => v.en))
    }));
    setQuizWords(words);
  }, []);

  function updateScore(key, score, total) {
    if (!currentUser) return;
    const updated = { ...users };
    if (!updated[currentUser].scores) updated[currentUser].scores = {};
    const prev = updated[currentUser].scores[key] || 0;
    updated[currentUser].scores[key] = Math.max(prev, Math.round((score / total) * 100));
    if (!updated[currentUser].xp) updated[currentUser].xp = 0;
    updated[currentUser].xp += score * 10;
    updated[currentUser].streak = (updated[currentUser].streak || 0) + 1;
    setUsers(updated);
  }

  function register() {
    const name = loginForm.name.trim();
    const pin = loginForm.pin.trim();
    if (!name || pin.length < 4) { setAuthError("Name required & PIN must be 4+ digits"); return; }
    if (users[name]) { setAuthError("Name already taken. Try logging in."); return; }
    const newUsers = { ...users, [name]: { name, pin, xp: 0, streak: 0, scores: {}, joined: new Date().toLocaleDateString() } };
    setUsers(newUsers);
    setCurrentUser(name);
    setAuthError("");
  }

  function login() {
    const name = loginForm.name.trim();
    if (!users[name]) { setAuthError("Student not found. Please register."); return; }
    if (users[name].pin !== loginForm.pin.trim()) { setAuthError("Wrong PIN. Try again."); return; }
    setCurrentUser(name);
    setAuthError("");
  }

  function logout() { setCurrentUser(null); setScreen("home"); }

  function getLevel(xp) {
    if (xp >= 2000) return { label:"Advanced", color:"#7c3aed" };
    if (xp >= 1000) return { label:"Intermediate", color:"#059669" };
    if (xp >= 400) return { label:"Elementary", color:"#d97706" };
    return { label:"Beginner", color:FLAG.red };
  }

  const s = {
    wrap: { fontFamily:"system-ui,sans-serif", maxWidth:680, margin:"0 auto", paddingBottom:80 },
    flagBar: { height:6, background:`linear-gradient(to right,${FLAG.black} 33%,${FLAG.red} 33% 66%,${FLAG.gold} 66%)` },
    header: { background:FLAG.black, color:"#fff", padding:"14px 16px", display:"flex", alignItems:"center", gap:10 },
    card: { background:"#fff", borderRadius:12, border:"1px solid #eee", padding:"16px", marginBottom:12 },
    btn: (c=FLAG.red) => ({ background:c, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", cursor:"pointer", fontWeight:600, fontSize:14 }),
    nav: { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:680, background:"#fff", borderTop:"1px solid #eee", display:"flex", zIndex:100 },
    navBtn: (a) => ({ flex:1, padding:"8px 2px", border:"none", background:a?"#fff8e1":"transparent", cursor:"pointer", fontSize:9.5, color:a?FLAG.red:"#888", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }),
    input: { width:"100%", padding:"11px 14px", fontSize:15, borderRadius:8, border:"1.5px solid #ddd", outline:"none", boxSizing:"border-box", marginBottom:10 },
  };

  if (!currentUser) return (
    <div style={s.wrap}>
      <div style={s.flagBar}/>
      <div style={s.header}>
        <span style={{fontSize:26}}>🇩🇪</span>
        <div>
          <div style={{fontWeight:700,fontSize:17}}>Pioneer Education Morinda</div>
          <div style={{fontSize:11,opacity:.7}}>Deutsch A1 · German for Beginners</div>
        </div>
      </div>
      <div style={{padding:"24px 16px"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:48}}>🎓</div>
          <div style={{fontWeight:700,fontSize:22,marginTop:8}}>Welcome!</div>
          <div style={{color:"#666",fontSize:14,marginTop:4}}>Please log in or create your student account</div>
        </div>
        <div style={{display:"flex",gap:0,marginBottom:20,borderRadius:10,overflow:"hidden",border:"1.5px solid #ddd"}}>
          {["login","register"].map(t=>(
            <button key={t} onClick={()=>{setAuthScreen(t);setAuthError("");}} style={{flex:1,padding:"10px",border:"none",background:authScreen===t?FLAG.red:"#fff",color:authScreen===t?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:14}}>
              {t==="login"?"Login":"Register"}
            </button>
          ))}
        </div>
        <input style={s.input} placeholder="Your name" value={loginForm.name} onChange={e=>setLoginForm(f=>({...f,name:e.target.value}))}/>
        <input style={s.input} placeholder="4-digit PIN" type="password" maxLength={6} value={loginForm.pin} onChange={e=>setLoginForm(f=>({...f,pin:e.target.value}))}/>
        {authError && <div style={{color:FLAG.red,fontSize:13,marginBottom:10}}>{authError}</div>}
        <button style={{...s.btn(),width:"100%",padding:"13px"}} onClick={authScreen==="login"?login:register}>
          {authScreen==="login"?"Login →":"Create Account →"}
        </button>
      </div>
    </div>
  );

  const level = getLevel(user.xp || 0);
 
  const navItems = [
    {id:"home",emoji:"🏠",label:"Home"},
    {id:"lessons",emoji:"📚",label:"Lessons"},
    {id:"flashcards",emoji:"🃏",label:"Cards"},
    {id:"quiz",emoji:"🧠",label:"Quiz"},
    {id:"fill",emoji:"✏️",label:"Exercises"},
    {id:"dialogue",emoji:"💬",label:"Dialogue"},
    {id:"progress",emoji:"📊",label:"Progress"},
  ];

  return (
    <div style={s.wrap}>
      <div style={s.flagBar}/>
      <div style={s.header}>
        <span style={{fontSize:22}}>🇩🇪</span>
        <div>
          <div style={{fontWeight:700,fontSize:16}}>Pioneer Education Morinda</div>
          <div style={{fontSize:11,opacity:.7}}>Deutsch A1</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
          <div style={{background:FLAG.gold,color:FLAG.black,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700}}>🔥 {user.streak||0}</div>
          <div style={{background:"#333",color:"#fff",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:600}}>⭐ {user.xp||0} XP</div>
          <button onClick={logout} style={{background:"transparent",border:"none",color:"#aaa",cursor:"pointer",fontSize:12}}>Logout</button>
        </div>
      </div>

      <div style={{padding:"14px 14px 0"}}>

        {/* HOME */}
        {screen==="home" && (
          <div>
            <div style={{...s.card,background:"linear-gradient(135deg,#1a1a1a,#333)",color:"#fff",border:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:46,height:46,borderRadius:"50%",background:FLAG.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:18,color:FLAG.black}}>
                  {user.name[0].toUpperCase()}
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:17}}>Hallo, {user.name}! 👋</div>
                  <div style={{fontSize:12,opacity:.8,marginTop:2}}>Joined {user.joined}</div>
                </div>
                <div style={{marginLeft:"auto",textAlign:"right"}}>
                  <div style={{background:level.color,borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:700,color:"#fff"}}>{level.label}</div>
                  <div style={{fontSize:11,opacity:.7,marginTop:4}}>{user.xp||0} XP total</div>
                </div>
              </div>
              <div style={{marginTop:14,background:"rgba(255,255,255,0.15)",borderRadius:8,height:8,overflow:"hidden"}}>
                <div style={{width:`${Math.min(100,(user.xp||0)/20)}%`,height:"100%",background:FLAG.gold,borderRadius:8,transition:"width 0.5s"}}/>
              </div>
              <div style={{fontSize:11,opacity:.6,marginTop:4}}>XP to next level: {Math.max(0,400-(user.xp||0))} XP</div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:12}}>
              {[
                {label:"Lessons",val:lessons.length,emoji:"📚"},
                {label:"Words",val:allVocab.length,emoji:"📖"},
                {label:"Best Score",val:`${Math.max(0,...Object.values(user.scores||{}))}%`,emoji:"🏆"},
              ].map(m=>(
                <div key={m.label} style={{background:"#f9f9f9",borderRadius:10,padding:"12px 8px",textAlign:"center",border:"1px solid #eee"}}>
                  <div style={{fontSize:22}}>{m.emoji}</div>
                  <div style={{fontWeight:700,fontSize:18,marginTop:2}}>{m.val}</div>
                  <div style={{fontSize:11,color:"#888"}}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{fontWeight:600,fontSize:15,marginBottom:8}}>Continue Learning</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {id:"lessons",emoji:"📚",label:"Lessons",desc:"10 topics available"},
                {id:"flashcards",emoji:"🃏",label:"Flashcards",desc:`${allVocab.length} vocabulary cards`},
                {id:"quiz",emoji:"🧠",label:"Vocabulary Quiz",desc:"Test your knowledge"},
                {id:"fill",emoji:"✏️",label:"Fill in the Blank",desc:"Grammar practice"},
                {id:"dialogue",emoji:"💬",label:"Dialogues",desc:"2 conversations"},
                {id:"progress",emoji:"📊",label:"My Progress",desc:"View your scores"},
              ].map(item=>(
                <div key={item.id} style={{...s.card,cursor:"pointer"}} onClick={()=>setScreen(item.id)}>
                  <div style={{fontSize:26}}>{item.emoji}</div>
                  <div style={{fontWeight:600,fontSize:14,marginTop:4}}>{item.label}</div>
                  <div style={{fontSize:11,color:"#888",marginTop:2}}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div style={{...s.card,background:"#e8f4fd",border:"1px solid #90caf9",textAlign:"center",marginTop:4}}>
              <div style={{fontSize:11,color:"#888",marginBottom:4}}>🌟 Phrase of the day</div>
              <div style={{fontSize:20,fontWeight:700}}>Wie geht es Ihnen?</div>
              <div style={{color:"#555",marginTop:4,fontSize:14}}>How are you? (formal)</div>
            </div>
          </div>
        )}

        {/* LESSONS */}
        {screen==="lessons" && !activeLesson && (
          <div>
            <div style={{fontWeight:700,fontSize:19,marginBottom:12}}>📚 All Topics</div>
            {lessons.map(l=>(
              <div key={l.id} style={{...s.card,background:l.color,cursor:"pointer"}} onClick={()=>{setActiveLesson(l);}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:26}}>{l.icon}</span>
                  <div>
                    <div style={{fontWeight:600,fontSize:15}}>{l.title}</div>
                    <div style={{fontSize:12,color:"#666"}}>{l.vocab.length} words</div>
                  </div>
                  <div style={{marginLeft:"auto",fontSize:18,color:"#aaa"}}>→</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {screen==="lessons" && activeLesson && (
          <div>
            <button onClick={()=>setActiveLesson(null)} style={{background:"none",border:"none",color:FLAG.red,cursor:"pointer",fontWeight:600,marginBottom:10,padding:0}}>← Back</button>
            <div style={{fontWeight:700,fontSize:19,marginBottom:2}}>{activeLesson.icon} {activeLesson.title}</div>
            <div style={{fontSize:13,color:"#888",marginBottom:14}}>{activeLesson.vocab.length} words</div>
            {activeLesson.vocab.map((v,i)=>(
              <div key={i} style={{...s.card,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px"}}>
                <div style={{fontWeight:700,fontSize:17,color:FLAG.black}}>{v.de}</div>
                <div style={{color:"#555",fontSize:15}}>{v.en}</div>
              </div>
            ))}
          </div>
        )}

        {/* FLASHCARDS */}
        {screen==="flashcards" && (
          <div>
            <div style={{fontWeight:700,fontSize:19,marginBottom:4}}>🃏 Flashcards</div>
            <div style={{fontSize:13,color:"#888",marginBottom:12}}>Card {cardIdx+1} of {allVocab.length} · Tap to flip</div>
            <div onClick={()=>setFlipped(f=>!f)} style={{...s.card,minHeight:170,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",background:flipped?"#fff8e1":"#e8f4fd",border:`2px solid ${flipped?FLAG.gold:"#90caf9"}`,transition:"background 0.3s"}}>
              <div style={{fontSize:11,color:"#888",marginBottom:8}}>{flipped?"English":"Deutsch"}</div>
              <div style={{fontSize:34,fontWeight:700,color:FLAG.black,textAlign:"center"}}>{flipped?allVocab[cardIdx].en:allVocab[cardIdx].de}</div>
              <div style={{fontSize:11,color:"#aaa",marginTop:4}}>{allVocab[cardIdx].lesson}</div>
              {!flipped&&<div style={{fontSize:12,color:"#bbb",marginTop:10}}>👆 Tap to reveal</div>}
            </div>
            <div style={{display:"flex",gap:8,marginTop:10}}>
              <button style={s.btn("#999")} onClick={()=>{setCardIdx(i=>Math.max(0,i-1));setFlipped(false);}}>← Prev</button>
              <button style={{...s.btn("#22c55e"),flex:1}} onClick={()=>{setCardIdx(i=>Math.min(allVocab.length-1,i+1));setFlipped(false);}}>Know it ✓</button>
              <button style={{...s.btn(FLAG.red),flex:1}} onClick={()=>{setCardIdx(i=>Math.min(allVocab.length-1,i+1));setFlipped(false);}}>Still learning</button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {screen==="quiz" && quizWords.length>0 && (
          <div>
            <div style={{fontWeight:700,fontSize:19,marginBottom:12}}>🧠 Vocabulary Quiz</div>
            {quizState.done ? (
              <div style={{...s.card,textAlign:"center",padding:32}}>
                <div style={{fontSize:52}}>{quizState.score>=7?"🏆":quizState.score>=5?"🎉":"💪"}</div>
                <div style={{fontSize:26,fontWeight:700,marginTop:8}}>{quizState.score}/{quizWords.length}</div>
                <div style={{color:"#666",marginTop:6}}>{quizState.score>=7?"Ausgezeichnet! Excellent!":quizState.score>=5?"Sehr gut! Well done!":"Nicht schlecht! Keep going!"}</div>
                <div style={{marginTop:10,background:"#f3f3f3",borderRadius:8,padding:"8px 16px",display:"inline-block",fontSize:14,fontWeight:600,color:FLAG.red}}>+{quizState.score*10} XP earned!</div>
                <br/>
                <button style={{...s.btn(),marginTop:16}} onClick={()=>{
                  updateScore("quiz",quizState.score,quizWords.length);
                  const words=shuffle(allVocab).slice(0,10).map(w=>({question:w.de,correct:w.en,options:getOpts(w.en,allVocab.map(v=>v.en))}));
                  setQuizWords(words);
                  setQuizState({idx:0,score:0,answered:null,done:false});
                }}>Try Again</button>
              </div>
            ):(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13,color:"#888"}}>
                  <span>Q {quizState.idx+1}/{quizWords.length}</span><span>Score: {quizState.score}</span>
                </div>
                <div style={{background:"#eee",borderRadius:8,height:6,marginBottom:14}}>
                  <div style={{width:`${(quizState.idx/quizWords.length)*100}%`,height:"100%",background:FLAG.red,borderRadius:8,transition:"width 0.3s"}}/>
                </div>
                <div style={{...s.card,textAlign:"center",background:"#e8f4fd",border:"2px solid #90caf9",marginBottom:14}}>
                  <div style={{fontSize:12,color:"#888",marginBottom:4}}>What does this mean in English?</div>
                  <div style={{fontSize:36,fontWeight:700}}>{quizWords[quizState.idx].question}</div>
                </div>
                {quizWords[quizState.idx].options.map(opt=>{
                  const isCorrect=opt===quizWords[quizState.idx].correct;
                  const isAnswered=quizState.answered!==null;
                  const isSelected=quizState.answered===opt;
                  let bg="#fff",border="1.5px solid #ddd",color="#333";
                  if(isAnswered){if(isCorrect){bg="#dcfce7";border="1.5px solid #22c55e";color="#166534";}else if(isSelected){bg="#fee2e2";border="1.5px solid #ef4444";color="#991b1b";}}
                  return(
                    <div key={opt} onClick={()=>{
                      if(quizState.answered!==null)return;
                      const correct=opt===quizWords[quizState.idx].correct;
                      const ns=correct?quizState.score+1:quizState.score;
                      setQuizState(s=>({...s,answered:opt,score:ns}));
                      setTimeout(()=>{
                        if(quizState.idx+1>=quizWords.length)setQuizState(s=>({...s,done:true}));
                        else setQuizState(s=>({...s,idx:s.idx+1,answered:null}));
                      },900);
                    }} style={{...s.card,cursor:isAnswered?"default":"pointer",background:bg,border,color,marginBottom:8,transition:"all 0.2s",fontWeight:isCorrect&&isAnswered?700:400}}>
                      {opt} {isAnswered&&isCorrect?"✓":isAnswered&&isSelected?"✗":""}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* FILL */}
        {screen==="fill" && (
          <div>
            <div style={{fontWeight:700,fontSize:19,marginBottom:12}}>✏️ Fill in the Blank</div>
            {fillState.done?(
              <div style={{...s.card,textAlign:"center",padding:32}}>
                <div style={{fontSize:52}}>🎉</div>
                <div style={{fontSize:26,fontWeight:700,marginTop:8}}>{fillState.score}/{fillBlanks.length}</div>
                <div style={{color:"#666",marginTop:6}}>Sehr gut! Great exercises!</div>
                <div style={{marginTop:10,background:"#f3f3f3",borderRadius:8,padding:"8px 16px",display:"inline-block",fontSize:14,fontWeight:600,color:FLAG.red}}>+{fillState.score*10} XP!</div>
                <br/>
                <button style={{...s.btn(),marginTop:16}} onClick={()=>{updateScore("fill",fillState.score,fillBlanks.length);setFillState({idx:0,input:"",result:null,done:false,score:0});}}>Try Again</button>
              </div>
            ):(
              <div>
                <div style={{fontSize:13,color:"#888",marginBottom:8}}>Exercise {fillState.idx+1} of {fillBlanks.length}</div>
                <div style={{...s.card,background:"#f5f3ff",border:"2px solid #c4b5fd",marginBottom:14}}>
                  <div style={{fontSize:22,fontWeight:700,letterSpacing:1}}>{fillBlanks[fillState.idx].sentence}</div>
                  <div style={{fontSize:13,color:"#888",marginTop:6}}>{fillBlanks[fillState.idx].hint}</div>
                </div>
                <input value={fillState.input} onChange={e=>setFillState(s=>({...s,input:e.target.value}))}
                  onKeyDown={e=>{if(e.key==="Enter"&&!fillState.result&&fillState.input){
                    const correct=fillState.input.trim().toLowerCase()===fillBlanks[fillState.idx].answer.toLowerCase();
                    const ns=correct?fillState.score+1:fillState.score;
                    setFillState(s=>({...s,result:correct?"correct":"wrong",score:ns}));
                    setTimeout(()=>{
                      if(fillState.idx+1>=fillBlanks.length)setFillState(s=>({...s,done:true}));
                      else setFillState(s=>({...s,idx:s.idx+1,input:"",result:null}));
                    },1000);
                  }}}
                  placeholder="Type the missing word..." style={{...s.input,border:`2px solid ${fillState.result==="correct"?"#22c55e":fillState.result==="wrong"?"#ef4444":"#ddd"}`,background:fillState.result==="correct"?"#dcfce7":fillState.result==="wrong"?"#fee2e2":"#fff"}}/>
                {fillState.result&&<div style={{...s.card,background:fillState.result==="correct"?"#dcfce7":"#fee2e2",border:"none",marginBottom:10,fontWeight:600,color:fillState.result==="correct"?"#166534":"#991b1b",textAlign:"center"}}>
                  {fillState.result==="correct"?"✓ Richtig! Correct!":`✗ Answer: "${fillBlanks[fillState.idx].answer}"`}
                </div>}
                <button style={s.btn()} disabled={!fillState.input||!!fillState.result} onClick={()=>{
                  const correct=fillState.input.trim().toLowerCase()===fillBlanks[fillState.idx].answer.toLowerCase();
                  const ns=correct?fillState.score+1:fillState.score;
                  setFillState(s=>({...s,result:correct?"correct":"wrong",score:ns}));
                  setTimeout(()=>{
                    if(fillState.idx+1>=fillBlanks.length)setFillState(s=>({...s,done:true}));
                    else setFillState(s=>({...s,idx:s.idx+1,input:"",result:null}));
                  },1000);
                }}>Check Answer</button>
              </div>
            )}
          </div>
        )}

        {/* DIALOGUE */}
        {screen==="dialogue" && (
          <div>
            <div style={{fontWeight:700,fontSize:19,marginBottom:10}}>💬 Dialogue Practice</div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              {dialogues.map((d,i)=>(
                <button key={i} onClick={()=>{setDlgIdx(i);setDialogState({qIdx:0,answered:null,score:0,done:false});}} style={{...s.btn(dlgIdx===i?FLAG.red:"#ddd"),color:dlgIdx===i?"#fff":"#333",flex:1,padding:"8px"}}>{d.title}</button>
              ))}
            </div>
            <div style={{...s.card,background:"#f0fdf4",border:"1px solid #86efac",marginBottom:12}}>
              {dialogues[dlgIdx].lines.map((l,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:8,justifyContent:l.speaker==="Kellner"||l.speaker==="Lehrerin"?"flex-start":"flex-end"}}>
                  <div style={{background:l.speaker==="Kellner"||l.speaker==="Lehrerin"?"#fff":"#dcfce7",border:"1px solid #d1fae5",borderRadius:10,padding:"8px 12px",maxWidth:"75%"}}>
                    <div style={{fontSize:10,color:"#888",marginBottom:2}}>{l.speaker}</div>
                    <div style={{fontSize:14,fontWeight:500}}>{l.text}</div>
                  </div>
                </div>
              ))}
            </div>
            {dialogState.done?(
              <div style={{...s.card,textAlign:"center",padding:24}}>
                <div style={{fontSize:42}}>🌟</div>
                <div style={{fontSize:22,fontWeight:700}}>{dialogState.score}/{dialogues[dlgIdx].questions.length} correct!</div>
                <div style={{marginTop:8,color:FLAG.red,fontWeight:600}}>+{dialogState.score*10} XP!</div>
                <button style={{...s.btn(),marginTop:12}} onClick={()=>{updateScore(`dlg${dlgIdx}`,dialogState.score,dialogues[dlgIdx].questions.length);setDialogState({qIdx:0,answered:null,score:0,done:false});}}>Try Again</button>
              </div>
            ):(
              <div>
                <div style={{fontWeight:600,marginBottom:10,fontSize:15}}>Q{dialogState.qIdx+1}: {dialogues[dlgIdx].questions[dialogState.qIdx].q}</div>
                {dialogues[dlgIdx].questions[dialogState.qIdx].opts.map(opt=>{
                  const isCorrect=opt===dialogues[dlgIdx].questions[dialogState.qIdx].a;
                  const isAnswered=dialogState.answered!==null;
                  const isSelected=dialogState.answered===opt;
                  let bg="#fff",border="1.5px solid #ddd";
                  if(isAnswered){if(isCorrect){bg="#dcfce7";border="1.5px solid #22c55e";}else if(isSelected){bg="#fee2e2";border="1.5px solid #ef4444";}}
                  return(
                    <div key={opt} onClick={()=>{
                      if(dialogState.answered!==null)return;
                      const correct=opt===dialogues[dlgIdx].questions[dialogState.qIdx].a;
                      const ns=correct?dialogState.score+1:dialogState.score;
                      setDialogState(s=>({...s,answered:opt,score:ns}));
                      setTimeout(()=>{
                        if(dialogState.qIdx+1>=dialogues[dlgIdx].questions.length)setDialogState(s=>({...s,done:true}));
                        else setDialogState(s=>({...s,qIdx:s.qIdx+1,answered:null}));
                      },900);
                    }} style={{...s.card,cursor:isAnswered?"default":"pointer",background:bg,border,marginBottom:8,transition:"all 0.2s"}}>
                      {opt}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PROGRESS */}
        {screen==="progress" && (
          <div>
            <div style={{fontWeight:700,fontSize:19,marginBottom:12}}>📊 My Progress</div>
            <div style={{...s.card,background:"linear-gradient(135deg,#1a1a1a,#333)",color:"#fff",border:"none",textAlign:"center",padding:24}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:FLAG.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:22,color:FLAG.black,margin:"0 auto"}}>
                {user.name[0].toUpperCase()}
              </div>
              <div style={{fontWeight:700,fontSize:20,marginTop:8}}>{user.name}</div>
              <div style={{background:level.color,borderRadius:20,padding:"3px 14px",fontSize:13,fontWeight:700,display:"inline-block",marginTop:6}}>{level.label}</div>
              <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:14}}>
                <div><div style={{fontSize:24,fontWeight:700}}>{user.xp||0}</div><div style={{fontSize:11,opacity:.7}}>Total XP</div></div>
                <div><div style={{fontSize:24,fontWeight:700}}>{user.streak||0}</div><div style={{fontSize:11,opacity:.7}}>Streak</div></div>
                <div><div style={{fontSize:24,fontWeight:700}}>{Object.keys(user.scores||{}).length}</div><div style={{fontSize:11,opacity:.7}}>Activities</div></div>
              </div>
            </div>

            <div style={{fontWeight:600,fontSize:15,margin:"14px 0 8px"}}>Activity Scores</div>
            {Object.keys(user.scores||{}).length===0?(
              <div style={{...s.card,textAlign:"center",color:"#888",padding:24}}>No scores yet — complete some activities!</div>
            ):(
              Object.entries(user.scores||{}).map(([key,val])=>(
                <div key={key} style={{...s.card,padding:"12px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontWeight:600,fontSize:14,textTransform:"capitalize"}}>{key==="quiz"?"Vocabulary Quiz":key==="fill"?"Fill in the Blank":key.startsWith("dlg")?"Dialogue "+(parseInt(key.replace("dlg",""))+1):key}</span>
                    <span style={{fontWeight:700,color:val>=70?"#22c55e":val>=50?FLAG.gold:FLAG.red}}>{val}%</span>
                  </div>
                  <div style={{background:"#eee",borderRadius:8,height:8,overflow:"hidden"}}>
                    <div style={{width:`${val}%`,height:"100%",background:val>=70?"#22c55e":val>=50?FLAG.gold:FLAG.red,borderRadius:8,transition:"width 0.5s"}}/>
                  </div>
                </div>
              ))
            )}

            <div style={{fontWeight:600,fontSize:15,margin:"14px 0 8px"}}>XP to next level</div>
            <div style={{...s.card}}>
              {[{label:"Beginner",xp:0},{label:"Elementary",xp:400},{label:"Intermediate",xp:1000},{label:"Advanced",xp:2000}].map((lvl,i,arr)=>{
                const done=(user.xp||0)>=lvl.xp;
                return(
                  <div key={lvl.label} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i<arr.length-1?10:0}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:done?FLAG.gold:"#eee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{done?"⭐":"○"}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600}}>{lvl.label}</div>
                      <div style={{fontSize:11,color:"#888"}}>{lvl.xp} XP required</div>
                    </div>
                    {done&&<span style={{fontSize:12,color:"#22c55e",fontWeight:700}}>✓ Reached</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <nav style={s.nav}>
        {navItems.map(item=>(
          <button key={item.id} style={s.navBtn(screen===item.id)} onClick={()=>{setScreen(item.id);setActiveLesson(null);}}>
            <span style={{fontSize:16}}>{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}