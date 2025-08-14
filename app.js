/* Ynbeweging — Activiteiten (Mockup)
   Interactieve front-end zonder backend. Alles in vanilla JS.
*/
const state = {
  filters: {
    category: "",
    distance: "",
    activity: "",
    dateFrom: "",
    dateTo: "",
    freeOnly: false,
    under60: false,
    ages: new Set(),
    search: "",
  },
  events: [],
};

// Sample data (11 evenementen)
state.events = [
  {
    id: 1,
    date: "2025-08-18",
    start: "10:30",
    duration: 180,
    title: "SimmerJump Gorredijk",
    provider: "Beweegteam Opsterland",
    location: "Gorredijk",
    age: "0-14",
    price: 0,
    category: "Overig",
    activity: "SimmerJump",
    distance_km: 6,
  },
  {
    id: 2,
    date: "2025-08-19",
    start: "10:30",
    duration: 180,
    title: "SimmerJump Ureterp",
    provider: "Beweegteam Opsterland",
    location: "Ureterp",
    age: "0-14",
    price: 0,
    category: "Overig",
    activity: "SimmerJump",
    distance_km: 12,
  },
  {
    id: 3,
    date: "2025-08-20",
    start: "16:00",
    duration: 90,
    title: "Turnen 6 t/m 9 jr",
    provider: "GV Longa",
    location: "Gorredijk",
    age: "6-9",
    price: 0,
    category: "Gymnastiek",
    activity: "Turnen",
    distance_km: 4,
  },
  {
    id: 4,
    date: "2025-08-20",
    start: "17:30",
    duration: 90,
    title: "Acrogym",
    provider: "GV Longa",
    location: "Gorredijk",
    age: "6+",
    price: 0,
    category: "Gymnastiek",
    activity: "Acrogym",
    distance_km: 4,
  },
  {
    id: 5,
    date: "2025-08-21",
    start: "10:30",
    duration: 180,
    title: "SimmerJump Aldeboarn",
    provider: "Beweegteam Opsterland",
    location: "Aldeboarn",
    age: "0-14",
    price: 0,
    category: "Overig",
    activity: "SimmerJump",
    distance_km: 22,
  },
  {
    id: 6,
    date: "2025-09-01",
    start: "13:30",
    duration: 60,
    title: "Bootcamp Try-out",
    provider: "Fitclub De Kompanije",
    location: "Gorredijk",
    age: "Volwassenen",
    price: 5,
    category: "Fitness",
    activity: "Fitness",
    distance_km: 3,
  },
  {
    id: 7,
    date: "2025-08-24",
    start: "09:30",
    duration: 120,
    title: "Halve marathon trainingsloop",
    provider: "Loopgroep Opsterland",
    location: "Beetsterzwaag",
    age: "Volwassenen",
    price: 0,
    category: "Hardlopen",
    activity: "Hardlopen",
    distance_km: 15,
  },
  {
    id: 8,
    date: "2025-08-28",
    start: "18:30",
    duration: 60,
    title: "Start-to-Run",
    provider: "Loopgroep Opsterland",
    location: "Gorredijk",
    age: "Volwassenen",
    price: 25,
    category: "Hardlopen",
    activity: "Hardlopen",
    distance_km: 2,
  },
  {
    id: 9,
    date: "2025-08-30",
    start: "10:00",
    duration: 120,
    title: "Fietsclinic techniek",
    provider: "Wielerclub Opsterland",
    location: "Wijnjewoude",
    age: "Volwassenen",
    price: 0,
    category: "Fietsen",
    activity: "Fietsen",
    distance_km: 9,
  },
  {
    id: 10,
    date: "2025-09-02",
    start: "19:00",
    duration: 90,
    title: "Hockey proeftraining",
    provider: "MHC Gorredijk",
    location: "Gorredijk",
    age: "6+",
    price: 0,
    category: "Hockey",
    activity: "Hockey",
    distance_km: 1,
  },
  {
    id: 11,
    date: "2025-09-05",
    start: "10:00",
    duration: 60,
    title: "Tennis instuif",
    provider: "TV Oerterp",
    location: "Ureterp",
    age: "Volwassenen",
    price: 0,
    category: "Tennis",
    activity: "Tennis",
    distance_km: 10,
  },
];

const monthNames = ["jan.","feb.","mrt","apr","mei","jun","jul","aug.","sep.","okt.","nov.","dec."];

