const form = document.querySelector("form");

function checkEmpty(e) {
  e.preventDefault(); // prevent reload
  // remove error message and margin changes from previous submissions
  document.querySelectorAll('.fieldemptyerror').forEach(e => e.remove()); 
  const inputsNodeList = document.querySelectorAll('input[type=text]');
  inputsNodeList.forEach(input => input.classList.remove("changedform"));

  // querySelectorAll returns NodeList, convert to array to use .map
  const inputsArray = Array.from(inputsNodeList);
  const inputLength = inputsArray.map(input => input.value.length);

  // if no value in field, present error message
  inputLength.forEach((length, index) => {
    if(length == 0) {
      addEmptyFieldError(inputsNodeList[index]);
    }
  })
}

function addEmptyFieldError(inputToChange) {
  // create new paragraph element with class of error and populate with error message
  const newParagraph = document.createElement("p");
  newParagraph.classList.add("fieldemptyerror");
  newParagraph.innerHTML = inputToChange.placeholder + " cannot be empty";

  // add error message, add class
  inputToChange.insertAdjacentElement('afterend', newParagraph);
  inputToChange.classList.add("changedform")
}

form.addEventListener('submit', checkEmpty);