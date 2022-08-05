const jwt = require('jsonwebtoken');
import cookie from 'cookie';

export default function login(req,res){

    const {username} = req.body;
    const { method } = req;

    // TODO: check user details in database and create user
    if(method==="POST"){
        const key = jwt.sign({ username }, process.env.KEY , { expiresIn: '1d' });
        // set key in cookie
        var setCookie = cookie.serialize('key', key);
        res.setHeader('Set-Cookie', setCookie);
        res.status(200).json({username,status:"success"});

    }else{
        res.status(400).json({status:"fail"})
    }
    // Generate web token ,key expire in with in a day

}