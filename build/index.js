"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const roomsRoutes_1 = __importDefault(require("./routes/roomsRoutes"));
const bookingsRoutes_1 = __importDefault(require("./routes/bookingsRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const commentsRoutes_1 = __importDefault(require("./routes/commentsRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
require("./auth/auth");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
const PORT = 3000;
//import mongoose from "mongoose";
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// async function connectToDatabase() {
//   try {
//     const options = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       autoIndex: true,
//     } as mongoose.ConnectOptions;
//     await mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", options);
//     console.log("MongoDB connected successfully!");
//   } catch (err) {
//     console.error(`MongoDB connection error: ${err}`);
//   }
// }
// connectToDatabase();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//-----------------------------------------------------------
app.use("/login", loginRoutes_1.default);
app.use("/api/rooms", passport_1.default.authenticate("jwt", { session: false }), roomsRoutes_1.default);
app.use("/api/bookings", passport_1.default.authenticate("jwt", { session: false }), bookingsRoutes_1.default);
app.use("/api/users", passport_1.default.authenticate("jwt", { session: false }), usersRoutes_1.default);
app.use("/api/comments", passport_1.default.authenticate("jwt", { session: false }), commentsRoutes_1.default);
// app.use(function (
//   err: ErrorType,
//   _req: express.Request,
//   res: express.Response,
//   _next: express.NextFunction
// ) {
//   console.log("this is the error in the index");
//   res.status(err.status || 500);
//   res.json({ error: err });
// });
//-----------------------------------------------------------
exports.server = app.listen(PORT, () => {
    console.log(`Api listening on port ${PORT}`);
});
exports.default = app;
