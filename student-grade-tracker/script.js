let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("studentName");
const gradeInput = document.getElementById("studentGrade");
const tableBody = document.getElementById("studentTableBody");
const averageGradeDisplay = document.getElementById("averageGrade");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const grade = Number(gradeInput.value);

  if (name === "") {
    showError("Student name is required.");
    return;
  }

  if (isNaN(grade) || grade < 0 || grade > 100) {
    showError("Grade must be a number between 0 and 100.");
    return;
  }

  const student = {
    id: Date.now(),
    name,
    grade,
  };

  students.push(student);
  saveAndRender();
  form.reset();
  errorMessage.textContent = "";
});

function deleteStudent(id) {
  students = students.filter((student) => student.id !== id);
  saveAndRender();
}

function calculateAverage() {
  if (students.length === 0) return 0;

  const total = students.reduce((sum, student) => sum + student.grade, 0);
  return (total / students.length).toFixed(2);
}

function renderStudents() {
  tableBody.innerHTML = "";
  const average = calculateAverage();

  students.forEach((student) => {
    const row = document.createElement("tr");

    if (student.grade > average) {
      row.classList.add("above-average");
    }

    row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;

    tableBody.appendChild(row);
  });

  averageGradeDisplay.textContent = average;
}

function saveAndRender() {
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

function showError(message) {
  errorMessage.textContent = message;
}

renderStudents();
