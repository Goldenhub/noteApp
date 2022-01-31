import "./copy_date.js";
// VARIABLES DECLARATION
const saveNote = document.getElementById("save");
const textarea = document.getElementById("textarea");
const notes = document.getElementById("notes");
let noteCount = sessionStorage.length ?? 0;

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  getNotes();
  saveNote.addEventListener("click", handleSave);
  notes.addEventListener("click", deleteNote);
  notes.addEventListener("click", editNote);
  notes.addEventListener("click", saveEdit);
});

// DELETE NOTE FROM DOM AND LOCAL STORAGE
const deleteNote = (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
  sessionStorage.setItem(e.target.parentElement.parentElement.id, "");
};

// SAVE NOTE TO LOCAL STORAGE AND RENDER TO DOM
const handleSave = () => {
  if (textarea.value.length > 0) {
    noteCount += 1;
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let obj = [
      {
        date: date,
        time: time,
        note: textarea.value.trim(),
      },
    ];
    sessionStorage.setItem(`note${noteCount}`, JSON.stringify(obj));
    const note = `
            <div class="main__notes__note note" id="note${noteCount}">
                <a class="main__notes__note__button" href="#">
                    <i class='bx bx-x bx-sm delete'></i>
                </a>
                <p class="main__notes__note__date">${date} ${time}</p>
                <p class="main__notes__note__text edit">${textarea.value.trim()}</p>
            </div>`;
    notes.insertAdjacentHTML("beforeend", note);
    textarea.value = "";
  } else {
    return;
  }
};

// GET NOTES FROM LOCAL STORAGE
const getNotes = () => {
  for (const [key, value] of Object.entries(sessionStorage)) {
    if (value == "" || value == "true") {
      sessionStorage.removeItem(key);
      continue;
    }
    let noteFromStorage = JSON.parse(value);
    if (noteFromStorage) {
      noteFromStorage.forEach((noteObj) => {
        const noteElement = `
                  <div class="main__notes__note note" id="${key}">
                      <a class="main__notes__note__button" href="#">
                          <i class='bx bx-x bx-sm delete'></i>
                      </a>
                      <p class="main__notes__note__date">${noteObj.date} ${noteObj.time}</p>
                      <p class="main__notes__note__text edit">${noteObj.note}</p>
                  </div>`;
        notes.insertAdjacentHTML("beforeend", noteElement);
      });
    }
  }
};

// EDIT A NOTE -- ongoing
const editNote = (e) => {
  if (e.target.classList.contains("edit")) {
    e.target.contentEditable = true;
    e.target.parentElement.firstElementChild.innerHTML = `<i class='bx bx-check bx-sm saveEdit'></i>`;
  } else return;
};

// SAVE AN EDIT --ongoing
const saveEdit = (e) => {
  if (e.target.classList.contains("saveEdit")) {
      e.target.parentElement.parentElement.lastElementChild.contentEditable = false;
      let date = new Date().toLocaleDateString();
      let time = new Date().toLocaleTimeString();
      let obj = [
          {
              date: date,
              time: time,
              note: e.target.parentElement.parentElement.lastElementChild.textContent.trim(),
            },
    ];
    sessionStorage.setItem(e.target.parentElement.parentElement.id, JSON.stringify(obj));
    e.target.parentElement.nextElementSibling.outerHTML = `<p class="main__notes__note__date">${date} ${time}</p>`
    e.target.outerHTML = `<i class='bx bx-x bx-sm delete'></i>`;
  } else return;
};