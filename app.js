const promptTemplates = {
  morning_engine:
    "Summarize Morning Engine for Ou today: schedule, top 3 priorities, must-win follow-up, push/waiting items, Salesforce actions, risks, critical questions, time-blocked plan, finish-before-6 PM plan.",
  sales_follow_up:
    "Prepare a customer follow-up: customer snapshot, last interaction, open item, recommended email, Salesforce update draft, next action, due date.",
  portfolio_dca:
    "Prepare Portfolio/DCA decision using allocation truth from dashboard and live market timing as refreshed data. Use mock data only in MVP.",
  document_review:
    "Prepare document review: requirement summary, layout plan, quality check, revision notes, final output path placeholder.",
};

const state = {
  agents: [],
  tasks: [],
  results: [
    { title: "Morning Engine", summary: "Top 3 priorities, must-win follow-up, and finish-before-6 PM plan ready." },
    { title: "Portfolio DCA", summary: "Mock allocation gap reviewed. Live data is intentionally not connected in MVP v1." },
  ],
};

async function loadJson(path) {
  try {
    const res = await fetch(path);
    return await res.json();
  } catch {
    return null;
  }
}

function fallbackAgents() {
  return [
    {
      id: "chief_of_staff",
      name: "Chief of Staff Agent",
      room: "Command Room",
      status: "online",
      role: "Prioritize tasks, route work, summarize action plans",
      main_tasks: ["Daily brief", "Task routing", "Quality gate"],
      prompt_file: "prompts/chief_of_staff.md",
    },
  ];
}

function fallbackTasks() {
  return [
    {
      id: "task_001",
      title: "Prepare Morning Engine",
      agent: "Chief of Staff Agent",
      status: "pending",
      priority: "high",
      due_date: "2026-06-02",
      output_type: "daily_brief",
    },
  ];
}

function renderAgents() {
  const select = document.querySelector("#agentSelect");
  const grid = document.querySelector("#agentGrid");
  select.innerHTML = "";
  grid.innerHTML = "";
  state.agents.forEach((agent) => {
    const option = document.createElement("option");
    option.value = agent.id;
    option.textContent = agent.name;
    select.appendChild(option);

    const card = document.createElement("button");
    card.className = "agent-card";
    card.innerHTML = `
      <div>
        <p class="eyebrow">${agent.room}</p>
        <h3>${agent.name}</h3>
        <p>${agent.role}</p>
      </div>
      <span class="badge">${agent.status}</span>
    `;
    card.addEventListener("click", () => {
      select.value = agent.id;
      document.querySelector("#commandInput").value = `Use ${agent.name}. Main tasks: ${agent.main_tasks.join(", ")}.`;
    });
    grid.appendChild(card);
  });
  document.querySelector("#agentCount").textContent = state.agents.length;
}

function renderTasks() {
  const list = document.querySelector("#taskList");
  list.innerHTML = "";
  state.tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      <strong>${task.title}</strong>
      <p>${task.agent} · <span class="priority-${task.priority}">${task.priority}</span> · ${task.status}</p>
      <p>Due: ${task.due_date} · Output: ${task.output_type}</p>
    `;
    list.appendChild(div);
  });
  document.querySelector("#taskCount").textContent = state.tasks.length;
}

function renderResults() {
  const list = document.querySelector("#resultList");
  list.innerHTML = "";
  state.results.forEach((result) => {
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `<strong>${result.title}</strong><p>${result.summary}</p>`;
    list.appendChild(div);
  });
}

function sendCommand() {
  const select = document.querySelector("#agentSelect");
  const agent = state.agents.find((item) => item.id === select.value) || state.agents[0];
  const command = document.querySelector("#commandInput").value.trim();
  const output = document.querySelector("#outputCard");
  output.innerHTML = `
    <h3>${agent.name}</h3>
    <p><strong>Mock Output:</strong> ${command}</p>
    <p>Quality Gate: context checked, action drafted, risk note required, private data not exposed.</p>
  `;
  state.results.unshift({
    title: agent.name,
    summary: command.slice(0, 120),
  });
  renderResults();
}

async function init() {
  state.agents = (await loadJson("data/agents.json")) || fallbackAgents();
  state.tasks = (await loadJson("data/tasks.json")) || fallbackTasks();
  renderAgents();
  renderTasks();
  renderResults();

  document.querySelector("#sendCommand").addEventListener("click", sendCommand);
  document.querySelectorAll("[data-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#commandInput").value = promptTemplates[button.dataset.prompt];
    });
  });
  document.querySelectorAll(".mode").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".mode").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

init();

