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

var questionState = {
    isValid: false,
    errorBODY: "",
    errorANSWER_A: "",
    errorANSWER_B: "",
    errorANSWER_C: "",
    errorANSWER_D: "",
    errorANSWER_PROPER: "",
    errorCATEGORY: "",
}

var findResultState = {
    isValid: false,
    "errorLOGIN": ""
}

class Validation {

    static registerFormValidation = (login, password, password2, type, userKey) => {
        login === "" ? registerState.errorLOGIN = "Login cannot be empty!" : registerState.errorLOGIN = "";
        login.length < 5 ? registerState.errorLOGIN = "Login should be at least 5 characters long!" : registerState.errorLOGIN = "";
        password === "" ? registerState.errorPASSWORD = "Password cannot be empty!" : registerState.errorPASSWORD = "";
        password.length < 5 ? registerState.errorPASSWORD = "Password should be at least 5 characters long!" : registerState.errorPASSWORD = "";
        password2 !== password ? registerState.errorPASSWORD2 = "Passwords don't match!" : registerState.errorPASSWORD2 = "";
        type === "" ? registerState.errorTYPE = "Choose account type!" : registerState.errorTYPE = "";
        registerState.errorLOGIN === "" && registerState.errorPASSWORD === "" && registerState.errorPASSWORD2 === "" && registerState.errorTYPE === "" ? registerState.isValid = true : registerState.isValid = false
        return registerState;
    }

    static loginFormValidation = (login, password) => {
        login === "" ? loginState.errorLOGIN = "Login cannot be empty!" : loginState.errorLOGIN = "";
        password === "" ? loginState.errorPASSWORD = "Password cannot be empty!" : loginState.errorPASSWORD = "";
        login !== "" && password !== "" ? loginState.isValid = true : loginState.isValid = false
        return loginState;
    }

    static teacherFormValidation = (amount, category) => {
        amount === "" ? teacherState.errorAMOUNT = "This field cannot be empty!" : isNaN(amount) ? teacherState.errorAMOUNT = "You cannot give letters here!" : teacherState.errorAMOUNT = "";
        category === "" ? teacherState.errorCATEGORY = "You must choose category!" : teacherState.errorCATEGORY = "";
        teacherState.errorAMOUNT === "" && teacherState.errorCATEGORY === "" ? teacherState.isValid = true : teacherState.isValid = false;
        return teacherState;
    }

    static newQuestionValidation = (body, answerA, answerB, answerC, answerD, properAnswer, category) => {
        body === "" ? questionState.errorBODY = "Question cannot be empty!" : questionState.errorBODY = "";
        answerA === "" ? questionState.errorANSWER_A = "This answer cannot be empty!" : questionState.errorANSWER_A = "";
        answerB === "" ? questionState.errorANSWER_B = "This answer cannot be empty!" : questionState.errorANSWER_B = "";
        answerC === "" ? questionState.errorANSWER_C = "This answer cannot be empty!" : questionState.errorANSWER_C = "";
        answerD === "" ? questionState.errorANSWER_D = "This answer cannot be empty!" : questionState.errorANSWER_D = "";
        properAnswer === "" ? questionState.errorANSWER_PROPER = "Question must have its answer!" : questionState.errorANSWER_PROPER = "";
        category === "" ? questionState.errorCATEGORY = "Choose category!" : questionState.errorCATEGORY = "";
        body !== "" && answerA !== "" && answerB !== "" && answerC !== "" && answerD !== "" && properAnswer !== "" && category !== "" ? questionState.isValid = true : questionState.isValid = false
        return questionState;
    }

    static findResultValidation = (login) => {
        login !== "" ? findResultState.errorLOGIN = "" : findResultState.errorLOGIN = "Type your student login!"
        findResultState.errorLOGIN === "" ? findResultState.isValid = true : findResultState.isValid = false;
        return findResultState;
    }

}

export default Validation