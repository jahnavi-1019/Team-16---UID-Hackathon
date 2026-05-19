/* TechNova 2026 — session arrays only (no localStorage) */

const FEST_DATE = new Date("2026-10-15T09:00:00");

// Duplicate this block to add more events
const EVENTS_DATA = [
  {
    id: "EV001",
    name: "Code Clash",
    category: "Programming",
    dateTime: "2026-03-15 10:00 AM",
    venue: "Lab Block A — 301",
    maxParticipants: 60,
    fee: 150,
    status: "Open",
    image: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/68454976717e6_codeclash-the-battle-of-logic-code.webp",
  },
  {
    id: "EV002",
    name: "Tech Quiz",
    category: "Quiz",
    dateTime: "2026-03-16 10:00 AM",
    venue: "Seminar Hall 2",
    maxParticipants: 100,
    fee: 50,
    status: "Closed",
    image: "https://img.freepik.com/free-vector/comic-cartoon-style-editable-text-effect_36662-1953.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "EV003",
    name: "Robo Soccer",
    category: "Robotics",
    dateTime: "2026-03-15 01:30 PM",
    venue: "Main Auditorium Courtyard",
    maxParticipants: 32,
    fee: 300,
    status: "Open",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbYAFihaa17dmo71tOH-QwAsDi8HI8A9ryA&s",
  },
  {
    id: "EV004",
    name: "UI/UX Design Sprint",
    category: "Design",
    dateTime: "2026-03-16 11:00 AM",
    venue: "Design Studio — Block C",
    maxParticipants: 45,
    fee: 100,
    status: "Open",
    image: "https://img.freepik.com/free-vector/web-design-facebook-cover-template_23-2150973124.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "EV005",
    name: "WebDev Hackathon",
    category: "Development",
    dateTime: "2026-03-17 09:00 AM",
    venue: "Advanced IT Lab",
    maxParticipants: 50,
    fee: 200,
    status: "Open",
    image: "https://cdn.vectorstock.com/i/500p/07/79/web-development-concepts-blue-banner-vector-44690779.jpg",
  },
  {
    id: "EV006",
    name: "Cyber Security Capture The Flag",
    category: "Networking",
    dateTime: "2026-03-17 02:00 PM",
    venue: "Server Room Lab — 405",
    maxParticipants: 80,
    fee: 120,
    status: "Open",
    image: "https://media.licdn.com/dms/image/v2/D5612AQEMTmdASEpqog/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1680103178404?e=2147483647&v=beta&t=lAzHeCTbZCsApYT9TWcNg0HF8vO-r_U0W3kKi1oEc10",
  },
  {
    id: "EV007",
    name: "AI Project Expo",
    category: "Exhibition",
    dateTime: "2026-03-18 10:00 AM",
    venue: "Central Library Lounge",
    maxParticipants: 150,
    fee: 0,
    status: "Open",
    image: "https://pandata.co/wp-content/uploads/2022/08/AI-NA-Updated-dates-banner.png",
  },
    {
    id: "EV008",
    name: "Cloud Computing Workshop",
    category: "Cloud",
    dateTime: "2026-03-18 02:30 PM",
    venue: "Seminar Hall 1",
    maxParticipants: 75,
    fee: 80,
    status: "Closed",
    image: "https://media.slidesgo.com/storage/57264163/conversions/0-cloud-computing-workshop-thumb.jpg",
  }
];





const sessionRegistrations = [];
const sessionFeedback = [];

const REGEX = {
  name: /^[A-Za-z\s]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  mobile: /^\d{10}$/,
  registerNo: /^[A-Z]{2}\.[A-Z]{2}\.U4[A-Z]{3}\d{5}$/,
};

function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === page);
  });
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
}

function initDateTime() {
  const el = document.getElementById("currentDateTime");
  if (!el) return;
  const update = () => {
    el.textContent = new Date().toLocaleString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
  };
  update();
  setInterval(update, 1000);
}

function initCountdown() {
  const c = document.getElementById("countdown");
  if (!c) return;
  const u = {
    days: c.querySelector('[data-unit="days"]'),
    hours: c.querySelector('[data-unit="hours"]'),
    minutes: c.querySelector('[data-unit="minutes"]'),
    seconds: c.querySelector('[data-unit="seconds"]'),
  };
  const update = () => {
    const diff = FEST_DATE - new Date();
    if (diff <= 0) {
      Object.values(u).forEach((x) => { if (x) x.textContent = "0"; });
      return;
    }
    if (u.days) u.days.textContent = Math.floor(diff / 86400000);
    if (u.hours) u.hours.textContent = Math.floor((diff / 3600000) % 24);
    if (u.minutes) u.minutes.textContent = Math.floor((diff / 60000) % 60);
    if (u.seconds) u.seconds.textContent = Math.floor((diff / 1000) % 60);
  };
  update();
  setInterval(update, 1000);
}

function initDashboard() {
  const open = EVENTS_DATA.filter((e) => e.status === "Open").length;
  const closed = EVENTS_DATA.filter((e) => e.status === "Closed").length;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("statTotal", EVENTS_DATA.length);
  set("statOpen", open);
  set("statClosed", closed);
}