function fmtDateParts(iso){
  const d = new Date(iso + "T00:00:00");
  return { mon: monthNames[d.getMonth()], day: d.getDate() };
}
function pad(n){return n.toString().padStart(2,"0")}
function minutesToStr(m){ if(!m) return ""; const h=Math.floor(m/60), mm=m%60; return (h? h+'u': '') + (mm? (h?' ':'') + mm + 'm':'' )}
function priceLabel(p){ return p===0 ? "Gratis" : "Betaald" }

function eventMatchesFilters(ev){
  const f = state.filters;
  if(f.category && ev.category !== f.category) return false;
  if(f.activity && ev.activity !== f.activity) return false;
  if(f.distance){
    const max = Number(f.distance);
    if(max===5 && ev.distance_km>5) return false;
    if(max===10 && !(ev.distance_km>5 && ev.distance_km<=10)) return false;
    if(max===25 && !(ev.distance_km>10 && ev.distance_km<=25)) return false;
  }
  if(f.dateFrom && ev.date < f.dateFrom) return false;
  if(f.dateTo && ev.date > f.dateTo) return false;
  if(f.freeOnly && ev.price>0) return false;
  if(f.under60 && ev.duration>60) return false;
  if(f.ages.size>0){
    let ok=false;
    f.ages.forEach(a=>{ if(ev.age===a) ok=true; });
    if(!ok) return false;
  }
  if(f.search){
    const q = f.search.toLowerCase();
    const hay = `${ev.title} ${ev.provider} ${ev.location}`.toLowerCase();
    if(!hay.includes(q)) return false;
  }
  return true;
}

