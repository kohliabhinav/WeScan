const admin = require('../firebase-service')
const dotenv = require("dotenv");
const e = require('express');
dotenv.config();

const db = admin.firestore()


exports.loginUser = async (req, res, next) => {

    try {

        let number = req.params.mobileNumber;

        const token = await admin.auth().createCustomToken(process.env.JWT_KEY)

        const userRef = db.collection("Users").doc(number);

        await db.runTransaction(async (t) => {
            const userSnapshot = await t.get(userRef);

            if (!userSnapshot.exists) {
                return res.status(422).json({
                    success: false,
                    message: "User with this phone number doesn't exist",
                    data: null
                })
            }

            t.update(userRef, {userType : "checked-in"})

            return res.status(200).json({
                success: true,
                message: "Login SuccessFul",
                token: token,
                data: getUserDetailsJson(userSnapshot)[0]
            })
        })

    } catch (error) {
        console.log("error, " + error)
        return res.status(500).json({
            success: false,
            message: "Unable to Login. Please try again!",
            data: null
        });
    }
}


function getUserDetailsJson(user) {
    var docs = []
    user.forEach(userDoc => {

        let userJson = {
            "id": userDoc.id,
            "fullName": userDoc.data().name,
            "phoneNumber": userDoc.data().phoneNumber,
            "userType" : userDoc.data().userType
        }

        docs.push(userJson)
    })
    return docs
}






exports.createUser = async (req, res, next) => {
    const usersRef = db.collection('Users');
    const token = await admin.auth().createCustomToken(process.env.JWT_KEY)
    const user = await usersRef.add({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        userType: req.body.userType,
        status: "checked-in"

    }).then(function (docRef) {

        res.status(200).json({
            success: true,
            message: "Signed up Successfully",
            token: token,
            data: getUser(docRef.id, req.body)
        });
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            res.status(500).json({
                success: false,
                message: "Unable to Signup! Please try again",
                data: null
            })
        });
}

function getUser(id, userBody) {
    let user = {
        "id": id,
        "fullName": userBody.name,
        "phoneNumber": userBody.phoneNumber,
        "userType": userBody.userType
    }



    return user
}


exports.checkout = async(req,res,next) => {
    try {
        let number = req.params.mobileNumber;

        const userRef = db.collection("Users").doc(number);

        await db.runTransaction(async (t) => {
            const userSnapshot = await t.get(userRef);

            if (!userSnapshot.exists) {
                return res.status(422).json({
                    success: false,
                    message: "User with this phone number doesn't exist",
                    data: null
                })
            }

            t.update(userRef, {userType : "checked-out"})

            return res.status(200).json({
                success: true,
                message: "Success",
                data: "Checked-out Successfully"
            })
        })

    } catch (error) {
        console.log("error, " + error)
        return res.status(500).json({
            success: false,
            message: "Unable to checkout. Please try again!",
            data: null
        });
    }

 
}




