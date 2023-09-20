import { Router } from "express";
import passport from "passport";
import { LoginController } from "../controllers/loginController";
const router = Router();

router.post(
  "/",
  passport.authenticate("login", { session: false, passReqToCallback: true }),
  LoginController
);

router.get("/test", (_req, res) => {
  res.send("test");
});

export default router;
