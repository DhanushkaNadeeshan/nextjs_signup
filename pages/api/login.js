import cookie from 'cookie';
import dbConnect from "../../lib/db.connect";
import User from "/models/User";
import { validationPassword } from '../../lib/encrypt.pwd';
import { SignJWT } from 'jose';

const KEY_EXPIRES_IN = '6h';

export default async function login(req, res) {

    const { method } = req;

    if (method === "POST") {

        await dbConnect();
        const { userName, password } = req.body;
        try {
            const user = await User.findOne({ userName });
            if (!user) {
                console.log("user unable to find")
                res.status(400).json({ success: false, msg: "Validation Fail" })
                return;
            }
            // validation password
            const isValid = await validationPassword(password, user.password);

            if (isValid) {

                const { _id, role } = user;
                const iat = Math.floor(Date.now() / 1000);
                // create jwt token
                const key = await new SignJWT({ role })
                    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                    .setExpirationTime(KEY_EXPIRES_IN)
                    .setIssuedAt(iat)
                    .setNotBefore(iat)
                    .sign(new TextEncoder().encode(process.env.KEY));

                // set key in cookie
                var setCookie = cookie.serialize('key', key, { path: "/" });
                res.setHeader('Set-Cookie', setCookie);
                res.status(200).json({ success: true, data: { role, userName, _id } });


            } else {
                res.status(400).json({ success: false, msg: "Validation Fail" })
            }
        } catch (error) {
            res.status(400).json({ success: false })
            throw error

        }



    } else {
        res.status(400).json({ success: false })
    }
    // Generate web token ,key expire in with in a day

}