function renderEvents() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;
  grid.innerHTML = EVENTS_DATA.map((ev) => {
    const sc = ev.status === "Open" ? "status-open" : "status-closed";
    return `<article class="event-card event-card--clickable" data-event-id="${ev.id}" data-event-name="${ev.name}" tabindex="0">
      <div class="event-thumb"><img src="${ev.image}" alt="${ev.name}" onerror="this.style.display='none'"></div>
      <div class="event-body">
        <h3>${ev.name}</h3>
        <p class="event-meta"><strong>ID:</strong> ${ev.id} · ${ev.category}</p>
        <p class="event-meta">${ev.dateTime} · ${ev.venue}</p>
        <p class="event-meta">Max ${ev.maxParticipants} · ₹${ev.fee} · <span class="${sc}">${ev.status}</span></p>
      </div>
    </article>`;
  }).join("");
}

function populateEventSelects() {
  document.querySelectorAll("#eventSelect, #eventAttended").forEach((sel) => {
    if (!sel) return;
    const ph = sel.id === "eventSelect" ? "Select an event" : "Select event attended";
    sel.innerHTML = `<option value="">${ph}</option>` +
      EVENTS_DATA.map((ev) => `<option value="${ev.name}">${ev.name} (${ev.status})</option>`).join("");
  });
}

function goToRegistrationForm(eventName) {
  const select = document.getElementById("eventSelect");
  const section = document.getElementById("registrationSection");
  if (select) select.value = eventName;
  document.querySelectorAll(".event-card").forEach((c) => {
    c.classList.toggle("selected", c.dataset.eventName === eventName);
  });
  section?.scrollIntoView({ behavior: "smooth" });
}

function initEventClickHandlers() {
  const grid = document.getElementById("eventsGrid");
  if (!grid) return;
  const activate = (el) => {
    if (!el?.dataset.eventName) return;
    goToRegistrationForm(el.dataset.eventName);
    history.replaceState(null, "", "#register-" + el.dataset.eventId);
  };
  grid.addEventListener("click", (e) => activate(e.target.closest(".event-card--clickable")));
  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".event-card--clickable");
      if (card) { e.preventDefault(); activate(card); }
    }
  });
}

function showFieldError(inputId, message) {
  document.getElementById(inputId)?.closest(".form-group")?.classList.add("field-error");
  const err = document.getElementById(inputId + "Error");
  if (err) err.textContent = message;
}

function clearFieldErrors(form) {
  form.querySelectorAll(".form-group").forEach((g) => g.classList.remove("field-error"));
  form.querySelectorAll(".error-msg").forEach((e) => (e.textContent = ""));
}

