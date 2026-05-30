import { useState, useEffect } from "react";

const FLAG = { black: "#1a1a1a", red: "#DD0000", gold: "#FFCE00" };
const ADMIN_PASSWORD = "pioneer@admin2024";
const VOUCHER_CODES = ["PIONEER2024","DEUTSCH2024","MORINDA01","LEARN123","PEM2024A","PEM2024B","PEM2024C","PEM2024D","PEM2024E","PEM2024F"];

// Emoji illustrations for vocabulary words
const WORD_EMOJI = {
  "Hallo":"👋","Guten Morgen":"🌅","Guten Tag":"☀️","Guten Abend":"🌙","Tschüss":"✋","Auf Wiedersehen":"🚶",
  "Bitte":"🙏","Danke":"💖","Entschuldigung":"😅","Ja":"✅","Nein":"❌",
  "Eins":"1️⃣","Zwei":"2️⃣","Drei":"3️⃣","Vier":"4️⃣","Fünf":"5️⃣","Sechs":"6️⃣","Sieben":"7️⃣","Acht":"8️⃣","Neun":"9️⃣","Zehn":"🔟","Zwanzig":"🔢","Hundert":"💯",
  "Rot":"🔴","Blau":"🔵","Grün":"🟢","Gelb":"🟡","Schwarz":"⚫","Weiß":"⚪","Orange":"🟠","Lila":"🟣","Rosa":"🌸","Braun":"🟤",
  "Mutter":"👩","Vater":"👨","Bruder":"👦","Schwester":"👧","Kind":"🧒","Großmutter":"👵","Großvater":"👴","Tante":"👩‍🦱","Onkel":"👨‍🦱","Familie":"👨‍👩‍👧‍👦",
  "Brot":"🍞","Wasser":"💧","Milch":"🥛","Kaffee":"☕","Apfel":"🍎","Fleisch":"🥩","Käse":"🧀","Ei":"🥚","Suppe":"🍲","Kuchen":"🎂","Tee":"🍵","Saft":"🧃",
  "Kaufen":"🛒","Verkaufen":"💰","Preis":"🏷️","Billig":"💸","Teuer":"💎","Geschäft":"🏪","Markt":"🏬","Kasse":"💳","Rabatt":"🎫","Quittung":"🧾","Größe":"📏","Farbe":"🎨",
  "Links":"⬅️","Rechts":"➡️","Geradeaus":"⬆️","Straße":"🛣️","Kreuzung":"🚦","Brücke":"🌉","Nah":"📍","Weit":"🗺️","Norden":"⬆️","Süden":"⬇️","Osten":"➡️","Westen":"⬅️",
  "Glücklich":"😊","Traurig":"😢","Wütend":"😡","Müde":"😴","Aufgeregt":"🤩","Ängstlich":"😰","Überrascht":"😲","Stolz":"🏆","Eifersüchtig":"😒","Verliebt":"❤️",
  "Ich war":"⏮️","Er hatte":"📦","Wir gingen":"🚶","Sie kam":"🚪","Gestern":"📅","Letzte Woche":"🗓️","Früher":"⌛","Damals":"📜","Ich habe gegessen":"🍽️","Er hat geschlafen":"😴",
  "Arzt":"👨‍⚕️","Krankenhaus":"🏥","Schmerz":"🤕","Fieber":"🌡️","Medikament":"💊","Gesund":"💪","Krank":"🤒","Kopfschmerzen":"🤯","Erkältung":"🤧","Allergie":"🌿",
  "Beruf":"💼","Büro":"🏢","Kollege":"🤝","Chef":"👔","Gehalt":"💵","Bewerbung":"📝","Kündigung":"📤","Beförderung":"📈","Besprechung":"📊","Projekt":"🗂️","Frist":"⏰","Vertrag":"📄",
  "Reise":"🧳","Flughafen":"✈️","Hotel":"🏨","Gepäck":"🧳","Pass":"🛂","Visum":"📋","Buchung":"🖥️","Abflug":"🛫","Ankunft":"🛬","Reiseführer":"📖","Sehenswürdigkeit":"🗼","Unterkunft":"🛏️",
  "Umwelt":"🌍","Klimawandel":"🌡️","Recycling":"♻️","Energie":"⚡","Nachhaltigkeit":"🌱","Verschmutzung":"🏭","Natur":"🌿","Wald":"🌲","Meer":"🌊","Schutz":"🛡️",
  "Nachrichten":"📰","Zeitung":"📄","Internet":"🌐","Social Media":"📱","Bericht":"📋","Meinung":"💬","Diskussion":"🗣️","Thema":"📌","Werbung":"📣","Podcast":"🎙️",
  "Ich meine":"💭","Meiner Meinung nach":"🗨️","Ich stimme zu":"👍","Ich stimme nicht zu":"👎","Einerseits":"⚖️","Andererseits":"🔄","Obwohl":"🤔","Deshalb":"➡️","Außerdem":"➕","Zum Beispiel":"💡",
};

const REMINDERS = [
  "🌟 Zeit zu lernen! Your daily German practice is waiting!",
  "🇩🇪 Hallo! Haven't practiced today — just 5 minutes makes a difference!",
  "🎯 Keep your streak alive! Open the app and do a quick quiz!",
  "📚 New vocabulary is waiting for you. Let's learn some German!",
  "🏆 You're doing great! Stay consistent — practice makes perfect!",
  "💡 Did you know? Learning 10 words a day = 3,650 words a year!",
  "⭐ Your German journey continues! Come back and earn more XP!",
  "🔥 Don't break your streak! A quick flashcard session takes 2 minutes!",
];

const UPSELL_MESSAGES = [
  { title:"🔒 Unlock A2 & B1!", body:"You've mastered A1 basics! Take the next step — upgrade to access 10 more topics, matching games, and advanced exercises.", cta:"Enter Voucher Code →" },
  { title:"💎 Go Premium!", body:"Premium students get 3x more vocabulary, audio for every word, A2 & B1 levels, and full exercise access.", cta:"Unlock Now →" },
  { title:"🚀 Ready for A2?", body:"Shopping, directions, emotions & past tense are waiting. Your teacher has voucher codes — ask them today!", cta:"Get Your Code →" },
];

