import { Router } from "express";
import {
  getAllUsers,
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  updateProfilePic,
  logIn,
} from "../../controllers/users/user.controllers.js";
import upload from "../../utilities/fileStorage.js";
import Auth from "../../middlewares/auth.middlewares.js";

const router = Router();

router.route("/all").get(getAllUsers);
router.route("/:id").get(getUserById);
router.route("/create").post(registerUser);
router.route("/update/:id").patch(Auth, updateUser);
router.route("/delete/:id").delete(Auth, deleteUser);
router
  .route("/:id/profile-pic")
  .patch(Auth, upload.single("profilePic"), updateProfilePic);
router.route("/login").post(logIn);

export default router;
