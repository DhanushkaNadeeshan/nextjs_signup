import withAuth from "../../middleware/withAuth"


 function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}


export default withAuth(handler)