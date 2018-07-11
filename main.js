// focussing input-box on opening the page
var inputVal = document.getElementById('input')
inputVal.focus();
// allowing enter key to add task
inputVal.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("adding").click();
  }
});

var todos = [];


function addTask() {
  var d = new Date()

  var inputVal = document.getElementById('input')
  // if (checkInputText(inputVal.value.trim(), "Please enter a task")) return;
  var todo = { id: d.getTime(), value: inputVal.value }
  todos.push(todo)
  // store.setItem(todo.id, todo.value);
  // firebaseRef.child(todo.id).set(todo.value)
  // console.log(store)

  createElements(todo);
  inputVal.value = ''
  inputVal.focus();
}

function createElements(todo) {
  var itemRow = document.createElement("div");
  itemRow.className = "row alert alert-secondary";
  itemRow.style = "margin-bottom: 0px"
  itemRow.id = todo.id

  // var itemColoumn = createItemRow(itemRow, todo.value)
  // var btnbtn = createDeleteButton(itemRow, todo.id)
  // itemRow.appendChild(btnbtn)
  // createEditButton(itemRow, itemColoumn, todo, btnbtn)
  document.getElementById("list-items").appendChild(itemRow)
}