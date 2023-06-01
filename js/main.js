let input = document.querySelector(".input");

let submit = document.querySelector(".add");

let taskdiv = document.querySelector(".tasks");
console.log(input);
console.log(submit);
console.log(taskdiv);
//empty array to save tasks
let arrayoftask = [];
//check if task in local storage
if (localStorage.getItem("tasks")) {
  arrayoftask = JSON.parse(localStorage.getItem("tasks"));
}
//get data from local storage
getfromlocalstorage();
//add task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); //add task
    input.value = ""; //empty input
  }
};
function addTaskToArray(text) {
  const task = {
    id: Date.now(),
    title: text,
    completed: false,
  };
  //push
  arrayoftask.push(task);
  console.log(arrayoftask);
  //add task to page
  addElementtopage(arrayoftask);
  //add tasks to local storage
  addtolocalstorage(arrayoftask);
  console.log(arrayoftask);
  console.log(JSON.stringify(arrayoftask));
}
//add to page
function addElementtopage(arrayoftask) {
  taskdiv.innerHTML = "";
  arrayoftask.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    //cheak if task is done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("id", task.id);
    div.appendChild(document.createTextNode(task.title));

    console.log(div);
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    console.log(div);
    //add task div to main taskdiv
    taskdiv.appendChild(div);
  });
}
function addtolocalstorage(arrayoftask) {
  localStorage.setItem("tasks", JSON.stringify(arrayoftask));
}
function getfromlocalstorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementtopage(tasks);
    console.log(data);
  }
}
taskdiv.addEventListener("click",(el) => {
  if(el.target.classList.contains("del")){
    //delete form page
    el.target.parentElement.remove();
    //delete from local storage
    deletetask(el.target.parentElement.getAttribute("id"));
  }
});
function deletetask(taskid){
  arrayoftask=arrayoftask.filter((task)=> task.id != taskid)
  addtolocalstorage(arrayoftask);
}