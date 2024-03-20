import express from "express";
const router = express.Router();
import {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  resetPassword,
  forgotPassword,
  verifyEmail,
} from "../controllers/usersController.js";
import { protect, authorizeUser } from "../middleware/auth.js";

//get all users route
router
  .route("/")
  .get(getUsers);

//create user
router.route("/register").post(createUser);

//login user
router.route("/login").post(loginUser);

//get single user
router.route("/:id").get(getUser);

//update user
router.route("/update/:id").put(protect, updateUser);


router.route("/resetpassword/:id/:token").post(resetPassword);
router.route(`/verify/:code`).get(verifyEmail);

router.route("/forgot-password").post(forgotPassword);
export default router;
