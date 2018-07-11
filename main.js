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