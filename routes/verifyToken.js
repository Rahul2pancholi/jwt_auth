const jwt = require('jsonwebtoken');

module.exports = function (req,res,next)
{
const token = req.header("AUTH-TOKEN");
if(!token) return res.status(401).send('Access Denied');

try{
    const verified = jwt.verify(token,process.env.SECRET_CODE);
    req.user=verified;
    next();

}
catch(e)
{
    res.status(400).send("Invali token")

}
}