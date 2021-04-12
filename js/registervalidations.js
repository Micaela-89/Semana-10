// Formulario
var form = document.getElementById('registerForm');
var inputs = document.querySelectorAll('.infoInput');

// inputs
var nameInput = document.getElementById('nameInput');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var confirmPassInput = document.getElementById('confirmPassInput');

// mensajes de error
var nameMsg = document.getElementById('errorMsgName');
var emailMsg = document.getElementById('errorMsgEmail');
var passwordMsg = document.getElementById('errorMsgPassword');
var confirmPassMsg = document.getElementById('errorMsgConfirmPass');

//labels
var nameLabel = document.getElementById('name')
var emailLabel = document.getElementById('eMail');
var passwordLabel = document.getElementById('password');
var confirmPassLabel = document.getElementById('confirmPass');

var expressions = {
	name: /(^[a-zA-Z\s]{6,})+$/,
    email:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	password:/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
}

var fields = {
    name: false,
    email: false,
    password: false,
    confirmPass: false,
}

var formValidation = function (e) {
    switch(e.target.name) {
        case "name":
            if (expressions.name.test(e.target.value)) {
                nameMsg.style.display = "none";
                nameInput.style.color = "rgb(8, 214, 18)";
                fields['name'] = true;
            }
            else {
                nameMsg.style.display = "block";
                nameInput.style.color = "rgb(255, 2, 2)";
                fields['name']= false;
            }
            break;
        case "email":
            if (expressions.email.test(e.target.value)) {
                emailMsg.style.display = "none";
                emailInput.style.color = "rgb(8, 214, 18)";
                fields['email'] = true;
            }
            else {
                emailMsg.style.display = "block";
                emailInput.style.color = "rgb(255, 2, 2)";
                fields['email'] = false;
            }
            break;
        case "password":
            if (expressions.password.test(e.target.value)) {
                passwordMsg.style.display = "none";
                passwordInput.style.color = "rgb(8, 214, 18)";
				fields['password'] = true;
            }
            else {
                passwordMsg.style.display = "block";
				passwordInput.style.color = "rgb(255, 2, 2)";
				fields['password'] = false;
            }
            break;
        case "confirmPass":
            if (e.target.value == password.value) {
                confirmPassMsg.style.display = "none";
                confirmPassInput.style.color = "rgb(8, 214, 18)";
                fields['confirmPass'] = true;
            }
            else {
				confirmPassMsg.style.display = "block";
                confirmPassInput.style.color = "rgb(255, 2, 2)";
                fields['confirmPass'] = false;
            }
    }
}

var focusForm = function(e) {
    switch (e.target.name) {
        case "name":
			nameMsg.style.display = "none";
            nameInput.style.color = "black";
            break;
        case "email":
            emailMsg.style.display = "none";
            emailInput.style.color = "black";
            break;
        case "password":
			passwordMsg.style.display = "none";
            passwordInput.style.color = "black";
            break;
        case "confirmPass":
            confirmPassMsg.style.display = "none";
            confirmPassInput.style.color = "black";
    }
}

inputs.forEach(function(input){
    input.addEventListener('blur', formValidation);
    input.addEventListener('focus', focusForm);
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    var validationDiv = document.querySelector('.validations-hidden');
    if (fields['name'] && fields['email'] && fields['password'] && fields['confirmPass']) {
	validationDiv.style.display = 'block';
    validationDiv.textContent = 'Your account data is:' + " " + nameInput.value +
    " " + emailInput.value + " " + passwordInput.value + " " + confirmPassInput.value;
    fetch(`https://jsonplaceholder.typicode.com/users?email=${email.value}`)
    .then (response => response.json())
    .then (data => console.log(data));
    }
    else {
        validationDiv.style.display = 'flex';
        validationDiv.style.color = 'red';
        validationDiv.textContent = 'Please complete all fields as required'
    }
})
