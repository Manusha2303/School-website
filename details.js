const STORAGE_KEY = "mLearningSchool_students";

const tableBody = document.getElementById("studentsBody");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

function readStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function renderTable(students, query = "") {
  if (!tableBody || !emptyState) return;

  tableBody.innerHTML = "";

  const trimmedQuery = query.trim().toLowerCase();
  const filtered = trimmedQuery
    ? students.filter((s) => {
        return (
          s.name.toLowerCase().includes(trimmedQuery) ||
          String(s.studentClass).toLowerCase().includes(trimmedQuery) ||
          (s.section || "").toLowerCase().includes(trimmedQuery)
        );
      })
    : students;

  if (!filtered.length) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  filtered.forEach((student, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td><span class="badge-class">${student.studentClass}</span></td>
      <td><span class="badge-section">${student.section}</span></td>
      <td>${student.age}</td>
      <td><span class="badge-gender">${student.gender}</span></td>
      <td>${student.parentName}</td>
      <td>${student.contactNumber}</td>
      <td>${student.address}</td>
    `;

    tableBody.appendChild(tr);
  });
}

function handleSearchInput() {
  const students = readStudents();
  const query = searchInput.value || "";
  renderTable(students, query);
}

document.addEventListener("DOMContentLoaded", () => {
  const students = readStudents();
  renderTable(students);
});

if (searchInput) {
  searchInput.addEventListener("input", handleSearchInput);
}

