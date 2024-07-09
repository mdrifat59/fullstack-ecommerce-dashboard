function passwordValidation (password){
    let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    return pattern.test(password)
}

module.exports = passwordValidation

 