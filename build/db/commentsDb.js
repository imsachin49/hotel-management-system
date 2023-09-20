"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.deleteComment = exports.createComment = exports.getOneComment = exports.getAllComments = void 0;
const comments_json_1 = __importDefault(require("../data/comments.json"));
const fs_1 = __importDefault(require("fs"));
const getAllComments = () => {
    return comments_json_1.default;
};
exports.getAllComments = getAllComments;
const getOneComment = (commentId) => {
    const theComment = comments_json_1.default.find((comment) => {
        return comment.id === commentId.replace(/"/g, "") ? true : false;
    });
    return theComment;
};
exports.getOneComment = getOneComment;
const createComment = (newComment) => {
    const currentComments = JSON.parse(fs_1.default.readFileSync("src/data/comments.json", "utf-8"));
    const updatedComments = [...currentComments, newComment];
    fs_1.default.writeFileSync("src/data/comments.json", JSON.stringify(updatedComments, null, 2));
    return updatedComments;
};
exports.createComment = createComment;
const deleteComment = (commentId) => {
    const deletedComment = comments_json_1.default.filter((comment) => {
        return comment.id !== commentId.replace(/"/g, "");
    });
    if (deletedComment.length === comments_json_1.default.length) {
        throw new Error("Comment not found");
    }
    fs_1.default.writeFileSync("src/data/comments.json", JSON.stringify(deletedComment, null, 2));
    return deletedComment;
};
exports.deleteComment = deleteComment;
const updateComment = (commentId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedCommentId = commentId.replace(/"/g, "");
    const updatedComments = comments_json_1.default.map((comment) => {
        if (comment.id === sanitizedCommentId) {
            return Object.assign(Object.assign({}, comment), updates);
        }
        else {
            return comment;
        }
    });
    const updatedComment = updatedComments.find((comment) => {
        return comment.id === sanitizedCommentId;
    });
    if (!updatedComment) {
        throw new Error(`Comment with id ${sanitizedCommentId} not found`);
    }
    fs_1.default.writeFileSync("src/data/comments.json", JSON.stringify(updatedComments, null, 2));
    return updatedComment;
});
exports.updateComment = updateComment;
