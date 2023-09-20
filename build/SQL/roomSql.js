"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRooms = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const conection = mysql_1.default.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
conection.connect();
function getAllRooms() {
    try {
        return new Promise((resolve, reject) => {
            conection.query("SELECT * FROM room", (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
exports.getAllRooms = getAllRooms;
conection.query(`SELECT * FROM room`, (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(result);
    }
});
conection.end();
