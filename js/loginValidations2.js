//Form
var form = document.getElementById('loginForm');
var inputs = document.getElementsByClassName('infoInput');
var fields = {
    email:false,
    password: false,
}
//Email
document.getElementById('emailInput').addEventListener('blur', emailValidation);

function emailValidation(){
    var emailRegE = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9._+-]+\.[a-zA-Z]+$/
    var email = document.querySelector('#emailInput');
    var emailValue = document.querySelector('#emailInput').value;
    var emailMsg = document.getElementById('errorMsgEmail');
    if(emailValue.match(emailRegE)) {
        email.style.border = '3px solid green';
        emailMsg.style.display = 'none';
        fields['email'] = true;
    }else{
        email.style.border = '3px solid red';
        emailMsg.style.display = 'block';
        fields['email'] = false;
    }
}

document.getElementById('emailInput').addEventListener('focus', clearEmail);
function clearEmail () {
    var emailFocus = document.getElementById('emailInput');
    var emailMsgFocus = document.getElementById('errorMsgEmail');
    emailFocus.value= '';
    emailMsgFocus.style.display= 'none';
}
//password
document.getElementById('passwordInput').addEventListener('blur', passwordValidation);
function passwordValidation(){
    var passwordRegE = /(^[a-zA-Z0-9]{8,})$/
    var password = document.querySelector('#passwordInput');
    var passwordValue = document.querySelector('#passwordInput').value;
    var passwordMsg = document.getElementById('errorMsgPassword');
    if(passwordValue.match(passwordRegE)) {
        password.style.border = '3px solid green';
        passwordMsg.style.display = 'none';
        fields['password'] = true;
    }else{
        password.style.border = '3px solid red';
        passwordMsg.style.display = 'block';
        fields['password'] = false;
    }
}
document.getElementById('passwordInput').addEventListener('focus', clearPassword);
function clearPassword () {
    var passwordFocus = document.getElementById('passwordInput');
    var passwordMsgFocus = document.getElementById('errorMsgPassword');
    passwordFocus.value= '';
    passwordMsgFocus.style.display= 'none';
}

form.addEventListener('submit', function(e) {
    e.preventDefault ();
var button = document.getElementById('submitForm');
button.addEventListener('click', validations);
var validations = document.getElementById('validationsDiv');
var emailValue = document.querySelector('#emailInput').value;
var passwordValue = document.querySelector('#passwordInput').value;
if (fields['email'] && fields ['password']) {
    validations.style.display = 'flex';
    validations.innerHTML = 'Your login data is:' + " " + emailValue + " " + passwordValue;
    sendLoginForm();
} else {
    validations.style.display = 'flex';
    validations.innerHTML = 'Email or Password values are wrong. Please try again'
    }
});
function sendLoginForm(){
    var emailValue = document.querySelector('#emailInput').value;
    var passwordValue = document.querySelector('#passwordInput').value;
    fetch('http://localhost:4000/login',{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            email:emailValue,
            password: passwordValue,
        })
    })
    .then (response => response.json())
    .then (data => console.log(data))
    .catch(function(error){
        console.log('Error trying to send the data')
    })
}
