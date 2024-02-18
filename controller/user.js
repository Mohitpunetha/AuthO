const userManager = require("../manager/user");
const authService=require("../services/authservices")

module.exports.successGoogleLogin = async (req, res) => {
    try {
        const searchQuery = {
            where: {
                email: req.user.email,
            },
        };

        const existingUser = await userManager.getUserDetail(searchQuery);
        console.log('Existing User:', existingUser);

        if (!existingUser) {
            return res.status(404).json({message:"User doesnot exist"})
           
        } else {
            let token =authService.generateAuthToken(existingUser);
            return res.status(200).json({ message: "Login successful", data: existingUser, token: token });
        }
    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};  



// module.exports.loginGoogle = async (req, res) => {
//     try {
//         const searchQuery = {
//             where: {
//                 email: req.user.email,
//             },
//         };

//         const existingUser = await userManager.getUserDetail(searchQuery);

//         if (existingUser) {
//             let token = authService.generateAuthToken(existingUser);
//             return res.status(200).json({ message: "Login successful", data: existingUser, token: token });
//         } else {
//             return res.status(404).json({ message: "User does not exist" });
//         }
//     } catch (error) {
//         console.log("Error:", error.message);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };


// module.exports.signupGoogle = async (req, res) => {
//     try {
//         const searchQuery = {
//             where: {
//                 email: req.user.email,
//             },
//         };

//         const existingUser = await userManager.getUserDetail(searchQuery);

//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         } else {
//             // User does not exist, create a new user account
//             const newUser = {
//                 first_name: req.user.displayName,
//                 email: req.user.email,
//             };

//             const saveUser = await userManager.createUserProfile(newUser);
//             let token = authService.generateAuthToken(saveUser);
//             return res.status(200).json({ message: "Signup successful", data: saveUser, token: token });
//         }
//     } catch (error) {
//         console.log("Error:", error.message);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };


module.exports.failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}

module.exports.loadAuth = (req, res) => {
    res.render('auth');
}


