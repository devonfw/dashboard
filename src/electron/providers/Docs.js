"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var ipcHandler_schema_1 = require("./ipcHandler.schema");
var electron_1 = require("electron");
var child_process_1 = require("child_process");
var Devon_1 = require("./Devon");
var actions;
(function (actions) {
    actions["GET_DOCS"] = "docs.get-docs";
    actions["GET_TEST_INFO"] = "docs.get-test-info";
    actions["OPEN_BROWSER"] = "docs.open-browser";
})(actions = exports.actions || (exports.actions = {}));
var events;
(function (events) {
    events["CUSTOM_OUTPUT"] = "docs.custom-output";
})(events = exports.events || (exports.events = {}));
var Docs = /** @class */ (function (_super) {
    __extends(Docs, _super);
    function Docs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRemoteContent = function (url) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var http = require('http'), https = require('https');
                        var client = http;
                        if (url.toString().indexOf("https") === 0) {
                            client = https;
                        }
                        client.get(url, function (resp) {
                            var data = '';
                            // A chunk of data has been recieved.
                            resp.on('data', function (chunk) {
                                data += chunk;
                            });
                            // The whole response has been received. Print out the result.
                            resp.on('end', function () {
                                resolve(data);
                            });
                        }).on("error", function (err) {
                            reject(err);
                        });
                    })];
            });
        }); };
        return _this;
    }
    Docs.prototype.init = function (win) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                electron_1.ipcMain.on(actions.GET_DOCS, function (event, docs) { return __awaiter(_this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getRemoteContent(docs)];
                            case 1:
                                response = _a.sent();
                                event.returnValue = response;
                                return [2 /*return*/];
                        }
                    });
                }); });
                electron_1.ipcMain.on(actions.GET_TEST_INFO, function (event) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return __awaiter(_this, void 0, void 0, function () {
                        var script;
                        return __generator(this, function (_a) {
                            script = child_process_1.spawn(electron_1.app.getAppPath() + "\\data\\testjson.bat");
                            script.stdout.on('data', function (data) {
                                console.log(data.toString());
                                win.webContents.send(events.CUSTOM_OUTPUT, data);
                            });
                            script.on('exit', function () {
                                console.log('Process finished!');
                                win.webContents.send(Devon_1.default.events.PROCESS_FINISHED, null);
                            });
                            return [2 /*return*/];
                        });
                    });
                });
                electron_1.ipcMain.on(actions.OPEN_BROWSER, function (event, url) { return electron_1.shell.openExternal(url); });
                return [2 /*return*/];
            });
        });
    };
    Docs.actions = actions;
    Docs.events = events;
    return Docs;
}(ipcHandler_schema_1.default));
exports.default = Docs;
//# sourceMappingURL=Docs.js.map