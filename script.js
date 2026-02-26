const STORAGE_KEY = "mLearningSchool_students";

const form = document.getElementById("student-form");
const statusMessage = document.getElementById("statusMessage");
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

function writeStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function showStatus(message, type = "info") {
  if (!statusMessage) return;
  statusMessage.textContent = message;
  statusMessage.classList.remove("success", "error");
  if (type === "success") statusMessage.classList.add("success");
  if (type === "error") statusMessage.classList.add("error");
  if (message) {
    setTimeout(() => {
      statusMessage.textContent = "";
      statusMessage.classList.remove("success", "error");
    }, 2500);
  }
}

function createStudentFromForm(formData) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: formData.get("studentName").trim(),
    age: Number(formData.get("studentAge")),
    studentClass: formData.get("studentClass"),
    section: formData.get("studentSection").trim().toUpperCase(),
    parentName: formData.get("parentName").trim(),
    contactNumber: formData.get("contactNumber").trim(),
    address: formData.get("address").trim(),
    gender: formData.get("gender"),
    createdAt: new Date().toISOString(),
  };
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);

  if (!formData.get("studentName") || !formData.get("studentClass")) {
    showStatus("Please fill in all required fields.", "error");
    return;
  }

  const students = readStudents();
  const nextStudent = createStudentFromForm(formData);
  students.push(nextStudent);
  writeStudents(students);

  form.reset();
  showStatus("Student details saved successfully.", "success");
}

if (form) {
  form.addEventListener("submit", handleFormSubmit);
}

