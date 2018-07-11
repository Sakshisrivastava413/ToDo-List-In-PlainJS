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

  var itemColoumn = createItemRow(itemRow, todo.value)
  var btnbtn = createDeleteButton(itemRow, todo.id)
  itemRow.appendChild(btnbtn)
  // createEditButton(itemRow, itemColoumn, todo, btnbtn)
  document.getElementById("list-items").appendChild(itemRow)
}

function createItemRow(itemRow, value) {
  var itemColoumn = document.createElement("div");
  itemColoumn.className = "col-sm-9";
  var item = document.createElement("h5");
  // item.id = "item"
  item.appendChild(document.createTextNode(value))
  itemColoumn.appendChild(item)
  itemRow.appendChild(itemColoumn)
  return itemColoumn;
}

function createDeleteButton(itemRow, id) {
  // var d = new Date
  // var getId=d.getTime()
  var btnDiv = document.createElement("div");
  btnDiv.id = id
  btnDiv.className = "col-sm";
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn btn-secondary btn-sm btn-block";

  btnDiv.appendChild(btn);
  btn.appendChild(document.createTextNode("Delete"));

  btnDiv.addEventListener("click", function (e) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == id) {
        console.log(todos[i].id)
        todos.splice(i, 1);
        // firebaseRef.child(id).remove()
        break;
      }
    }
    console.log("after: ", todos)
    itemRow.remove(e.path[2])
    // localStorage.removeItem(id);


  });
  return btnDiv;
}
