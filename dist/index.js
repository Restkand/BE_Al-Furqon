"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hello_1 = __importDefault(require("./routes/hello"));
const users_1 = __importDefault(require("./routes/users"));
const vendor_1 = __importDefault(require("./routes/vendor"));
const floor_1 = __importDefault(require("./routes/floor"));
const site_1 = __importDefault(require("./routes/site"));
const department_1 = __importDefault(require("./routes/department"));
const beacon_1 = __importDefault(require("./routes/beacon"));
const gateway_1 = __importDefault(require("./routes/gateway"));
const route_1 = __importDefault(require("./routes/route"));
const schedule_1 = __importDefault(require("./routes/schedule"));
const employee_1 = __importDefault(require("./routes/employee"));
const team_1 = __importDefault(require("./routes/team"));
const alert_1 = __importDefault(require("./routes/alert"));
const question_1 = __importDefault(require("./routes/question"));
const zone_1 = __importDefault(require("./routes/zone"));
const track_1 = __importDefault(require("./routes/track"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
const allowedOrigins = [
    "http://localhost:3000",
    "http://tracking.pakuwon.local",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
}));
app.use(express_1.default.json());
app.use("/hello", hello_1.default);
app.use("/users", users_1.default);
app.use("/vendor", vendor_1.default);
app.use("/floor", floor_1.default);
app.use("/beacon", beacon_1.default);
app.use("/site", site_1.default);
app.use("/department", department_1.default);
app.use("/gateway", gateway_1.default);
app.use("/route", route_1.default);
app.use("/schedule", schedule_1.default);
app.use("/employee", employee_1.default);
app.use("/team", team_1.default);
app.use("/alert", alert_1.default);
app.use("/question", question_1.default);
app.use("/zone", zone_1.default);
app.use("/track", track_1.default);
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
