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
    let obj = [
      {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        note: textarea.value.trim(),
      },
    ];
    sessionStorage.setItem(`note${noteCount}`, JSON.stringify(obj));
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    const note = `
            <div class="main__notes__note note" id="note${noteCount}">
                <a class="main__notes__note__button" href="#">
                    <i class='bx bx-x bx-sm delete'></i>
                </a>
                <p class="main__notes__note__date">${date} ${time}</p>
                <p class="main__notes__note__text">${textarea.value.trim()}</p>
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
    if(value == '' || value == 'true') {
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
                      <p class="main__notes__note__text">${noteObj.note}</p>
                  </div>`;
        notes.insertAdjacentHTML("beforeend", noteElement);
      });
    }
  }
};
