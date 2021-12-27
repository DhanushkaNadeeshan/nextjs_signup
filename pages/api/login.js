const jwt = require('jsonwebtoken');
import cookie from 'cookie';

export default function login(req,res){

    const {username} = req.body;
    // TODO: check user details in database and create user
    // Generate web token ,key expire in with in a day
    const key = jwt.sign({ username }, process.env.KEY , { expiresIn: '1d' });
    // set key in cookie
    var setCookie = cookie.serialize('key', key);
    res.setHeader('Set-Cookie', setCookie)

    res.status(200).json({username,msg:"success"})

}