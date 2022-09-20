"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// import bodyParser from "body-parser";
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const api_1 = __importDefault(require("./routes/api"));
const publicDirectoryPath = "../public";
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
    origin: function (origin, callback) {
        console.log(origin);
        if (!origin || allowedOrigins.indexOf(origin) === -1) {
            callback(null, true);
        }
        else {
            var msg = "The CORS policy for this site does not allow access from the specified origin.";
            callback(new Error(msg), false);
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)("gig-Emm!!"));
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, publicDirectoryPath)));
app.use(api_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, publicDirectoryPath, "/index.html"));
});
exports.default = app;
