"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const loginController_1 = require("../controllers/loginController");
const router = (0, express_1.Router)();
router.post("/", passport_1.default.authenticate("login", { session: false, passReqToCallback: true }), loginController_1.LoginController);
router.get("/test", (_req, res) => {
    res.send("test");
});
exports.default = router;
