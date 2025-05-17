const form = document.getElementById("formID");
const input = document.getElementById("textinput");
const todosEl = document.getElementById("todos");
const remEl = document.getElementById("remaining");
const btnClearAll = document.getElementById("clear-all");
const btnToggleAll = document.getElementById("toggle-all");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render ulang daftar
function render() {
  todosEl.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    li.className = t.done ? "completed" : "";
    // klik kiri: toggle selesai
    li.addEventListener("click", () => {
      todos[i].done = !todos[i].done;
      saveAndRender();
    });
    // klik kanan: hapus satu tugas
    li.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todos.splice(i, 1);
      saveAndRender();
    });
    // tombol delete di hover
    const del = document.createElement("span");
    del.textContent = "✖";
    del.className = "delete-btn";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(i, 1);
      saveAndRender();
    });
    li.appendChild(del);
    todosEl.appendChild(li);
  });
  // update status sisa
  const rem = todos.filter((t) => !t.done).length;
  remEl.textContent = `${rem} tugas tersisa`;
}

// Simpan + render
function saveAndRender() {
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

// Tambah tugas
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = input.value.trim();
  if (!v) return;
  todos.push({ text: v, done: false });
  input.value = "";
  saveAndRender();
});

// Hapus semua
btnClearAll.addEventListener("click", () => {
  if (confirm("Hapus semua tugas?")) {
    todos = [];
    saveAndRender();
  }
});

// Tandai semua selesai / belum selesai
btnToggleAll.addEventListener("click", () => {
  const allDone = todos.every((t) => t.done);
  todos = todos.map((t) => ({ text: t.text, done: !allDone }));
  saveAndRender();
});

// Inisialisasi
render();

// DARK MODE SETUP
const darkBtn = document.getElementById("darkModeBtn");
const isDark = localStorage.getItem("darkMode") === "true";

// Inisialisasi mode
if (isDark) document.body.classList.add("dark-mode");

// Toggle saat tombol diklik
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const enabled = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", enabled);
  darkBtn.textContent = enabled ? "☀️ Mode Terang" : "🌓 Mode Gelap";
});

// Ubah teks tombol sesuai state
if (isDark) darkBtn.textContent = "☀️ Mode Terang";
