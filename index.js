const form = document.querySelector("form");
const email = document.querySelector("input[name=email]")

function checkEmptyField() {
  const inputsNodeList = document.querySelectorAll('input[type=text]');
  // remove margin changes from previous submission attempts
  inputsNodeList.forEach(input => input.classList.remove("changedform"));

  // querySelectorAll returns NodeList, convert to array to use .map
  const inputsArray = Array.from(inputsNodeList);
  const inputLength = inputsArray.map(input => input.value.length);

  // if no value in field, present error message
  inputLength.forEach((length, index) => {
    if(length === 0) {
      let errorPhrase = inputsNodeList[index].placeholder + " cannot be empty";
      addError(inputsNodeList[index], errorPhrase);
    }
  })
}

function checkEmailAddress() {
  /* simplistic email validation, see complexity of regex validation in this article:
  https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript?page=1&tab=scoredesc#tab-top*/
  if (email.value.length === 0) {
    return;
  }
  else {
    const pattern = /^\S+@\S+\.\S+$/;
    let result = pattern.test(email.value);
    if (result === false) {
      addError(email, "Looks like this is not an email");
      email.classList.add("incorrectemail");
    }
  }
}

function addError(inputToChange, errorMessage) {
  // create new paragraph element with class of error and populate with error message
  const newParagraph = document.createElement("p");
  newParagraph.classList.add("error");
  newParagraph.innerHTML = errorMessage
  // add error message, add class
  inputToChange.insertAdjacentElement('afterend', newParagraph);
  inputToChange.classList.add("changedform")
}

function formValidation(e) {
  e.preventDefault(); // prevent reload
  // remove error message from previous submission
  document.querySelectorAll('.error').forEach(e => e.remove());
  checkEmptyField();
  checkEmailAddress()
}

form.addEventListener('submit', formValidation);
// remove styles added to text from incorrect email, but want to remove red color on click instead of on submission
email.addEventListener('click', () => email.classList.remove("incorrectemail"))
