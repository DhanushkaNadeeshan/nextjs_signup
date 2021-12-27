const jwt = require('jsonwebtoken');

const withAuth = (handler) => {

    return async (req, res) => {

        const { cookies } = req

        if (cookies.key) {

            jwt.verify(cookies.key, process.env.KEY, function (err, decoded) {

                if (err) {
                    console.log("🚀 ~ file: withAuth.js ~ line 12 ~ err", err)
                    return res.status(405).json({ msg: "fail" })
                }
                handler(req, res)
            });

        } else {
            return res.status(405).json({ msg: "fail" })
        }

    }
}

export default withAuth;