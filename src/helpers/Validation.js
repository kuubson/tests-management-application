var registerState = {
    isValid: false,
    errorLOGIN: "",
    errorPASSWORD: "",
    errorPASSWORD2: "",
    errorTYPE: "",
    errorUSERKEY: ""
}

var loginState = {
    isValid: false,
    errorLOGIN: "",
    errorPASSWORD: "",
}

var teacherState = {
    isValid: false,
    errorAMOUNT: "",
    errorCATEGORY: ""
}

class Validation {

    static registerFormValidation = (login, password, password2, type, userKey) => {
        login === "" ? registerState.errorLOGIN = "Login cannot be empty!" : registerState.errorLOGIN = "";
        login.length < 5 ? registerState.errorLOGIN = "Login should be at least 5 characters long!" : registerState.errorLOGIN = "";
        password === "" ? registerState.errorPASSWORD = "Password cannot be empty!" : registerState.errorPASSWORD = "";
        password.length < 5 ? registerState.errorPASSWORD = "Password should be at least 5 characters long!" : registerState.errorPASSWORD = "";
        password2 !== password ? registerState.errorPASSWORD2 = "Passwords don't match!" : registerState.errorPASSWORD2 = "";
        type === "" ? registerState.errorTYPE = "Choose account type!" : registerState.errorTYPE = "";
        userKey === "" ? registerState.errorUSERKEY = "User key cannot be empty!" : registerState.errorUSERKEY = "";
        login !== "" && login.length >= 5 && password !== "" && password.length >= 5 && password2 === password && type !== "" && userKey !== "" ? registerState.isValid = true : registerState.isValid = false
        return registerState;
    }

    static loginFormValidation = (login, password) => {
        login === "" ? loginState.errorLOGIN = "Login cannot be empty!" : loginState.errorLOGIN = "";
        password === "" ? loginState.errorPASSWORD = "Password cannot be empty!" : loginState.errorPASSWORD = "";
        login !== "" && password !== "" ? loginState.isValid = true : loginState.isValid = false
        return loginState;
    }

    static teacherFormValidation = (amount, category) => {
        amount === "" ? teacherState.errorAMOUNT = "This field cannot be empty!" : teacherState.errorAMOUNT = "";
        category === "" ? teacherState.errorCATEGORY = "You must choose category!" : teacherState.errorCATEGORY = "";
        amount !== "" && category !== "" ? teacherState.isValid = true : loginState.isValid = false
        return teacherState;
    }

}

export default Validation