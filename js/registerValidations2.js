// form
var registerForm = document.getElementById('registerForm');
var inputs = document.getElementsByClassName('infoInput');
var fields = {
    name: false,
    email:false,
    password: false,
    password2: false,
}
// fullName
document.getElementById('nameInput').addEventListener('blur', nameValidation);
function nameValidation(){
    var fName = /^[a-zA-ZáéíóúÑñ]+(?:\s[a-zA-ZáéíóúÑñ]+)+$/
    var nameInput = document.getElementById('nameInput');
    var nameValue = document.getElementById('nameInput').value;
    var nameMsg = document.getElementById('errorMsgName');
    if(nameValue.match(fName)) {
        nameInput.style.border = '3px solid green';
        nameMsg.style.display = 'none';
        fields['name'] = true;
    }else{
        nameInput.style.border = '3px solid red';
        nameMsg.style.display = 'block';
        fields['name'] = false;
    }
}
document.getElementById('nameInput').addEventListener('focus', clearName);
function clearName () {
    var nameInput = document.getElementById('nameInput');
    var nameMsg = document.getElementById('errorMsgName');
    nameInput.value= '';
    nameMsg.style.display= 'none';
    }
// email
document.getElementById('emailInput').addEventListener('blur', emailValidation);
function emailValidation(){
    var eMail = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9._+-]+\.[a-zA-Z]+$/
    var email = document.querySelector('#emailInput');
    var emailValue = document.querySelector('#emailInput').value;
    var emailMsg = document.getElementById('errorMsgEmail');
    if(emailValue.match(eMail)) {
        email.style.border = '3px solid green';
        emailMsg.style.display = 'none';
        fields['email'] = true;
    }else{
        email.style.border = '3px solid red';
        emailMsg.style.display = 'block';
        fields['name'] = false;
    }
}
document.getElementById('emailInput').addEventListener('focus', clearEmail);
function clearEmail () {
    var emailFocus = document.getElementById('emailInput');
    var emailMsg = document.getElementById('errorMsgEmail');
    emailFocus.value= '';
    emailMsg.style.display= 'none';
    }
//password
document.getElementById('passwordInput').addEventListener('blur', passwordValidation);
function passwordValidation(){
    var passWord = /(^[a-zA-Z0-9]{8,})$/
    var password = document.getElementById('passwordInput');
    var passwordValue = document.getElementById('passwordInput').value;
    var passwordMsg = document.getElementById('errorMsgPassword');
    if(passwordValue.match(passWord)) {
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
    var passwordMsg = document.getElementById('errorMsgPassword');
    passwordFocus.value= '';
    passwordMsg.style.display= 'none';
    }
//Repeat password
document.getElementById('confirmPassInput').addEventListener('blur', confirmPassValidation);
function confirmPassValidation(){
    var confirmPassword = document.getElementById('confirmPassInput');
    var passwordValue = document.getElementById('passwordInput').value;
    var confirmPasswordValue = document.getElementById('confirmPassInput').value;
    var confirmPasswordMsg = document.getElementById('errorMsgConfirmPass');
    if(confirmPasswordValue == passwordValue) {
        confirmPassword.style.border = '3px solid green';
        confirmPasswordMsg.style.display = 'none';
        fields['password2'] = true;
    }else{
        confirmPassword.style.border = '3px solid red';
        confirmPasswordMsg.style.display = 'block';
        fields['password2'] = false;
    }
document.getElementById('confirmPassInput').addEventListener('focus', clearPassword2);
function clearPassword2 () {
    var confirmPasswordFocus = document.getElementById('confirmPassInput');
    var password2MsgFocus = document.getElementById('errorMsgConfirmPass');
    confirmPasswordFocus.value= '';
    password2MsgFocus.style.display= 'none';
    }
};
registerForm.addEventListener('submit', function(e) {
    e.preventDefault ();
    var button = document.getElementById('submitForm');
    button.addEventListener('click', validations);
    var validations = document.getElementById('validationsDiv');
    var nameInput = document.getElementById('nameInput');
    var email = document.getElementById('emailInput');
    var password = document.getElementById('passwordInput');
    if (fields ['name'] && fields ['email'] && fields ['password'] && fields ['password2']) {
    validations.style.display = 'flex';
    validations.innerHTML = 'Registration process successful. Your user data is:' + " " + nameInput.value + " " + email.value + " " + password.value;
    sendRegForm()
    } else {
    validations.style.display = 'flex';
    validations.innerHTML = 'Registration process failed. Please check your data and try again'
    }
})
function sendRegForm(){
    var nameInput = document.getElementById('nameInput');
    var email = document.getElementById('emailInput');
    var password = document.getElementById('passwordInput');
    fetch('http://localhost:4000/register',{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            name: nameInput.value,
            email:email.value,
            password: password.value,
        })
    })
    .then (response => response.json())
    .then (data => console.log(data))
    .catch(function(error){
        console.log('Error trying to send the data')
    })
}