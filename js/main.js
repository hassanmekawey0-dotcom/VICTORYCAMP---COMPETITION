/* VICTORY CAMP — Battle League interactions. Sample data only. */
const individual = [
  {name:"KARIM HASSAN",sub:"ELITE / STRENGTH",missions:8,points:980,status:"TOP OPERATOR",initials:"KH"},
  {name:"OMAR ADEL",sub:"ELITE / HYBRID",missions:7,points:910,status:"ON THE RISE",initials:"OA"},
  {name:"YOUSEF ALI",sub:"OPEN / ENDURANCE",missions:8,points:870,status:"ON THE RISE",initials:"YA"},
  {name:"MALIK SAMIR",sub:"OPEN / STRENGTH",missions:6,points:790,status:"ACTIVE",initials:"MS"},
  {name:"ADAM MOSTAFA",sub:"OPEN / HYBRID",missions:7,points:740,status:"ACTIVE",initials:"AM"}
];
const squads = [
  {name:"WOLFPACK",sub:"UNIT / 01",missions:12,points:2840,status:"LEADING UNIT",initials:"W"},
  {name:"REAPERS",sub:"UNIT / 02",missions:11,points:2610,status:"ON THE RISE",initials:"R"},
  {name:"VANGUARD",sub:"UNIT / 03",missions:10,points:2290,status:"ACTIVE",initials:"V"},
  {name:"IRON LEGION",sub:"UNIT / 04",missions:9,points:2080,status:"ACTIVE",initials:"I"},
  {name:"NIGHT RAID",sub:"UNIT / 05",missions:8,points:1940,status:"ACTIVE",initials:"N"}
];

/* Mobile navigation */
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#mainNav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

/* Switch leaderboard between individual athletes and squads */
const rows = document.querySelector("#boardRows");
const tabs = document.querySelectorAll("[data-board]");
function renderBoard(type = "individual") {
  if (!rows) return;
  const list = type === "squad" ? squads : individual;
  rows.innerHTML = list.map((item, index) => `
    <div class="leader-row">
      <div class="athlete">
        <span class="rank">${String(index + 1).padStart(2, "0")}</span>
        <span class="avatar" aria-hidden="true">${item.initials}</span>
        <span><span class="name">${item.name}</span><small class="sub">${item.sub}</small></span>
      </div>
      <span class="board-num">${item.missions}</span>
      <strong class="points">${item.points.toLocaleString("en-US")}</strong>
      <span class="badge">${item.status}</span>
    </div>`).join("");
}
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(button => button.classList.remove("active"));
  tab.classList.add("active");
  renderBoard(tab.dataset.board);
}));
renderBoard();

/* Front-end demo form: no data is sent or stored. */
const form = document.querySelector("#joinForm");
const message = document.querySelector("#formMessage");
if (form && message) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = new FormData(form).get("name").trim().split(/\s+/)[0];
    message.textContent = `ENLISTMENT PREVIEW COMPLETE, ${name.toUpperCase()}. CONNECT A BACKEND TO RECEIVE REAL REGISTRATIONS.`;
    form.reset();
  });
}
