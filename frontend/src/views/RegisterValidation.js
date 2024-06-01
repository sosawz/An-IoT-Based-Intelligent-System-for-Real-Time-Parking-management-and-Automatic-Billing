function Validation(values) {

    alert("")
    let error = {}
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/

    if(values.name === "") {
        error.name = "First name should not be empty"
    }
    else {
        error.name = ""
    }

    if(values.lastname === "") {
        error.lastname = "Last name should not be empty"
    }
    else {
        error.lastname = ""
    }

    if(values.email === "") {
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    }else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    }else {
        error.password = ""
    }

    return error;
}

export default Validation;