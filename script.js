//! Getting Elements from html
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textareaInput = document.getElementById("textareaInput");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

//! form Validation
const formValidation = () => {
  if (textInput.value === "" || dateInput === "" || textareaInput === "") {
    msg.innerHTML = "Input Fields Cannot Be Empty 😞";
  } else {
    msg.innerHTML = "";
    getData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

//! Submit Logic
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//! assigning data object
let data = [{}];

const getData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    task: textareaInput.value,
  });
  // storage (browser storage)
  localStorage.setItem("data", JSON.stringify(data));
  createTask();
};

//! Display the data from localstorage
const createTask = () => {
  tasks.innerHTML;
  data.map((ele, index) => {
    return (tasks.innerHTML += `
            <div id="${index}">
                <span class="fw-bolder">${ele.text}</span>
                <span class="fw-bolder">${ele.date}</span>
                <p class="fw-bold">${ele.task}</p>
                <div class="options">
                    <i onclick="editTask(this)" class="fa-solid fa-pen-to-square fa-beat" style="color: #FFD43B;" data-bs-toggle="modal" data-bs-target="#form" ></i>
                  <i onclick="deleteTask(this); " class="fa-solid fa-trash-can fa-shake" style="color: #FFD43B;"></i>
                </div>
            </div>
        `);
  });
};

//! reset Form
const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textareaInput.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
})();

//! Edit function for created TODO'S
const editTask = (e) => {
  let result = e.parentElement.parentElement;
  //console.log(result);
  textInput.value = result.children[0].innerHTML;
  dateInput.value = result.children[1].innerHTML;
  textareaInput.value = result.children[2].innerHTML;

  //to remove the old task after edited
  deleteTask(e);
};

//! Delete Function for created Todo's
const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};
