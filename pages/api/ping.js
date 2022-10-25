import cookie from 'cookie';

export default function ping(req,res) {
    
    var setCookie = cookie.serialize('ping', 'dmpong',{path:'/'});
    res.setHeader('Set-Cookie', setCookie);
    res.status(200).json({ success: true});
}