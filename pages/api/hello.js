import withAuth from "../../middleware/withAuth"

function handler(req, res) {
  res.status(200).json({ success: true, msg: 'API is secured with jwt authentication' })
}


export default withAuth(handler)