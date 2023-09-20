"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const commentsController_1 = require("../controllers/commentsController");
router.get("/getAllComments", commentsController_1.getAllComments);
router.get("/getOneComment/:id", commentsController_1.getOneComment);
router.post("/createComment", commentsController_1.createComment);
router.delete("/deleteComment/:id", commentsController_1.deleteComment);
router.put("/updateComment/:id", commentsController_1.updateComment);
exports.default = router;
