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

    return new Promise(async (resolve,reject)=>{

            switch (method) {
        
                case 'POST':
    
                    const { body } = req;
                    // encription password
                    body.password = await encryptPassword(body.password).catch(err => console.error(err));
        
                    if (body.password != 'fail') {
                        // insert user data
                        insert(body, 'users').then(result => {
                            // TODO: check user is available
    
                            // remove password
                            delete body.password;
                            // return data
                            res.status(200).json({ status: 'success', insertedId: result.insertedId, ...body });
                            resolve();
        
                        }).catch(err => {
    
                            console.error(err)
                            res.status(400).json({ status: 'fail' });
                            resolve();
                        })
        
                    } else {
                        res.status(200).json({ status: 'fail', msg: "password encryption faild" });
                        resolve();
                    }
        
                    break;
                default:
                    res.status(400).json({ status: 'fail' });
                    resolve();
                    break;
            }
    })
 


}