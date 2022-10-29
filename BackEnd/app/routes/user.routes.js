const router = require('express').Router();
const User = require("../controller/user.controller");
const { Auth, AuthDoctor } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware")


router.post("/register", User.register);
router.post("/login", User.login);
router.post("/logout", Auth, User.logout);
router.post("/logoutAll", Auth, User.logoutAll);
router.post("/booking/:doctorId", Auth, User.getAppointment);


router.get("/profile",Auth ,User.profile);

router.patch("/editProfile",Auth ,User.editProfile);  // want edit
router.patch("/history/:patientId",Auth, AuthDoctor ,User.editHistory);  

router.delete("/deleteProfile", Auth, User.deleteProfile);

router.post("/profileImg", Auth ,upload.single("img"), User.profileImg);






module.exports = router