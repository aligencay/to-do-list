const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === '' || inputBox.value.trim() === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You cannot add an empty task!',
          })
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add("delete");
        li.appendChild(span);
        
        let edit = document.createElement("span");
        edit.innerHTML = "✎";
        edit.classList.add("edit");
        li.appendChild(edit);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
        saveData();
    }
    else if(e.target.classList.contains("edit")){
        editTask(e);
    }
}, false);

inputBox.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showList(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function editTask(event){
    let listItem = event.target.parentElement;
    let taskSpan = listItem.firstChild;

    let newTaskText = prompt("Edit your task below", taskSpan.textContent);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskSpan.textContent = newTaskText;
        saveData();
    }
}

showList();