function Validation(values) {

    alert("")
    let error = {}
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    const password_pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,16}$/

    if(values.FirstName === "") {
        error.FirstName = "First name should not be empty"
    }
    else {
        error.FirstName = ""
    }

    if(values.LastName === "") {
        error.LastName = "Last name should not be empty"
    }
    else {
        error.LastName = ""
    }

    if(values.Email === "") {
        error.Email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.Email)) {
        error.Email = "Email didn't match"
    }else {
        error.Email = ""
    }

    if(values.Password === "") {
        error.Password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.Password)) {
        error.Password = "Password didn't match"
    }else {
        error.Password = ""
    }

    return error;
}

export default Validation;