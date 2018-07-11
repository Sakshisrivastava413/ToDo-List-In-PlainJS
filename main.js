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

var store = window.localStorage;
for (var i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem(localStorage.key(i)));
  console.log(localStorage.key(i))
  var task = {
    id: localStorage.key(i),
    value: localStorage.getItem(localStorage.key(i))
  }
  todos.push(task)
  console.log(task)
  createElements(task)
  console.log(todos)
}



function addTask() {
  var d = new Date()

  var inputVal = document.getElementById('input')
  if (checkInputText(inputVal.value.trim(), "Please enter a task")) return;
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
  createEditButton(itemRow, itemColoumn, todo, btnbtn)
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
    localStorage.removeItem(id);


  });
  return btnDiv;
}

function createEditButton(itemRow, itemCol, todo, btnbtn) {
  var btnDiv = document.createElement("div");
  btnDiv.className = "col-sm"
  itemRow.appendChild(btnDiv)
  var btn = document.createElement("button")
  btn.type = "button"
  btn.className = "btn btn-secondary btn-sm btn-block"
  btn.id = todo.id
  console.log(itemRow);

  btnDiv.appendChild(btn)
  btn.appendChild(document.createTextNode("Edit"));

  btnDiv.addEventListener("click", function (e) {
    console.log(e)
    var t = createInput(todo)
    var s = save(todo, itemRow, t, itemCol, btnbtn)
    var c = cancel(itemRow, itemCol, t)
    itemRow.replaceChild(t, itemCol);
    itemRow.replaceChild(s, btnbtn);
    itemRow.replaceChild(c, btnDiv);
    console.log(itemRow)
    t.focus();
  })
}

function createInput(todo) {
  var i = document.createElement("input")
  i.type = "text"
  i.placeholder = "Edit task..."
  i.id = todo.id
  i.value = todo.value;
  i.className = "col-sm-9 form-control mx-3"
  return i
}

function save(todo, itemRow, newInputRef, itemCol, btnbtn) {
  var saveBtn = document.createElement("button")
  saveBtn.type = "button";
  saveBtn.className = "col-sm btn btn-secondary btn-sm btn-block mx-3 my-1"
  saveBtn.id = todo.id
  saveBtn.appendChild(document.createTextNode("Save"));
  saveBtn.addEventListener("click", (e) => {
    // console.log(e)
    // console.log(e.path[1])
    console.log(newInputRef.value);


    // console.log(todos[0].todo)
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id == saveBtn.id) {
        todos[i].value = newInputRef.value
        console.log(todos[i].value)
        localStorage.setItem(saveBtn.id, todos[i].value)
        // firebaseRef.child(saveBtn.id).set(todos[i].value);

        // console.log("rty", e.target.value)
        break;
      }
    }
    console.log(todos)
    console.log(newInputRef)
    // itemCol.appendChild(document.createTextNode(newInputRef.value))

    itemRow.replaceChild(itemCol.appendChild(document.createTextNode(newInputRef.value)), newInputRef);
    // itemRow.replaceChild(btnbtn, s);
    // itemRow.replaceChild(btnDiv, c);

  })
  return saveBtn
}

function cancel(itemRow, itemCol, t) {
  var cancelBtn = document.createElement("button")
  cancelBtn.type = "button";
  cancelBtn.className = "col-sm btn btn-secondary btn-sm btn-block mx-3 my-1"
  cancelBtn.appendChild(document.createTextNode("Cancel"));
  cancelBtn.addEventListener("click", () => {
    // createItemRow(itemRow, value)
    itemRow.replaceChild(itemCol, t);
    // console.log(document.getElementById("ji"))    

  })
  return cancelBtn
}


function checkInputText(value, msg) {
  if (value == null || value == "") {
    alert(msg);
    return true;
  }
  return false;
}