const lessons = {
  A1:[
    {id:1,title:"Greetings",icon:"👋",color:"#e8f4fd",vocab:[{de:"Hallo",en:"Hello"},{de:"Guten Morgen",en:"Good morning"},{de:"Guten Tag",en:"Good day"},{de:"Guten Abend",en:"Good evening"},{de:"Tschüss",en:"Bye"},{de:"Auf Wiedersehen",en:"Goodbye"},{de:"Bitte",en:"Please"},{de:"Danke",en:"Thank you"},{de:"Entschuldigung",en:"Excuse me"},{de:"Ja",en:"Yes"},{de:"Nein",en:"No"}]},
    {id:2,title:"Numbers",icon:"🔢",color:"#fef9e7",vocab:[{de:"Eins",en:"One"},{de:"Zwei",en:"Two"},{de:"Drei",en:"Three"},{de:"Vier",en:"Four"},{de:"Fünf",en:"Five"},{de:"Sechs",en:"Six"},{de:"Sieben",en:"Seven"},{de:"Acht",en:"Eight"},{de:"Neun",en:"Nine"},{de:"Zehn",en:"Ten"},{de:"Zwanzig",en:"Twenty"},{de:"Hundert",en:"Hundred"}]},
    {id:3,title:"Colors",icon:"🎨",color:"#fdf2f8",vocab:[{de:"Rot",en:"Red"},{de:"Blau",en:"Blue"},{de:"Grün",en:"Green"},{de:"Gelb",en:"Yellow"},{de:"Schwarz",en:"Black"},{de:"Weiß",en:"White"},{de:"Orange",en:"Orange"},{de:"Lila",en:"Purple"},{de:"Rosa",en:"Pink"},{de:"Braun",en:"Brown"}]},
    {id:4,title:"Family",icon:"👨‍👩‍👧",color:"#f0fdf4",vocab:[{de:"Mutter",en:"Mother"},{de:"Vater",en:"Father"},{de:"Bruder",en:"Brother"},{de:"Schwester",en:"Sister"},{de:"Kind",en:"Child"},{de:"Großmutter",en:"Grandmother"},{de:"Großvater",en:"Grandfather"},{de:"Tante",en:"Aunt"},{de:"Onkel",en:"Uncle"},{de:"Familie",en:"Family"}]},
    {id:5,title:"Food & Drink",icon:"🍎",color:"#fff7ed",vocab:[{de:"Brot",en:"Bread"},{de:"Wasser",en:"Water"},{de:"Milch",en:"Milk"},{de:"Kaffee",en:"Coffee"},{de:"Apfel",en:"Apple"},{de:"Fleisch",en:"Meat"},{de:"Käse",en:"Cheese"},{de:"Ei",en:"Egg"},{de:"Suppe",en:"Soup"},{de:"Kuchen",en:"Cake"},{de:"Tee",en:"Tea"},{de:"Saft",en:"Juice"}]},
  ],
  A2:[
    {id:6,title:"Shopping",icon:"🛍️",color:"#fef3c7",vocab:[{de:"Kaufen",en:"To buy"},{de:"Verkaufen",en:"To sell"},{de:"Preis",en:"Price"},{de:"Billig",en:"Cheap"},{de:"Teuer",en:"Expensive"},{de:"Geschäft",en:"Shop"},{de:"Markt",en:"Market"},{de:"Kasse",en:"Checkout"},{de:"Rabatt",en:"Discount"},{de:"Quittung",en:"Receipt"},{de:"Größe",en:"Size"},{de:"Farbe",en:"Color"}]},
    {id:7,title:"Directions",icon:"🗺️",color:"#ecfdf5",vocab:[{de:"Links",en:"Left"},{de:"Rechts",en:"Right"},{de:"Geradeaus",en:"Straight ahead"},{de:"Straße",en:"Street"},{de:"Kreuzung",en:"Intersection"},{de:"Brücke",en:"Bridge"},{de:"Nah",en:"Near"},{de:"Weit",en:"Far"},{de:"Norden",en:"North"},{de:"Süden",en:"South"},{de:"Osten",en:"East"},{de:"Westen",en:"West"}]},
    {id:8,title:"Emotions",icon:"😊",color:"#fff1f2",vocab:[{de:"Glücklich",en:"Happy"},{de:"Traurig",en:"Sad"},{de:"Wütend",en:"Angry"},{de:"Müde",en:"Tired"},{de:"Aufgeregt",en:"Excited"},{de:"Ängstlich",en:"Anxious"},{de:"Überrascht",en:"Surprised"},{de:"Stolz",en:"Proud"},{de:"Eifersüchtig",en:"Jealous"},{de:"Verliebt",en:"In love"}]},
    {id:9,title:"Past Tense",icon:"⏰",color:"#f5f3ff",vocab:[{de:"Ich war",en:"I was"},{de:"Er hatte",en:"He had"},{de:"Wir gingen",en:"We went"},{de:"Sie kam",en:"She came"},{de:"Gestern",en:"Yesterday"},{de:"Letzte Woche",en:"Last week"},{de:"Früher",en:"Earlier"},{de:"Damals",en:"Back then"},{de:"Ich habe gegessen",en:"I ate"},{de:"Er hat geschlafen",en:"He slept"}]},
    {id:10,title:"Health",icon:"🏥",color:"#fef2f2",vocab:[{de:"Arzt",en:"Doctor"},{de:"Krankenhaus",en:"Hospital"},{de:"Schmerz",en:"Pain"},{de:"Fieber",en:"Fever"},{de:"Medikament",en:"Medicine"},{de:"Gesund",en:"Healthy"},{de:"Krank",en:"Sick"},{de:"Kopfschmerzen",en:"Headache"},{de:"Erkältung",en:"Cold"},{de:"Allergie",en:"Allergy"}]},
  ],
  B1:[
    {id:11,title:"Work & Career",icon:"💼",color:"#eff6ff",vocab:[{de:"Beruf",en:"Profession"},{de:"Büro",en:"Office"},{de:"Kollege",en:"Colleague"},{de:"Chef",en:"Boss"},{de:"Gehalt",en:"Salary"},{de:"Bewerbung",en:"Application"},{de:"Kündigung",en:"Resignation"},{de:"Beförderung",en:"Promotion"},{de:"Besprechung",en:"Meeting"},{de:"Projekt",en:"Project"},{de:"Frist",en:"Deadline"},{de:"Vertrag",en:"Contract"}]},
    {id:12,title:"Travel",icon:"✈️",color:"#f0fdf4",vocab:[{de:"Reise",en:"Journey"},{de:"Flughafen",en:"Airport"},{de:"Hotel",en:"Hotel"},{de:"Gepäck",en:"Luggage"},{de:"Pass",en:"Passport"},{de:"Visum",en:"Visa"},{de:"Buchung",en:"Booking"},{de:"Abflug",en:"Departure"},{de:"Ankunft",en:"Arrival"},{de:"Reiseführer",en:"Guide book"},{de:"Sehenswürdigkeit",en:"Attraction"},{de:"Unterkunft",en:"Accommodation"}]},
    {id:13,title:"Environment",icon:"🌍",color:"#f0fdf4",vocab:[{de:"Umwelt",en:"Environment"},{de:"Klimawandel",en:"Climate change"},{de:"Recycling",en:"Recycling"},{de:"Energie",en:"Energy"},{de:"Nachhaltigkeit",en:"Sustainability"},{de:"Verschmutzung",en:"Pollution"},{de:"Natur",en:"Nature"},{de:"Wald",en:"Forest"},{de:"Meer",en:"Sea"},{de:"Schutz",en:"Protection"}]},
    {id:14,title:"Media & News",icon:"📰",color:"#fafafa",vocab:[{de:"Nachrichten",en:"News"},{de:"Zeitung",en:"Newspaper"},{de:"Internet",en:"Internet"},{de:"Social Media",en:"Social media"},{de:"Bericht",en:"Report"},{de:"Meinung",en:"Opinion"},{de:"Diskussion",en:"Discussion"},{de:"Thema",en:"Topic"},{de:"Werbung",en:"Advertisement"},{de:"Podcast",en:"Podcast"}]},
    {id:15,title:"Opinions",icon:"🗣️",color:"#fff7ed",vocab:[{de:"Ich meine",en:"I think"},{de:"Meiner Meinung nach",en:"In my opinion"},{de:"Ich stimme zu",en:"I agree"},{de:"Ich stimme nicht zu",en:"I disagree"},{de:"Einerseits",en:"On one hand"},{de:"Andererseits",en:"On the other hand"},{de:"Obwohl",en:"Although"},{de:"Deshalb",en:"Therefore"},{de:"Außerdem",en:"Furthermore"},{de:"Zum Beispiel",en:"For example"}]},
  ],
};

