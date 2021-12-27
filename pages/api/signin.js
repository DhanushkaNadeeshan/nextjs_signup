import { insert } from "../../lib/db.handler";
import bcrypt from "bcryptjs";

const encryptPassword = (password) => {

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
export default async function signin(req, res) {

    const { method } = req;

    switch (method) {

        case 'POST':
            const { body } = req;
            // encription password
            body.password = await encryptPassword(body.password).catch(err => console.error(err));

            if (body.password != 'fail') {

                insert(body, 'users').then(result => {
                    // TODO: check user is available
                    res.status(200).json({ msg: 'success', insertedId: result.insertedId, ...body });
                }).catch(err => {
                    console.error(err)
                    res.status(400).json({ msg: 'fail' });
                })

            } else {
                res.status(200).json({ msg: 'fail', error: "password encryption faild" });
            }

            break;
        default:
            res.status(400).json({ msg: 'fail' });
            break;
    }

}