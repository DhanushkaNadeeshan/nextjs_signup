import bcrypt from "bcryptjs";

export function encryptPassword(password) {

    return new Promise((resolve, reject) => {

        bcrypt.genSalt(10, function (err, Salt) {

            // The bcrypt is used for encrypting password.
            bcrypt.hash(password, Salt, function (err, hash) {

                if (err) {
                    reject(err)
                }

                resolve(hash)


            })
        })

    })

}

export function validationPassword(passowrd, hashPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passowrd, hashPassword, function (err, res) {
            if (err) {
                reject(err)
                throw err;
            }

            resolve(res)
        })
    })
}

// export  encryptPassword;