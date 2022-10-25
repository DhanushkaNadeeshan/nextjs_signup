import { encryptPassword } from "../../lib/encrypt.pwd";
import dbConnect from "../../lib/db.connect";
import User from "/models/User";

export default async function signin(req, res) {

    const { method } = req;

    return new Promise(async (resolve, reject) => {

        await dbConnect();

        switch (method) {

            case 'POST':

                try {
                    const { body } = req;
                    const { password } = body;
                    // replace with encrypted password
                    body.password = await encryptPassword(password).catch(err => console.log(err));

                    const userData = await User.create(body)

                    res.status(200).json({ success: true, data: userData });

                } catch (error) {
                    res.status(400).json({ success: false, error });
                } finally {
                    resolve();

                }
                break;
            default:
                res.status(400).json({ success: false });
                resolve();
                break;
        }
    })



}