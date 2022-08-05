import withAuth from "../../middleware/withAuth"


 function handler(req, res) {
  res.status(200).json({ status:'success',msg: 'API is secured with authentication' })
}


export default withAuth(handler)