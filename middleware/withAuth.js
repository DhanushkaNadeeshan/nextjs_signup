import { jwtVerify } from 'jose';

const withAuth = (handler) => {

    return async (req, res) => {

        const { cookies } = req
        // check cookie key is avilable
        if (cookies.key) {

            try {
                await jwtVerify(cookies.key, new TextEncoder().encode(process.env.KEY));
                handler(req, res)
            } catch (error) {
                return res.status(405).json({ success: false })
            }

        } else {
            return res.status(405).json({ success: false })
        }

    }
}

export default withAuth;