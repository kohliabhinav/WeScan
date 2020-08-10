const admin = require( '../firebase-service');



module.exports = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    const savedUid = process.env.JWT_KEY;

    admin.auth().verifyIdToken(token)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    if(savedUid == uid){ next(); }
    else { 
      console.log("error is unauthorized")
      return authError(res,403, "User is not authenticated."); }
  }).catch(function(error) {
    console.log("error is ",error)
    try {
    if(error.error.toLowerCase().search('expired') >= 0)  { return authError(res,401,"Token Expired"); }
    else { return authError(res,400, "Invalid token") };
    } catch(error) {return authError(res,500, "Unable to parse token")}
  });

}

function authError(res,statusCode, errorMessage) {
    res.status(statusCode).json({
        "success" : false,
        "message" : errorMessage,
        "data" : null
    })
}