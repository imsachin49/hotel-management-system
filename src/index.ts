import express from "express";
import rooms from "./routes/roomsRoutes";
import bookings from "./routes/bookingsRoutes";
import users from "./routes/usersRoutes";
import comments from "./routes/commentsRoutes";
import Login from "./routes/loginRoutes";
import "./auth/auth";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import cookiparser from "cookie-parser";
import { mongoConnect } from "./Mongo/mongo-connection";
import { middleWare } from "./middleware/middelware";
// import { runUsers } from "./Mongo/models/userModel";
// import { createMe } from "./Mongo/models/seeder/userSeeder";
// Seeders
//mongo

const app = express();
const PORT = 3001;
mongoConnect();
// runBookings();
// createMe()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookiparser());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", Login);
app.use("/api/rooms", passport.authenticate("jwt", { session: false }), rooms);
app.use(
  "/api/bookings",
  passport.authenticate("jwt", { session: false }),
  bookings
);
app.use("/api/users", passport.authenticate("jwt", { session: false }), users);
app.use(
  "/api/comments",
  passport.authenticate("jwt", { session: false }),
  comments
);

app.use(middleWare);
export const server = app.listen(PORT, () => {
  console.log(`Api listening on port ${PORT}`);
});

export default app;