function showMessage(id, text, isError) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = `message show ${isError ? "error" : "success"}` + (id === "fbMessage" ? " message-feedback" : "");
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function showFeedbackSuccess() {
  const el = document.getElementById("fbMessage");
  if (!el) return;
  el.innerHTML = "<strong>✓ Feedback submitted successfully!</strong>";
  el.className = "message message-feedback show success";
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

function toggleTeamFields() {
  const isTeam = document.querySelector('input[name="participationType"]:checked')?.value === "Team";
  document.getElementById("teamNameGroup")?.classList.toggle("hidden", !isTeam);
  document.getElementById("teamMembersGroup")?.classList.toggle("hidden", !isTeam);
}

function renderRegistrationsTable() {
  const tbody = document.getElementById("registrationsTableBody");
  if (!tbody) return;
  if (!sessionRegistrations.length) {
    tbody.innerHTML = "<tr><td colspan='6'>No registrations yet.</td></tr>";
    return;
  }
  tbody.innerHTML = sessionRegistrations.map((r, i) => `
    <tr><td>${i + 1}</td><td>${r.name}</td><td>${r.registerNo}</td>
    <td>${r.event}</td><td>${r.participationType}</td><td>${r.teamName || "—"}</td></tr>`).join("");
}

function updateRegistrationCount() {
  const el = document.getElementById("registrationCount");
  if (el) el.innerHTML = `Total registrations: <strong>${sessionRegistrations.length}</strong>`;
}

function renderFeedbackList() {
  const list = document.getElementById("feedbackList");
  if (!list) return;
  if (!sessionFeedback.length) {
    list.innerHTML = "<p>No feedback submitted yet.</p>";
    return;
  }
  list.innerHTML = sessionFeedback.map((f, i) => `
    <div class="card" style="margin-bottom:0.75rem">
      <h3>#${i + 1} — ${f.event}</h3>
      <p class="event-meta">${f.name} (${f.registerNo}) · ${f.rating}/5</p>
      <p class="intro-text">${f.comments}</p>
    </div>`).join("");
}

function updateAverageRating() {
  const el = document.getElementById("averageRating");
  if (!el) return;

  if (!sessionFeedback.length) {
    el.innerHTML = "<p>No feedback submitted yet.</p>";
    return;
  }

  // Group feedback by event
  const eventRatings = {};
  sessionFeedback.forEach((f) => {
    if (!eventRatings[f.event]) {
      eventRatings[f.event] = [];
    }
    eventRatings[f.event].push(f.rating);
  });

  // Build table HTML
  let tableHTML = `
    <table border="1" cellpadding="6" cellspacing="0">
      <thead>
        <tr>
          <th>Event</th>
          <th>Average Rating</th>
          <th>Reviews Count</th>
        </tr>
      </thead>
      <tbody>
  `;

  Object.keys(eventRatings).forEach((eventName) => {
    const ratings = eventRatings[eventName];
    const avg = (ratings.reduce((a, r) => a + r, 0) / ratings.length).toFixed(2);
    tableHTML += `
      <tr>
        <td>${eventName}</td>
        <td>${avg} / 5</td>
        <td>${ratings.length}</td>
      </tr>
    `;
  });

  tableHTML += "</tbody></table>";

  el.innerHTML = tableHTML;
}

function initRegistrationForm() {
  const form = document.getElementById("registrationForm");
  if (!form) return;

  document.querySelectorAll('input[name="participationType"]').forEach((r) => {
    r.addEventListener("change", toggleTeamFields);
  });
  toggleTeamFields();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFieldErrors(form);

    const name = document.getElementById("studentName").value.trim();
    const registerNo = document.getElementById("registerNumber").value.trim().toUpperCase();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const department = document.getElementById("department").value;
    const year = document.getElementById("year").value;
    const eventName = document.getElementById("eventSelect").value;
    const type = document.querySelector('input[name="participationType"]:checked')?.value;
    const teamName = document.getElementById("teamName").value.trim();
    const teamMembers = document.getElementById("teamMembers").value.trim();

    let valid = true;
    if (!REGEX.name.test(name)) { showFieldError("studentName", "Alphabets and spaces only."); valid = false; }
    if (!REGEX.registerNo.test(registerNo)) { showFieldError("registerNumber", "Use CB.EN.U4CSE23001"); valid = false; }
    if (!REGEX.email.test(email)) { showFieldError("email", "Invalid email."); valid = false; }
    if (!REGEX.mobile.test(mobile)) { showFieldError("mobile", "10 digits required."); valid = false; }
    if (!department) { showFieldError("department", "Select department."); valid = false; }
    if (!year) { showFieldError("year", "Select year."); valid = false; }
    if (!eventName) { showFieldError("eventSelect", "Select an event."); valid = false; }

    const event = EVENTS_DATA.find((ev) => ev.name === eventName);
    if (event?.status === "Closed") { showFieldError("eventSelect", "Event is closed."); valid = false; }

    if (type === "Team") {
      if (!teamName) { showFieldError("teamName", "Team name required."); valid = false; }
      const size = parseInt(teamMembers, 10);
      if (!teamMembers || size < 2 || size > 4) { showFieldError("teamMembers", "Team size 2–4."); valid = false; }
    }

    if (sessionRegistrations.some((r) => r.registerNo === registerNo && r.event === eventName)) {
      showFieldError("registerNumber", "Already registered for this event."); valid = false;
    }

    if (!valid) { showMessage("regMessage", "Please fix the errors below.", true); return; }

    sessionRegistrations.push({
      name, registerNo, email, mobile, department, year, event: eventName,
      participationType: type, teamName: type === "Team" ? teamName : "",
    });
    renderRegistrationsTable();
    updateRegistrationCount();
    showMessage("regMessage", `Registration successful! ${name} → ${eventName}`, false);
    form.reset();
    toggleTeamFields();
  });
}

function initFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFieldErrors(form);

    const name = document.getElementById("fbName").value.trim();
    const registerNo = document.getElementById("fbRegister").value.trim();
    const event = document.getElementById("eventAttended").value;
    const rating = document.querySelector('input[name="rating"]:checked');
    const comments = document.getElementById("comments").value.trim();

    let valid = true;
    if (!name) { showFieldError("fbName", "Enter name."); valid = false; }
    if (!registerNo) { showFieldError("fbRegister", "Register number required."); valid = false; }
    if (!event) { showFieldError("eventAttended", "Select event."); valid = false; }
    if (!rating) { document.getElementById("ratingError").textContent = "Select rating 1–5."; valid = false; }
    if (comments.length < 20) { showFieldError("comments", "Min 20 characters."); valid = false; }

    if (!valid) { showMessage("fbMessage", "Please fix the errors below.", true); return; }

    sessionFeedback.push({ name, registerNo, event, rating: +rating.value, comments });
    renderFeedbackList();
    updateAverageRating();
    showFeedbackSuccess();
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  initNavToggle();
  initDateTime();
  initCountdown();
  initDashboard();
  renderEvents();
  populateEventSelects();
  initEventClickHandlers();
  initRegistrationForm();
  initFeedbackForm();
  updateRegistrationCount();
  updateAverageRating();
  renderRegistrationsTable();
  renderFeedbackList();

  const hash = location.hash;
  if (hash.startsWith("#register-")) {
    const ev = EVENTS_DATA.find((e) => e.id === hash.replace("#register-", ""));
    if (ev) setTimeout(() => goToRegistrationForm(ev.name), 100);
  }
});