function renderCards(){
  const wrap = document.getElementById("cards");
  wrap.innerHTML = "";
  const list = state.events.filter(eventMatchesFilters);
  document.getElementById("resultsCount").textContent = `${list.length} resultaten`;

  list.forEach(ev => {
    const {mon,day} = fmtDateParts(ev.date);
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="media"><div class="ph">Afbeelding</div></div>
      <div class="body">
        <div class="badges">
          <div class="badge">
            <div class="date"><div class="mon">${mon}</div><div class="day">${day}</div></div>
            <div class="time">${ev.start}</div>
            <div class="duration">${minutesToStr(ev.duration)}</div>
          </div>
          <div class="badge pill ${ev.price===0?'free':'paid'}">${priceLabel(ev.price)}</div>
        </div>

        <div class="provider">${ev.provider}</div>
        <div class="title">${ev.title}</div>
        <div class="meta">
          <span class="chip">Leeftijd ${ev.age}</span>
          <span class="chip">${ev.category}</span>
          <span class="chip">${ev.location}</span>
          <span class="chip">${ev.distance_km} km</span>
        </div>
        <div class="footer">
          <button class="small apply" data-action="details" data-id="${ev.id}">Details</button>
          <button class="small" data-action="save" data-id="${ev.id}">Bewaar</button>
        </div>
      </div>
    `;
    wrap.appendChild(card);
  });
}

function closeAllDropdowns(except=null){
  document.querySelectorAll(".dropdown").forEach(d => {
    if(d !== except) d.classList.remove("open");
  });
}

function initDropdowns(){
  document.querySelectorAll(".dropdown .dropbtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const dd = e.currentTarget.closest(".dropdown");
      const nowOpen = !dd.classList.contains("open");
      closeAllDropdowns(nowOpen ? dd : null);
      dd.classList.toggle("open");
    });
  });

  // Category
  document.querySelectorAll('input[name="category"]').forEach(r => {
    r.addEventListener("change", () => {
      state.filters.category = r.value;
      renderCards();
    });
  });
  // Distance
  document.querySelectorAll('input[name="distance"]').forEach(r => {
    r.addEventListener("change", () => {
      state.filters.distance = r.value;
      renderCards();
    });
  });
  // Activity
  document.querySelectorAll('input[name="activity"]').forEach(r => {
    r.addEventListener("change", () => {
      state.filters.activity = r.value;
      renderCards();
    });
  });
  // Dates
  document.querySelector('.panel-date .apply').addEventListener('click', () => {
    const from = document.getElementById('dateFrom').value;
    const to = document.getElementById('dateTo').value;
    state.filters.dateFrom = from;
    state.filters.dateTo = to;
    renderCards();
    closeAllDropdowns();
  });

  // More
  document.getElementById("freeOnly").addEventListener("change", e => {
    state.filters.freeOnly = e.target.checked; renderCards();
  });
  document.getElementById("under60").addEventListener("change", e => {
    state.filters.under60 = e.target.checked; renderCards();
  });
  document.querySelectorAll('.panel-more .agechips input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", e => {
      const val = e.target.value;
      if(e.target.checked) state.filters.ages.add(val);
      else state.filters.ages.delete(val);
      renderCards();
    });
  });
  document.querySelector('[data-action="clear-filters"]').addEventListener("click", () => {
    state.filters.freeOnly=false; document.getElementById("freeOnly").checked=false;
    state.filters.under60=false; document.getElementById("under60").checked=false;
    state.filters.ages.clear();
    document.querySelectorAll('.panel-more .agechips input[type="checkbox"]').forEach(cb=>cb.checked=false);
    renderCards();
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if(!e.target.closest(".dropdown")) closeAllDropdowns();
  });
}

function initIconChips(){
  const chips = document.querySelectorAll(".iconchip");
  chips.forEach(ch => {
    ch.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      ch.classList.add("active");
      state.filters.category = ch.dataset.category;
      // Also sync radio in dropdown for clarity (non-essential)
      const radio = document.querySelector(`input[name="category"][value="${state.filters.category}"]`) || document.querySelector('input[name="category"][value=""]');
      if(radio){ radio.checked = true; }
      renderCards();
    });
  });
}

function initSearch(){
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const doSearch = () => { state.filters.search = input.value.trim(); renderCards(); }
  btn.addEventListener("click", doSearch);
  input.addEventListener("keydown", (e) => { if(e.key === "Enter") doSearch(); });
}

function openDrawer(title, contentHTML){
  document.getElementById("drawerTitle").textContent = title;
  document.getElementById("drawerBody").innerHTML = contentHTML;
  document.getElementById("drawer").classList.add("open");
}
function closeDrawer(){ document.getElementById("drawer").classList.remove("open"); }
function initDrawer(){
  document.querySelector('[data-action="close-drawer"]').addEventListener("click", closeDrawer);
  document.getElementById("drawer").addEventListener("click", (e)=>{
    if(e.target.id === "drawer") closeDrawer();
  });
}

function initFab(){
  document.querySelector('[data-action="open-calendar"]').addEventListener("click",()=>{
    const list = state.events.filter(eventMatchesFilters).sort((a,b)=> (a.date+a.start).localeCompare(b.date+b.start));
    const rows = list.map(ev => `
      <tr>
        <td>${ev.date}</td>
        <td>${ev.start}</td>
        <td>${ev.title}</td>
        <td>${ev.provider}</td>
        <td>${ev.location}</td>
        <td>${priceLabel(ev.price)}</td>
      </tr>`).join("");
    openDrawer("Kalenderweergave", `
      <div class="tablewrap">
        <table>
          <thead><tr><th>Datum</th><th>Tijd</th><th>Activiteit</th><th>Aanbieder</th><th>Plaats</th><th>Prijs</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);
  });
  document.querySelector('[data-action="open-map"]').addEventListener("click",()=>{
    openDrawer("Kaartweergave (mockup)", `
      <p>Kaart komt hier (mockup). In productie zou dit een OpenStreetMap/Leaflet kaart zijn met markers per activiteit.</p>
      <ul>
        ${state.events.filter(eventMatchesFilters).map(ev=>`<li>${ev.title} — ${ev.location}</li>`).join("")}
      </ul>
    `);
  });
}

function initCardActions(){
  document.getElementById("cards").addEventListener("click", (e)=>{
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    const id = Number(btn.dataset.id);
    const ev = state.events.find(x=>x.id===id);
    if(!ev) return;
    if(btn.dataset.action==="details"){
      const {mon,day} = fmtDateParts(ev.date);
      openDrawer("Activiteit", `
        <h4>${ev.title}</h4>
        <p><strong>${ev.provider}</strong> — ${ev.location}</p>
        <p><svg width="16" height="16"><use href="#icon-calendar"/></svg> ${day} ${mon} ${ev.start} (${minutesToStr(ev.duration)})</p>
        <p>Categorie: ${ev.category} • Leeftijd: ${ev.age} • ${ev.distance_km} km</p>
        <p>Prijs: <strong>${priceLabel(ev.price)}</strong></p>
        <button class="primary" onclick="alert('Inschrijving (mockup)')">Inschrijven</button>
      `);
    }
    if(btn.dataset.action==="save"){
      btn.innerHTML = `<svg width="16" height="16"><use href="#icon-check"/></svg> Bewaard`;
      btn.disabled = true;
    }
  });
}

function init(){
  document.getElementById("year").textContent = new Date().getFullYear();
  initDropdowns();
  initIconChips();
  initSearch();
  initDrawer();
  initFab();
  initCardActions();
  renderCards();
}
document.addEventListener("DOMContentLoaded", init);