const exercises = {
  A1:[{sentence:"Ich ___ Student.",answer:"bin",hint:"(I am a student)"},{sentence:"Er ___ aus Deutschland.",answer:"kommt",hint:"(He comes from Germany)"},{sentence:"Wir ___ Deutsch.",answer:"lernen",hint:"(We learn German)"},{sentence:"Das Buch ___ interessant.",answer:"ist",hint:"(The book is interesting)"}],
  A2:[{sentence:"Ich ___ gestern ins Kino gegangen.",answer:"bin",hint:"(I went to the cinema yesterday)"},{sentence:"Er ___ ein neues Auto gekauft.",answer:"hat",hint:"(He bought a new car)"},{sentence:"Wir ___ letzte Woche in Berlin.",answer:"waren",hint:"(We were in Berlin last week)"},{sentence:"Sie ___ sehr müde nach der Arbeit.",answer:"war",hint:"(She was very tired after work)"}],
  B1:[{sentence:"___ meiner Meinung nach ist das falsch.",answer:"Meiner",hint:"(In my opinion that is wrong)"},{sentence:"Ich stimme dir ___ zu.",answer:"nicht",hint:"(I do not agree with you)"},{sentence:"Er bewirbt sich ___ eine neue Stelle.",answer:"um",hint:"(He is applying for a new position)"},{sentence:"___ dem Klimawandel müssen wir handeln.",answer:"Wegen",hint:"(Because of climate change we must act)"}],
};

const matching = {
  A1:[{de:"Hallo",en:"Hello"},{de:"Danke",en:"Thank you"},{de:"Bitte",en:"Please"},{de:"Ja",en:"Yes"},{de:"Nein",en:"No"},{de:"Tschüss",en:"Bye"}],
  A2:[{de:"Glücklich",en:"Happy"},{de:"Traurig",en:"Sad"},{de:"Wütend",en:"Angry"},{de:"Müde",en:"Tired"},{de:"Links",en:"Left"},{de:"Rechts",en:"Right"}],
  B1:[{de:"Ich meine",en:"I think"},{de:"Obwohl",en:"Although"},{de:"Deshalb",en:"Therefore"},{de:"Außerdem",en:"Furthermore"},{de:"Reise",en:"Journey"},{de:"Gehalt",en:"Salary"}],
};

