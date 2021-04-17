var email = document.getElementById('emailInput');
var password = document.getElementById('passwordInput');
var passwordMsg = document.getElementById('errorMsgPassword');
var emailMsg = document.getElementById('errorMsgEmail');
var form = document.getElementById('loginForm');
var inputs = document.querySelectorAll('.infoInput');
var submitForm = document.getElementById('submitForm');
var expressions = {
    name: /(^[a-zA-Z\s]{6,})+$/,
    email: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9._+-]+\.[a-zA-Z]+$/,
    password: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
}
var fields = {
    email: false,
    password: false,
}

var formValidation = function(e) {
    switch (e.target.name) {
        case "email":
        if (expressions.email.test(e.target.value)) {
            emailMsg.style.display = "none";
            email.style.color = "rgb(8, 214, 18)";
            fields['email'] = true;
        }
        else {
            emailMsg.style.display = "block";
            email.style.color = "rgb(255, 2, 2)";
            fields['email'] = false;
        }
        break;
        case "password":
            if (expressions.password.test(e.target.value)) {
                passwordMsg.style.display = "none";
                password.style.color = "rgb(8, 214, 18)";
                fields['password'] = true;
            }
            else {
                passwordMsg.style.display = "block";
                password.style.color = "rgb(255, 2, 2)";
                fields['password'] = false;
            }
            break;
    }
}

var focusForm = function(e) {
    switch (e.target.name) {
        case "email":
            emailMsg.style.display = "none";
            email.style.color = "black";
        break;
        case "password":
            passwordMsg.style.display = "none";
            password.style.color = "black";
        break;
    }
}

inputs.forEach(function (input) {
    input.addEventListener('blur', formValidation);
    input.addEventListener('focus', focusForm);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    var validationDiv = document.querySelector('.validations-hidden');
    if (fields['email'] && fields['password']) {
        validationDiv.style.display = 'flex';
        validationDiv.textContent = 'Your account data is:' + " " + email.value + " " + password.value;
    }
    else {
        validationDiv.style.display = 'flex';
        validationDiv.style.color = 'red';
        validationDiv.textContent = 'Please complete all fields as required'
    }
});

    function sendLoginForm(){
        fetch('http://localhost:4000/login',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            })
        })
        .then (response => response.json())
        .then (data => console.log(data))
        .catch(function(error){
            console.log("Error trying to send the data")
        })
}
