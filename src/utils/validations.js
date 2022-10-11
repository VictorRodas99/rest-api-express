export const newError = (res, msg, code = 400) => res.status(code).json({ error: msg })

export const validateData = (name, salary, ignore = true) => {
    const onlyLetters =  /^[A-Za-z]+$/
    const onlyNumbers = /^[0-9]+$/
    const existsName = Boolean(name)
    const existsSalary = Boolean(salary)
    let message = ''
    let isIncorrect;

    if(!onlyLetters.test(name)) message = "Only names with letters, please!"
    if(typeof salary !== 'number') message = "Only literal numbers are accepted!"
    if(!onlyNumbers.test(salary)) message = "Only numbers are required in the `salary` field"

    if(ignore) {
        if(!existsName || !existsSalary) message = "Must use the right keys `name` or `salary`"
    } else {
        if(!existsName && !existsSalary) message = "Must use the right keys `name` and `salary`"
        else if(!existsSalary && existsName) return { isIncorrect: false, message: "name" }
        else if(!existsName && existsSalary) return { isIncorrect: false, message: "salary" }
    }

    isIncorrect = Boolean(message)

    return { isIncorrect, message }
}

export const verifyID = id => {
    let isNotValid = false
    let message = ''

    id = parseInt(id)
    if(isNaN(id)) {
        isNotValid = true
        message = "The id must be a number!"
    }

    return { isNotValid, message }
}