import express  from "express";
import { getAllUsers, getUserDetails, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();


router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getUserDetails);

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);



export default router;