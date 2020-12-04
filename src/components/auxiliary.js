export function correctAnswer({quizes, indexQuiz}, index) {
    return index === (quizes[indexQuiz].rightAnswer - 1)
}

export function validation(value, passwordValid, minLength) {
    return passwordValid
        ? ''
        : `Password must be at least ${minLength}, now password is ${value} characters`
}

export function arrayFill(length, callback) {
    new Array(length).fill(' ').map((_, index) => callback(index))
}

export function checkErrorControls(controls) {
    const errors = controls.find(answer => !answer.value.length)
    return errors ? 'Заполните все поля' : ''
}
