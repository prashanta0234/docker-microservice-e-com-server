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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var axios_1 = __importDefault(require("axios"));
var global_error_validation_1 = require("./middlewares/global-error-validation");
var body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config({ path: "../.env" });
var app = (0, express_1.default)();
var port = process.env.PORT || 5001;
app.use((0, body_parser_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.get("/check-products-health", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("http://products-services:5001/health")];
            case 1:
                response = _a.sent();
                res.status(200).json({
                    message: "Inventory service is healthy and products service health status is: ",
                    productsServiceHealth: response.data,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching products service health:", error_1);
                res.status(500).json({
                    message: "Failed to reach products service",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// start key clock
var KEYCLOAK_BASE_URL = "http://localhost:8080";
var KEYCLOAK_REALM = "e-com-micro";
var KEYCLOAK_CLIENT_ID = "e-com-client";
var KEYCLOAK_CLIENT_SECRET = "3jOCDk7FXXcGWWZyh95XLwM9doVUogVJ";
// Helper to get Keycloak token
var getKeycloakToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("I'm triggered");
                if (!KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
                    throw new Error("Keycloak client ID or secret is not configured.");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post("http://localhost:8080/realms/e-com-micro/protocol/openid-connect/token", new URLSearchParams({
                        grant_type: "client_credentials",
                        client_id: KEYCLOAK_CLIENT_ID,
                        client_secret: KEYCLOAK_CLIENT_SECRET,
                    }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data.access_token];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                throw new Error("Failed to get Keycloak token");
            case 4: return [2 /*return*/];
        }
    });
}); };
app.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, role, adminToken, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
                    throw new Error("Keycloak client ID or secret is not configured.");
                }
                return [4 /*yield*/, getKeycloakToken()];
            case 2:
                adminToken = _b.sent();
                // console.log(adminToken, "hello");
                return [4 /*yield*/, axios_1.default.post("".concat(KEYCLOAK_BASE_URL, "/admin/realms/").concat(KEYCLOAK_REALM, "/users"), {
                        username: username,
                        email: email,
                        role: role,
                        enabled: true,
                        credentials: [
                            {
                                type: "password_grant",
                                value: password,
                                temporary: false,
                            },
                        ],
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(adminToken),
                        },
                    })];
            case 3:
                // console.log(adminToken, "hello");
                _b.sent();
                res.status(201).json({ message: "User registered successfully" });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                console.error("Error registering user:");
                if (error_3 instanceof Error) {
                    res
                        .status(500)
                        .json({ message: "Registration failed", error: error_3.message });
                }
                else {
                    res
                        .status(500)
                        .json({ message: "Registration failed", error: "Unknown error" });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, response, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                if (!KEYCLOAK_CLIENT_ID || !KEYCLOAK_CLIENT_SECRET) {
                    throw new Error("Keycloak client ID or secret is not configured.");
                }
                return [4 /*yield*/, axios_1.default.post("".concat(KEYCLOAK_BASE_URL, "/realms/").concat(KEYCLOAK_REALM, "/protocol/openid-connect/token"), new URLSearchParams({
                        grant_type: "password",
                        client_id: KEYCLOAK_CLIENT_ID,
                        client_secret: KEYCLOAK_CLIENT_SECRET,
                        username: username,
                        password: password,
                    }), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })];
            case 2:
                response = _b.sent();
                console.log(response);
                res.status(200).json({ message: "Login successful", token: response.data });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                if (error_4 instanceof Error) {
                    if (error_4.name === "unauthorized") {
                        res
                            .status(401)
                            .json({ message: "Invalid credentials", error: error_4.message });
                    }
                    else {
                        res.status(500).json({ message: "Login failed", error: error_4.message });
                    }
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// end test keyclock
// add global error handler
app.use(global_error_validation_1.GlobalErrorHandler);
app.get("/health", function (_req, res) {
    res.status(200).json({
        message: "My health is ok.",
    });
});
app.use(function (_req, res, _next) {
    res.status(404).json({
        message: "Route not found! Please check the documentation.",
    });
});
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
