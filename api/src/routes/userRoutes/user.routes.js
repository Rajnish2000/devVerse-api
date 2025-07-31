import { Router } from "express";
import {
  getAllUsers,
  registerUser,
} from "../../controllers/users/user.controllers.js";

const router = Router();

router.route("/all").get(getAllUsers);
router.route("/:id").get();
router.route("/create").post(registerUser);
router.route("/update/:id").patch();
router.route("/delete/:id").delete();

export default router;
