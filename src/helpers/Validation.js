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
    errorIMAGEURL: "",
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
        amount !== "" && category !== "" ? teacherState.isValid = true : teacherState.isValid = false
        return teacherState;
    }

    static newQuestionValidation = (body, answerA, answerB, answerC, answerD, properAnswer, category, imageUrl) => {
        body === "" ? questionState.errorBODY = "Question cannot be empty!" : questionState.errorBODY = "";
        answerA === "" ? questionState.errorANSWER_A = "This answer cannot be empty!" : questionState.errorANSWER_A = "";
        answerB === "" ? questionState.errorANSWER_B = "This answer cannot be empty!" : questionState.errorANSWER_B = "";
        answerC === "" ? questionState.errorANSWER_C = "This answer cannot be empty!" : questionState.errorANSWER_C = "";
        answerD === "" ? questionState.errorANSWER_D = "This answer cannot be empty!" : questionState.errorANSWER_D = "";
        properAnswer === "" ? questionState.errorANSWER_PROPER = "Question must have its answer!" : questionState.errorANSWER_PROPER = "";
        category === "" ? questionState.errorCATEGORY = "Choose category!" : questionState.errorCATEGORY = "";
        imageUrl === "" ? questionState.errorIMAGEURL = "" : !imageUrl.startsWith("img/") ? questionState.errorIMAGEURL = "Image url have to starts with img/ (example: img/question1.png)" : imageUrl.startsWith("img/") && imageUrl.length < 8 ? questionState.errorIMAGEURL = "Type proper image url!" : imageUrl.startsWith("img/") && imageUrl.length > 8 && (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png')) ? questionState.errorIMAGEURL = "" : questionState.errorIMAGEURL = "Type proper image url!";
        body !== "" && answerA !== "" && answerB !== "" && answerC !== "" && answerD !== "" && properAnswer !== "" && category !== "" && ((imageUrl !== "" && imageUrl.startsWith('img/') && imageUrl.length > 8 && (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png'))) || imageUrl === "") ? questionState.isValid = true : questionState.isValid = false
        return questionState
    }

}

export default Validation