function useStorage(key,def){const[val,setVal]=useState(()=>{try{const v=localStorage.getItem(key);return v?JSON.parse(v):def;}catch{return def;}});const save=v=>{setVal(v);try{localStorage.setItem(key,JSON.stringify(v));}catch{}};return[val,save];}
function speak(text){if(!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="de-DE";u.rate=0.85;window.speechSynthesis.speak(u);}
function shuffle(arr){return[...arr].sort(()=>Math.random()-0.5);}
function getOpts(correct,pool){const opts=[correct];const others=shuffle(pool.filter(e=>e!==correct));for(const o of others){if(opts.length<4)opts.push(o);}return shuffle(opts);}
const allVocab=Object.entries(lessons).flatMap(([lvl,ls])=>ls.flatMap(l=>l.vocab.map(v=>({...v,lesson:l.title,level:lvl}))));

// Animated emoji card component
function WordCard({de, en, showEn=false, onFlip, onSpeak, big=false}){
  const emoji = WORD_EMOJI[de] || "📝";
  const [bounce,setBounce]=useState(false);
  useEffect(()=>{setBounce(true);const t=setTimeout(()=>setBounce(false),500);return()=>clearTimeout(t);},[de]);
  return(
    <div onClick={onFlip} style={{background:showEn?"#fff8e1":"#e8f4fd",borderRadius:16,border:`2px solid ${showEn?"#FFCE00":"#90caf9"}`,padding:24,textAlign:"center",cursor:"pointer",transition:"all 0.3s",minHeight:180,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
      <div style={{fontSize:big?72:56,lineHeight:1,transition:"transform 0.3s",transform:bounce?"scale(1.2)":"scale(1)"}}>{emoji}</div>
      <div style={{fontSize:big?28:22,fontWeight:800,color:FLAG.black}}>{showEn?en:de}</div>
      <div style={{fontSize:13,color:"#888"}}>{showEn?"English":"Deutsch"}</div>
      {!showEn&&<div style={{fontSize:11,color:"#bbb",marginTop:4}}>👆 Tap to flip</div>}
      <button onClick={e=>{e.stopPropagation();onSpeak&&onSpeak();}} style={{background:"rgba(0,0,0,0.06)",border:"none",borderRadius:20,padding:"5px 14px",cursor:"pointer",fontSize:13,marginTop:4}}>🔊 Listen</button>
    </div>
  );
}

// Notification banner
function NotificationBanner({msg, onClose}){
  return(
    <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:680,background:FLAG.black,color:"#fff",padding:"12px 16px",zIndex:999,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
      <div style={{fontSize:13,flex:1}}>{msg}</div>
      <button onClick={onClose} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:18,padding:0}}>✕</button>
    </div>
  );
}

// Upsell banner
function UpsellBanner({onDismiss, onGoHome}){
  const msg=UPSELL_MESSAGES[Math.floor(Math.random()*UPSELL_MESSAGES.length)];
  return(
    <div style={{background:"linear-gradient(135deg,#1a1a1a,#3a0000)",color:"#fff",borderRadius:14,padding:18,marginBottom:14,border:"2px solid "+FLAG.gold}}>
      <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>{msg.title}</div>
      <div style={{fontSize:13,opacity:.85,marginBottom:12}}>{msg.body}</div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={onGoHome} style={{background:FLAG.gold,color:FLAG.black,border:"none",borderRadius:8,padding:"8px 14px",fontWeight:700,cursor:"pointer",fontSize:13,flex:1}}>{msg.cta}</button>
        <button onClick={onDismiss} style={{background:"rgba(255,255,255,0.1)",color:"#fff",border:"none",borderRadius:8,padding:"8px 12px",cursor:"pointer",fontSize:13}}>Later</button>
      </div>
    </div>
  );
}

export default function App(){
  const[users,setUsers]=useStorage("pem_users_v3",{});
  const[usedVouchers,setUsedVouchers]=useStorage("pem_vouchers",[]);
  const[currentUser,setCurrentUser]=useStorage("pem_current_v3",null);
  const[authScreen,setAuthScreen]=useState("login");
  const[loginForm,setLoginForm]=useState({name:"",phone:"",pin:""});
  const[authError,setAuthError]=useState("");
  const[voucherInput,setVoucherInput]=useState("");
  const[voucherMsg,setVoucherMsg]=useState("");
  const[screen,setScreen]=useState("home");
  const[activeLesson,setActiveLesson]=useState(null);
  const[cardIdx,setCardIdx]=useState(0);
  const[flipped,setFlipped]=useState(false);
  const[selectedLevel,setSelectedLevel]=useState("A1");
  const[quizWords,setQuizWords]=useState([]);
  const[quizState,setQuizState]=useState({idx:0,score:0,answered:null,done:false});
  const[fillState,setFillState]=useState({idx:0,input:"",result:null,done:false,score:0});
  const[matchData,setMatchData]=useState(null);
  const[adminPass,setAdminPass]=useState("");
  const[adminOpen,setAdminOpen]=useState(false);
  const[adminError,setAdminError]=useState("");
  const[generatedCode,setGeneratedCode]=useState("");
  const[notification,setNotification]=useState(null);
  const[showUpsell,setShowUpsell]=useState(false);
  const[lastVisit,setLastVisit]=useStorage("pem_lastvisit",null);

  const user=currentUser?users[currentUser]:null;
  const isPaid=user?.paid||false;

  // Notification & reminder system
  useEffect(()=>{
    if(!currentUser||!users[currentUser])return;
    const now=Date.now();
    const last=lastVisit||0;
    const hoursSince=(now-last)/(1000*60*60);
    if(hoursSince>8){
      const idx=Math.floor(Math.random()*REMINDERS.length);
      setNotification(REMINDERS[idx]);
    }
    setLastVisit(now);
  },[currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    if(!currentUser||!users[currentUser]||users[currentUser].paid)return;
    const t=setTimeout(()=>setShowUpsell(true),30000);
    return()=>clearTimeout(t);
  },[currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    const pool=allVocab.filter(v=>v.level===selectedLevel);
    const words=shuffle(pool).slice(0,10).map(w=>({question:w.de,correct:w.en,options:getOpts(w.en,pool.map(v=>v.en))}));
    setQuizWords(words);
    setQuizState({idx:0,score:0,answered:null,done:false});
  },[selectedLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  function resetQuiz(){
    const pool=allVocab.filter(v=>v.level===selectedLevel);
    const words=shuffle(pool).slice(0,10).map(w=>({question:w.de,correct:w.en,options:getOpts(w.en,pool.map(v=>v.en))}));
    setQuizWords(words);
    setQuizState({idx:0,score:0,answered:null,done:false});
  }

  function initMatch(){
    const pairs=shuffle(matching[selectedLevel]).slice(0,6);
    return{pairs,deItems:shuffle(pairs.map(p=>p.de)),enItems:shuffle(pairs.map(p=>p.en)),selected:null,matched:[],wrong:null,done:false,score:0};
  }

  function updateScore(key,score,total){
    if(!currentUser)return;
    const updated={...users};
    if(!updated[currentUser].scores)updated[currentUser].scores={};
    const prev=updated[currentUser].scores[key]||0;
    updated[currentUser].scores[key]=Math.max(prev,Math.round((score/total)*100));
    if(!updated[currentUser].xp)updated[currentUser].xp=0;
    updated[currentUser].xp+=score*10;
    setUsers(updated);
  }

  function register(){
    const name=loginForm.name.trim(),phone=loginForm.phone.trim(),pin=loginForm.pin.trim();
    if(!name||!phone||pin.length<4){setAuthError("All fields required & PIN must be 4+ digits");return;}
    if(!/^\d{7,15}$/.test(phone.replace(/[\s+\-()]/g,""))){setAuthError("Please enter a valid phone number");return;}
    if(users[name]){setAuthError("Name already taken. Try logging in.");return;}
    const newUsers={...users,[name]:{name,phone,pin,xp:0,scores:{},joined:new Date().toLocaleDateString(),paid:false}};
    setUsers(newUsers);setCurrentUser(name);setAuthError("");
  }

  function login(){
    const name=loginForm.name.trim();
    if(!users[name]){setAuthError("Student not found. Please register.");return;}
    if(users[name].pin!==loginForm.pin.trim()){setAuthError("Wrong PIN. Try again.");return;}
    setCurrentUser(name);setAuthError("");
  }

  function redeemVoucher(){
    const code=voucherInput.trim().toUpperCase();
    if(!VOUCHER_CODES.includes(code)){setVoucherMsg("❌ Invalid code. Ask your teacher for a valid voucher.");return;}
    if(usedVouchers.includes(code)){setVoucherMsg("❌ This code has already been used.");return;}
    const updated={...users};updated[currentUser].paid=true;
    setUsers(updated);setUsedVouchers([...usedVouchers,code]);
    setVoucherMsg("✅ Full access unlocked! Herzlichen Glückwunsch! 🎉");
    setShowUpsell(false);
  }

  function logout(){setCurrentUser(null);setScreen("home");setAdminOpen(false);}

  function handleMatch(word,side){
    if(!matchData||matchData.matched.includes(word))return;
    if(!matchData.selected){setMatchData(m=>({...m,selected:{word,side}}));return;}
    if(matchData.selected.side===side){setMatchData(m=>({...m,selected:{word,side}}));return;}
    const sel=matchData.selected;
    const deWord=side==="de"?word:sel.word;
    const enWord=side==="en"?word:sel.word;
    const pair=matchData.pairs.find(p=>p.de===deWord&&p.en===enWord);
    if(pair){
      const newMatched=[...matchData.matched,deWord,enWord];
      const done=newMatched.length===matchData.pairs.length*2;
      setMatchData(m=>({...m,matched:newMatched,selected:null,score:m.score+1,done}));
    }else{
      setMatchData(m=>({...m,wrong:[deWord,enWord],selected:null}));
      setTimeout(()=>setMatchData(m=>({...m,wrong:null})),700);
    }
  }

  function generateVoucherCode(){
    const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const code="PEM-"+Array.from({length:8},()=>chars[Math.floor(Math.random()*chars.length)]).join("");
    setGeneratedCode(code);
  }

  function getLevel(xp){
    if(xp>=2000)return{label:"Advanced B1",color:"#7c3aed"};
    if(xp>=1000)return{label:"Intermediate A2",color:"#059669"};
    if(xp>=400)return{label:"Elementary A1+",color:"#d97706"};
    return{label:"Beginner A1",color:FLAG.red};
  }

  const levelLock=(lvl)=>!isPaid&&lvl!=="A1";

  const s={
    wrap:{fontFamily:"system-ui,sans-serif",maxWidth:680,margin:"0 auto",paddingBottom:90},
    flagBar:{height:6,background:`linear-gradient(to right,${FLAG.black} 33%,${FLAG.red} 33% 66%,${FLAG.gold} 66%)`},
    header:{background:FLAG.black,color:"#fff",padding:"12px 16px",display:"flex",alignItems:"center",gap:10},
    card:{background:"#fff",borderRadius:12,border:"1px solid #eee",padding:"16px",marginBottom:12},
    btn:(c=FLAG.red)=>({background:c,color:c==="#fff"?FLAG.black:"#fff",border:"none",borderRadius:8,padding:"10px 20px",cursor:"pointer",fontWeight:600,fontSize:14}),
    input:{width:"100%",padding:"11px 14px",fontSize:15,borderRadius:8,border:"1.5px solid #ddd",outline:"none",boxSizing:"border-box",marginBottom:10},
    nav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:680,background:"#fff",borderTop:"1px solid #eee",display:"flex",zIndex:100},
    navBtn:(a)=>({flex:1,padding:"6px 2px",border:"none",background:a?"#fff8e1":"transparent",cursor:"pointer",fontSize:9,color:a?FLAG.red:"#888",display:"flex",flexDirection:"column",alignItems:"center",gap:1}),
    levelTab:(a)=>({flex:1,padding:"8px",border:"none",borderRadius:8,background:a?FLAG.red:"#f3f3f3",color:a?"#fff":"#555",fontWeight:600,cursor:"pointer",fontSize:13}),
    lock:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"},
  };

  const navItems=[
    {id:"home",emoji:"🏠",label:"Home"},{id:"lessons",emoji:"📚",label:"Lessons"},
    {id:"flashcards",emoji:"🃏",label:"Cards"},{id:"quiz",emoji:"🧠",label:"Quiz"},
    {id:"exercises",emoji:"✏️",label:"Exercises"},{id:"match",emoji:"🔗",label:"Match"},
    {id:"progress",emoji:"📊",label:"Progress"},
  ];

  // AUTH
  if(!currentUser) return(
    <div style={s.wrap}>
      <div style={s.flagBar}/>
      <div style={s.header}>
        <span style={{fontSize:24}}>🇩🇪</span>
        <div><div style={{fontWeight:700,fontSize:17}}>Pioneer Education Morinda</div><div style={{fontSize:11,opacity:.7}}>Deutsch A1–B1 · German Learning</div></div>
      </div>
      {adminOpen?(
        <div style={{padding:"20px 16px"}}>
          <button onClick={()=>setAdminOpen(false)} style={{background:"none",border:"none",color:FLAG.red,cursor:"pointer",fontWeight:600,marginBottom:14,padding:0}}>← Back</button>
          {adminPass!==ADMIN_PASSWORD?(
            <div>
              <div style={{fontWeight:700,fontSize:18,marginBottom:14}}>🔐 Admin Login</div>
              <input style={s.input} type="password" placeholder="Admin password" value={adminPass} onChange={e=>setAdminPass(e.target.value)}/>
              {adminError&&<div style={{color:FLAG.red,fontSize:13,marginBottom:8}}>{adminError}</div>}
              <button style={{...s.btn(),width:"100%"}} onClick={()=>{if(adminPass!==ADMIN_PASSWORD)setAdminError("Wrong password");}}>Login</button>
            </div>
          ):(
            <div>
              <div style={{fontWeight:700,fontSize:18,marginBottom:12}}>👨‍💼 Admin Panel</div>
              <div style={{...s.card,background:"#f0fdf4",display:"flex",gap:16}}>
                <div style={{textAlign:"center"}}><div style={{fontWeight:700,fontSize:22}}>{Object.keys(users).length}</div><div style={{fontSize:12,color:"#888"}}>Students</div></div>
                <div style={{textAlign:"center"}}><div style={{fontWeight:700,fontSize:22}}>{Object.values(users).filter(u=>u.paid).length}</div><div style={{fontSize:12,color:"#888"}}>Premium</div></div>
                <div style={{textAlign:"center"}}><div style={{fontWeight:700,fontSize:22}}>{Object.values(users).reduce((a,u)=>a+(u.xp||0),0)}</div><div style={{fontSize:12,color:"#888"}}>Total XP</div></div>
              </div>
              {Object.values(users).map(u=>(
                <div key={u.name} style={{...s.card,padding:"10px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontWeight:600}}>{u.name} {u.paid?"💎":""}</div>
                      <div style={{fontSize:12,color:"#888"}}>📱 {u.phone} · {u.joined}</div>
                      <div style={{fontSize:12,color:"#888"}}>⭐ {u.xp||0} XP · {Object.keys(u.scores||{}).length} activities</div>
                    </div>
                    <button onClick={()=>{const up={...users};up[u.name].paid=!up[u.name].paid;setUsers(up);}} style={{...s.btn(u.paid?"#ef4444":"#22c55e"),padding:"6px 12px",fontSize:12}}>
                      {u.paid?"Revoke":"Grant"}
                    </button>
                  </div>
                </div>
              ))}
              <div style={{...s.card,background:"#fffbea"}}>
                <div style={{fontWeight:600,marginBottom:8}}>🎟️ Generate Voucher</div>
                <button style={{...s.btn(),marginBottom:8}} onClick={generateVoucherCode}>Generate Code</button>
                {generatedCode&&<div style={{fontWeight:700,fontSize:20,color:FLAG.red,letterSpacing:2,textAlign:"center",padding:10,background:"#fff",borderRadius:8,border:"2px dashed #DD0000"}}>{generatedCode}</div>}
                <div style={{fontSize:12,color:"#888",marginTop:6}}>Share this code with paying students.</div>
              </div>
            </div>
          )}
        </div>
      ):(
        <div style={{padding:"24px 16px"}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:56}}>🎓</div>
            <div style={{fontWeight:700,fontSize:22,marginTop:8}}>Welcome!</div>
            <div style={{color:"#666",fontSize:14,marginTop:4}}>Create your student account to start learning</div>
          </div>
          <div style={{display:"flex",marginBottom:14,borderRadius:10,overflow:"hidden",border:"1.5px solid #ddd"}}>
            {["login","register"].map(t=>(
              <button key={t} onClick={()=>{setAuthScreen(t);setAuthError("");}} style={{flex:1,padding:"10px",border:"none",background:authScreen===t?FLAG.red:"#fff",color:authScreen===t?"#fff":"#333",fontWeight:600,cursor:"pointer",fontSize:14}}>
                {t==="login"?"Login":"Register"}
              </button>
            ))}
          </div>
          <input style={s.input} placeholder="Your full name" value={loginForm.name} onChange={e=>setLoginForm(f=>({...f,name:e.target.value}))}/>
          {authScreen==="register"&&<input style={s.input} placeholder="Phone number e.g. +92 300 1234567" value={loginForm.phone} onChange={e=>setLoginForm(f=>({...f,phone:e.target.value}))}/>}
          <input style={s.input} placeholder="4-digit PIN" type="password" maxLength={6} value={loginForm.pin} onChange={e=>setLoginForm(f=>({...f,pin:e.target.value}))}/>
          {authError&&<div style={{color:FLAG.red,fontSize:13,marginBottom:10}}>{authError}</div>}
          <button style={{...s.btn(),width:"100%",padding:"13px"}} onClick={authScreen==="login"?login:register}>
            {authScreen==="login"?"Login →":"Create Account →"}
          </button>
          <div style={{...s.card,background:"#f0fdf4",marginTop:14,textAlign:"center"}}>
            <div style={{fontSize:13,color:"#555"}}>🆓 <strong>Free:</strong> A1 lessons · 📱 Ask teacher for voucher code to unlock <strong>A2 + B1</strong></div>
          </div>
          <button onClick={()=>setAdminOpen(true)} style={{background:"none",border:"none",color:"#ddd",fontSize:10,cursor:"pointer",marginTop:16,display:"block",marginLeft:"auto"}}>Admin</button>
        </div>
      )}
    </div>
  );

  const level=getLevel(user.xp||0);
  const levelPool=allVocab.filter(v=>v.level===selectedLevel);

  return(
    <div style={s.wrap}>
      {notification&&<NotificationBanner msg={notification} onClose={()=>setNotification(null)}/>}
      <div style={{height:notification?48:0,transition:"height 0.3s"}}/>
      <div style={s.flagBar}/>
      <div style={s.header}>
        <span style={{fontSize:20}}>🇩🇪</span>
        <div><div style={{fontWeight:700,fontSize:15}}>Pioneer Education Morinda</div><div style={{fontSize:10,opacity:.7}}>Deutsch A1–B1</div></div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
          {isPaid&&<div style={{background:FLAG.gold,color:FLAG.black,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>💎 Premium</div>}
          <div style={{background:"#333",color:"#fff",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:600}}>⭐{user.xp||0}</div>
          <button onClick={logout} style={{background:"transparent",border:"none",color:"#aaa",cursor:"pointer",fontSize:11}}>Out</button>
        </div>
      </div>

      <div style={{padding:"12px 14px 0"}}>

        {/* HOME */}
        {screen==="home"&&(
          <div>
            <div style={{...s.card,background:"linear-gradient(135deg,#1a1a1a,#333)",color:"#fff",border:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:46,height:46,borderRadius:"50%",background:FLAG.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:20,color:FLAG.black}}>{user.name[0].toUpperCase()}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:16}}>Hallo, {user.name}! 👋</div>
                  <div style={{fontSize:11,opacity:.7}}>📱 {user.phone} · {user.joined}</div>
                </div>
                <div style={{marginLeft:"auto"}}><div style={{background:level.color,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:"#fff"}}>{level.label}</div></div>
              </div>
              <div style={{marginTop:12,background:"rgba(255,255,255,0.1)",borderRadius:8,height:7,overflow:"hidden"}}>
                <div style={{width:`${Math.min(100,(user.xp||0)/20)}%`,height:"100%",background:FLAG.gold,borderRadius:8,transition:"width 0.5s"}}/>
              </div>
            </div>

            {!isPaid&&(
              <div style={{...s.card,background:"linear-gradient(135deg,#fef9e7,#fffbea)",border:"2px solid "+FLAG.gold}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>🎟️ Unlock Full Premium Access</div>
                <div style={{fontSize:13,color:"#555",marginBottom:10}}>Get your voucher code from your teacher to unlock <strong>A2 + B1</strong>, all exercises, and more!</div>
                <div style={{display:"flex",gap:8}}>
                  <input value={voucherInput} onChange={e=>setVoucherInput(e.target.value)} placeholder="Enter voucher code" style={{...s.input,marginBottom:0,flex:1}}/>
                  <button style={s.btn(FLAG.black)} onClick={redeemVoucher}>Apply</button>
                </div>
                {voucherMsg&&<div style={{fontSize:13,marginTop:8,fontWeight:600,color:voucherMsg.startsWith("✅")?"#16a34a":FLAG.red}}>{voucherMsg}</div>}
              </div>
            )}

            {showUpsell&&!isPaid&&<UpsellBanner onDismiss={()=>setShowUpsell(false)} onGoHome={()=>{setShowUpsell(false);}}/>}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
              {[
                {label:"Levels",val:isPaid?"A1+A2+B1":"A1 Free",emoji:"📚"},
                {label:"Words",val:isPaid?allVocab.length:lessons.A1.flatMap(l=>l.vocab).length,emoji:"📖"},
                {label:"Best",val:`${Math.max(0,...Object.values(user.scores||{}))}%`,emoji:"🏆"},
              ].map(m=>(
                <div key={m.label} style={{background:"#f9f9f9",borderRadius:10,padding:"10px 6px",textAlign:"center",border:"1px solid #eee"}}>
                  <div style={{fontSize:20}}>{m.emoji}</div>
                  <div style={{fontWeight:700,fontSize:14,marginTop:2}}>{m.val}</div>
                  <div style={{fontSize:10,color:"#888"}}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{...s.card,background:"#e8f4fd",border:"1px solid #90caf9",textAlign:"center"}}>
              <div style={{fontSize:11,color:"#888",marginBottom:6}}>🌟 Word of the day</div>
              <div style={{fontSize:52}}>{WORD_EMOJI["Danke"]||"📝"}</div>
              <div style={{fontSize:20,fontWeight:800,marginTop:4}}>Danke</div>
              <div style={{color:"#555",fontSize:14}}>Thank you</div>
              <button onClick={()=>speak("Danke")} style={{...s.btn("#e8f4fd"),color:"#1a6ca8",marginTop:8,padding:"6px 16px",fontSize:13,border:"1px solid #90caf9"}}>🔊 Listen</button>
            </div>

            <div style={{fontWeight:600,fontSize:14,marginBottom:8}}>Quick Start</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {navItems.filter(n=>n.id!=="home"&&n.id!=="progress").map(item=>(
                <div key={item.id} style={{...s.card,cursor:"pointer",textAlign:"center",padding:"14px 8px"}} onClick={()=>setScreen(item.id)}>
                  <div style={{fontSize:26}}>{item.emoji}</div>
                  <div style={{fontWeight:600,fontSize:13,marginTop:4}}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LESSONS */}
        {screen==="lessons"&&!activeLesson&&(
          <div>
            <div style={{fontWeight:700,fontSize:18,marginBottom:10}}>📚 Lessons</div>
            <div style={{display:"flex",gap:6,marginBottom:14}}>
              {["A1","A2","B1"].map(l=><button key={l} style={s.levelTab(selectedLevel===l)} onClick={()=>setSelectedLevel(l)}>{l}{levelLock(l)?"🔒":""}</button>)}
            </div>
            {levelLock(selectedLevel)?(
              <div>
                <UpsellBanner onDismiss={()=>setSelectedLevel("A1")} onGoHome={()=>setScreen("home")}/>
                <div style={s.lock}><div style={{fontSize:48}}>🔒</div><div style={{fontWeight:700,fontSize:17,marginTop:8}}>{selectedLevel} is Premium</div><div style={{color:"#888",fontSize:13,marginTop:6}}>Enter your voucher code on the Home screen to unlock.</div></div>
              </div>
            ):lessons[selectedLevel].map(l=>(
              <div key={l.id} style={{...s.card,background:l.color,cursor:"pointer"}} onClick={()=>setActiveLesson(l)}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:26}}>{l.icon}</span>
                  <div><div style={{fontWeight:600,fontSize:15}}>{l.title}</div><div style={{fontSize:12,color:"#666"}}>{l.vocab.length} words</div></div>
                  <div style={{marginLeft:"auto",fontSize:18,color:"#aaa"}}>→</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {screen==="lessons"&&activeLesson&&(
          <div>
            <button onClick={()=>setActiveLesson(null)} style={{background:"none",border:"none",color:FLAG.red,cursor:"pointer",fontWeight:600,marginBottom:10,padding:0}}>← Back</button>
            <div style={{fontWeight:700,fontSize:18,marginBottom:12}}>{activeLesson.icon} {activeLesson.title}</div>
            {activeLesson.vocab.map((v,i)=>(
              <div key={i} style={{...s.card,display:"flex",alignItems:"center",gap:12,padding:"12px 16px"}}>
                <div style={{fontSize:36}}>{WORD_EMOJI[v.de]||"📝"}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:16}}>{v.de}</div>
                  <div style={{fontSize:13,color:"#888"}}>{v.en}</div>
                </div>
                <button onClick={()=>speak(v.de)} style={{background:"#e8f4fd",border:"none",borderRadius:8,padding:"8px 12px",cursor:"pointer",fontSize:16}}>🔊</button>
              </div>
            ))}
          </div>
        )}

        {/* FLASHCARDS */}
        {screen==="flashcards"&&(
          <div>
            <div style={{fontWeight:700,fontSize:18,marginBottom:8}}>🃏 Flashcards</div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {["A1","A2","B1"].map(l=><button key={l} style={s.levelTab(selectedLevel===l)} onClick={()=>{if(!levelLock(l)){setSelectedLevel(l);setCardIdx(0);setFlipped(false);}else setScreen("home");}}>
                {l}{levelLock(l)?"🔒":""}
              </button>)}
            </div>
            {levelLock(selectedLevel)?(
              <div><UpsellBanner onDismiss={()=>setSelectedLevel("A1")} onGoHome={()=>setScreen("home")}/></div>
            ):levelPool.length>0&&(
              <div>
                <div style={{fontSize:12,color:"#888",marginBottom:10}}>Card {(cardIdx%levelPool.length)+1} of {levelPool.length} · {selectedLevel}</div>
                <WordCard
                  de={levelPool[cardIdx%levelPool.length].de}
                  en={levelPool[cardIdx%levelPool.length].en}
                  showEn={flipped}
                  onFlip={()=>setFlipped(f=>!f)}
                  onSpeak={()=>speak(levelPool[cardIdx%levelPool.length].de)}
                  big={true}
                />
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  <button style={s.btn("#999")} onClick={()=>{setCardIdx(i=>Math.max(0,i-1));setFlipped(false);}}>←</button>
                  <button style={{...s.btn("#22c55e"),flex:1}} onClick={()=>{setCardIdx(i=>i+1);setFlipped(false);}}>Know it ✓</button>
                  <button style={{...s.btn(FLAG.red),flex:1}} onClick={()=>{setCardIdx(i=>i+1);setFlipped(false);}}>Again</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUIZ */}
        {screen==="quiz"&&(
          <div>
            <div style={{fontWeight:700,fontSize:18,marginBottom:8}}>🧠 Vocabulary Quiz</div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {["A1","A2","B1"].map(l=><button key={l} style={s.levelTab(selectedLevel===l)} onClick={()=>{if(!levelLock(l))setSelectedLevel(l);else setScreen("home");}}>
                {l}{levelLock(l)?"🔒":""}
              </button>)}
            </div>
            {levelLock(selectedLevel)?(
              <div><UpsellBanner onDismiss={()=>setSelectedLevel("A1")} onGoHome={()=>setScreen("home")}/></div>
            ):quizState.done?(
              <div style={{...s.card,textAlign:"center",padding:32}}>
                <div style={{fontSize:52}}>{quizState.score>=7?"🏆":quizState.score>=5?"🎉":"💪"}</div>
                <div style={{fontSize:26,fontWeight:700}}>{quizState.score}/{quizWords.length}</div>
                <div style={{color:FLAG.red,fontWeight:600,marginTop:6}}>+{quizState.score*10} XP earned!</div>
                <button style={{...s.btn(),marginTop:14}} onClick={()=>{updateScore("quiz_"+selectedLevel,quizState.score,quizWords.length);resetQuiz();}}>Try Again</button>
              </div>
            ):quizWords.length>0&&(
              <div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,color:"#888"}}>
                  <span>Q{quizState.idx+1}/{quizWords.length}</span><span>Score: {quizState.score}</span>
                </div>
                <div style={{background:"#eee",borderRadius:8,height:5,marginBottom:12}}>
                  <div style={{width:`${(quizState.idx/quizWords.length)*100}%`,height:"100%",background:FLAG.red,borderRadius:8}}/>
                </div>
                <div style={{...s.card,textAlign:"center",background:"#e8f4fd",border:"2px solid #90caf9",marginBottom:12,padding:20}}>
                  <div style={{fontSize:12,color:"#888",marginBottom:6}}>What does this mean?</div>
                  <div style={{fontSize:52,marginBottom:4}}>{WORD_EMOJI[quizWords[quizState.idx].question]||"❓"}</div>
                  <div style={{fontSize:28,fontWeight:800}}>{quizWords[quizState.idx].question}</div>
                  <button onClick={()=>speak(quizWords[quizState.idx].question)} style={{...s.btn("#e8f4fd"),color:"#1a6ca8",border:"1px solid #90caf9",marginTop:8,padding:"5px 14px",fontSize:12}}>🔊 Listen</button>
                </div>
                {quizWords[quizState.idx].options.map(opt=>{
                  const isCorrect=opt===quizWords[quizState.idx].correct,isAnswered=quizState.answered!==null,isSelected=quizState.answered===opt;
                  let bg="#fff",border="1.5px solid #ddd",color="#333";
                  if(isAnswered){if(isCorrect){bg="#dcfce7";border="1.5px solid #22c55e";color="#166534";}else if(isSelected){bg="#fee2e2";border="1.5px solid #ef4444";color="#991b1b";}}
                  return(
                    <div key={opt} onClick={()=>{
                      if(quizState.answered!==null)return;
                      const correct=opt===quizWords[quizState.idx].correct,ns=correct?quizState.score+1:quizState.score;
                      setQuizState(s=>({...s,answered:opt,score:ns}));
                      setTimeout(()=>{if(quizState.idx+1>=quizWords.length)setQuizState(s=>({...s,done:true}));else setQuizState(s=>({...s,idx:s.idx+1,answered:null}));},900);
                    }} style={{...s.card,cursor:isAnswered?"default":"pointer",background:bg,border,color,marginBottom:8,transition:"all 0.2s",fontWeight:isCorrect&&isAnswered?700:400}}>
                      {opt}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* EXERCISES */}
        {screen==="exercises"&&(
          <div>
            <div style={{fontWeight:700,fontSize:18,marginBottom:8}}>✏️ Fill in the Blank</div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {["A1","A2","B1"].map(l=><button key={l} style={s.levelTab(selectedLevel===l)} onClick={()=>{if(!levelLock(l)){setSelectedLevel(l);setFillState({idx:0,input:"",result:null,done:false,score:0});}else setScreen("home");}}>
                {l}{levelLock(l)?"🔒":""}
              </button>)}
            </div>
            {levelLock(selectedLevel)?(
              <div><UpsellBanner onDismiss={()=>setSelectedLevel("A1")} onGoHome={()=>setScreen("home")}/></div>
            ):fillState.done?(
              <div style={{...s.card,textAlign:"center",padding:32}}>
                <div style={{fontSize:48}}>🎉</div>
                <div style={{fontSize:24,fontWeight:700}}>{fillState.score}/{exercises[selectedLevel].length}</div>
                <div style={{color:FLAG.red,fontWeight:600,marginTop:6}}>+{fillState.score*10} XP!</div>
                <button style={{...s.btn(),marginTop:14}} onClick={()=>{updateScore("fill_"+selectedLevel,fillState.score,exercises[selectedLevel].length);setFillState({idx:0,input:"",result:null,done:false,score:0});}}>Try Again</button>
              </div>
            ):(
              <div>
                <div style={{fontSize:12,color:"#888",marginBottom:8}}>Exercise {fillState.idx+1} of {exercises[selectedLevel].length}</div>
                <div style={{...s.card,background:"#f5f3ff",border:"2px solid #c4b5fd",marginBottom:12}}>
                  <div style={{fontSize:20,fontWeight:700}}>{exercises[selectedLevel][fillState.idx].sentence}</div>
                  <div style={{fontSize:12,color:"#888",marginTop:4}}>{exercises[selectedLevel][fillState.idx].hint}</div>
                </div>
                <input value={fillState.input} onChange={e=>setFillState(s=>({...s,input:e.target.value}))}
                  onKeyDown={e=>{if(e.key==="Enter"&&!fillState.result&&fillState.input){
                    const correct=fillState.input.trim().toLowerCase()===exercises[selectedLevel][fillState.idx].answer.toLowerCase(),ns=correct?fillState.score+1:fillState.score;
                    setFillState(s=>({...s,result:correct?"correct":"wrong",score:ns}));
                    setTimeout(()=>{if(fillState.idx+1>=exercises[selectedLevel].length)setFillState(s=>({...s,done:true}));else setFillState(s=>({...s,idx:s.idx+1,input:"",result:null}));},1000);
                  }}}
                  placeholder="Type the missing word..." style={{...s.input,border:`2px solid ${fillState.result==="correct"?"#22c55e":fillState.result==="wrong"?"#ef4444":"#ddd"}`,background:fillState.result==="correct"?"#dcfce7":fillState.result==="wrong"?"#fee2e2":"#fff"}}/>
                {fillState.result&&<div style={{...s.card,background:fillState.result==="correct"?"#dcfce7":"#fee2e2",border:"none",marginBottom:8,fontWeight:600,color:fillState.result==="correct"?"#166534":"#991b1b",textAlign:"center"}}>
                  {fillState.result==="correct"?"✓ Richtig! Correct!":`✗ Answer: "${exercises[selectedLevel][fillState.idx].answer}"`}
                </div>}
                <button style={s.btn()} disabled={!fillState.input||!!fillState.result} onClick={()=>{
                  const correct=fillState.input.trim().toLowerCase()===exercises[selectedLevel][fillState.idx].answer.toLowerCase(),ns=correct?fillState.score+1:fillState.score;
                  setFillState(s=>({...s,result:correct?"correct":"wrong",score:ns}));
                  setTimeout(()=>{if(fillState.idx+1>=exercises[selectedLevel].length)setFillState(s=>({...s,done:true}));else setFillState(s=>({...s,idx:s.idx+1,input:"",result:null}));},1000);
                }}>Check Answer</button>
              </div>
            )}
          </div>
        )}

        {/* MATCH */}
        {screen==="match"&&(
          <div>
            <div style={{fontWeight:700,fontSize:18,marginBottom:8}}>🔗 Matching Game</div>
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {["A1","A2","B1"].map(l=><button key={l} style={s.levelTab(selectedLevel===l)} onClick={()=>{if(!levelLock(l)){setSelectedLevel(l);setMatchData(null);}else setScreen("home");}}>
                {l}{levelLock(l)?"🔒":""}
              </button>)}
            </div>
            {levelLock(selectedLevel)?(
              <div><UpsellBanner onDismiss={()=>setSelectedLevel("A1")} onGoHome={()=>setScreen("home")}/></div>
            ):!matchData?(
              <div style={{textAlign:"center",padding:32}}>
                <div style={{fontSize:52}}>🔗</div>
                <div style={{fontWeight:700,fontSize:18,marginTop:8}}>Matching Game</div>
                <div style={{color:"#888",fontSize:13,marginTop:6}}>Match German words with their English meanings!</div>
                <button style={{...s.btn(),marginTop:16,padding:"12px 32px"}} onClick={()=>setMatchData(initMatch())}>Start Game</button>
              </div>
            ):matchData.done?(
              <div style={{...s.card,textAlign:"center",padding:32}}>
                <div style={{fontSize:52}}>🏆</div>
                <div style={{fontSize:22,fontWeight:700}}>All Matched!</div>
                <div style={{color:FLAG.red,fontWeight:600,marginTop:6}}>+{matchData.score*10} XP!</div>
                <button style={{...s.btn(),marginTop:14}} onClick={()=>{updateScore("match_"+selectedLevel,matchData.score,matching[selectedLevel].length);setMatchData(initMatch());}}>Play Again</button>
              </div>
            ):(
              <div>
                <div style={{fontSize:12,color:"#888",marginBottom:10}}>Tap one from each column to match! 🇩🇪↔🇬🇧</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:600,color:"#888",marginBottom:6,textAlign:"center"}}>🇩🇪 Deutsch</div>
                    {matchData.deItems.map(w=>{
                      const isMatched=matchData.matched.includes(w),isSelected=matchData.selected?.word===w,isWrong=matchData.wrong?.includes(w);
                      return(
                        <div key={w} onClick={()=>!isMatched&&handleMatch(w,"de")} style={{...s.card,textAlign:"center",cursor:isMatched?"default":"pointer",background:isMatched?"#dcfce7":isSelected?"#dbeafe":isWrong?"#fee2e2":"#fff",border:`1.5px solid ${isMatched?"#22c55e":isSelected?"#3b82f6":isWrong?"#ef4444":"#ddd"}`,marginBottom:8,padding:"10px",opacity:isMatched?0.5:1,fontWeight:600,fontSize:13,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                          <span style={{fontSize:22}}>{WORD_EMOJI[w]||"📝"}</span>{w}
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <div style={{fontSize:11,fontWeight:600,color:"#888",marginBottom:6,textAlign:"center"}}>🇬🇧 English</div>
                    {matchData.enItems.map(w=>{
                      const isMatched=matchData.matched.includes(w),isSelected=matchData.selected?.word===w,isWrong=matchData.wrong?.includes(w);
                      return(
                        <div key={w} onClick={()=>!isMatched&&handleMatch(w,"en")} style={{...s.card,textAlign:"center",cursor:isMatched?"default":"pointer",background:isMatched?"#dcfce7":isSelected?"#dbeafe":isWrong?"#fee2e2":"#fff",border:`1.5px solid ${isMatched?"#22c55e":isSelected?"#3b82f6":isWrong?"#ef4444":"#ddd"}`,marginBottom:8,padding:"10px",opacity:isMatched?0.5:1,fontSize:13}}>
                          {w}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROGRESS */}
        {screen==="progress"&&(
          <div>
            <div style={{fontWeight:700,fontSize:18,marginBottom:12}}>📊 My Progress</div>
            <div style={{...s.card,background:"linear-gradient(135deg,#1a1a1a,#333)",color:"#fff",border:"none",textAlign:"center",padding:20}}>
              <div style={{width:54,height:54,borderRadius:"50%",background:FLAG.gold,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:22,color:FLAG.black,margin:"0 auto"}}>{user.name[0].toUpperCase()}</div>
              <div style={{fontWeight:700,fontSize:18,marginTop:8}}>{user.name}</div>
              <div style={{fontSize:12,opacity:.7}}>📱 {user.phone}</div>
              <div style={{background:level.color,borderRadius:20,padding:"3px 14px",fontSize:12,fontWeight:700,display:"inline-block",marginTop:6}}>{level.label}</div>
              <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:12}}>
                <div><div style={{fontSize:22,fontWeight:700}}>{user.xp||0}</div><div style={{fontSize:10,opacity:.7}}>Total XP</div></div>
                <div><div style={{fontSize:22,fontWeight:700}}>{Object.keys(user.scores||{}).length}</div><div style={{fontSize:10,opacity:.7}}>Activities</div></div>
                <div><div style={{fontSize:22,fontWeight:700}}>{isPaid?"💎":"🆓"}</div><div style={{fontSize:10,opacity:.7}}>{isPaid?"Premium":"Free"}</div></div>
              </div>
            </div>
            {!isPaid&&<UpsellBanner onDismiss={()=>{}} onGoHome={()=>setScreen("home")}/>}
            <div style={{fontWeight:600,fontSize:14,margin:"8px 0 8px"}}>Activity Scores</div>
            {Object.keys(user.scores||{}).length===0?(
              <div style={{...s.card,textAlign:"center",color:"#888",padding:20}}>No scores yet — complete some activities!</div>
            ):Object.entries(user.scores||{}).map(([key,val])=>(
              <div key={key} style={{...s.card,padding:"10px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontWeight:600,fontSize:13}}>{key.replace("_"," ").toUpperCase()}</span>
                  <span style={{fontWeight:700,color:val>=70?"#22c55e":val>=50?FLAG.gold:FLAG.red}}>{val}%</span>
                </div>
                <div style={{background:"#eee",borderRadius:8,height:7,overflow:"hidden"}}>
                  <div style={{width:`${val}%`,height:"100%",background:val>=70?"#22c55e":val>=50?FLAG.gold:FLAG.red,borderRadius:8,transition:"width 0.6s"}}/>
                </div>
              </div>
            ))}
            <div style={{fontWeight:600,fontSize:14,margin:"12px 0 8px"}}>Level Roadmap</div>
            {[{label:"Beginner A1",xp:0},{label:"Elementary A1+",xp:400},{label:"Intermediate A2",xp:1000},{label:"Advanced B1",xp:2000}].map((lvl,i,arr)=>{
              const done=(user.xp||0)>=lvl.xp;
              return(
                <div key={lvl.label} style={{...s.card,display:"flex",alignItems:"center",gap:10,padding:"10px 14px"}}>
                  <div style={{width:30,height:30,borderRadius:"50%",background:done?FLAG.gold:"#eee",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{done?"⭐":"○"}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{lvl.label}</div><div style={{fontSize:11,color:"#888"}}>{lvl.xp} XP required</div></div>
                  {done&&<span style={{fontSize:12,color:"#22c55e",fontWeight:700}}>✓</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <nav style={s.nav}>
        {navItems.map(item=>(
          <button key={item.id} style={s.navBtn(screen===item.id)} onClick={()=>{setScreen(item.id);setActiveLesson(null);}}>
            <span style={{fontSize:15}}>{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}