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
var electron_1 = require("electron");
var child_process_1 = require("child_process");
var fs = require("fs");
var http = require("http");
var targz = require("targz");
var ipcHandler_schema_1 = require("./ipcHandler.schema");
var actions;
(function (actions) {
    actions["CHECK_VERSION"] = "devon.check-version";
    actions["INSTALL_IDE"] = "devon.install-ide";
})(actions = exports.actions || (exports.actions = {}));
var events;
(function (events) {
    events["CONSOLE_OUTPUT"] = "script-stdout";
    events["PROCESS_FINISHED"] = "script-exit";
})(events = exports.events || (exports.events = {}));
var Devon = /** @class */ (function (_super) {
    __extends(Devon, _super);
    function Devon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Devon.prototype.init = function (win) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                electron_1.ipcMain.on(actions.INSTALL_IDE, function (event) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return __awaiter(_this, void 0, void 0, function () {
                        var version, ideUrl, devonideComp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    version = '3.0.0-beta5';
                                    ideUrl = "http://repo.maven.apache.org/maven2/com/devonfw/tools/ide/devon-ide-scripts/" + version + "/devon-ide-scripts-" + version + ".tar.gz";
                                    if (!fs.existsSync('./data/devon-projects')) {
                                        fs.mkdirSync('./data/devon-projects');
                                    }
                                    devonideComp = fs.createWriteStream("./data/devon-projects/" + version + ".tar.gz");
                                    win.webContents.send(events.CONSOLE_OUTPUT, "Downloading version " + version + " of Devon-ide");
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            var request = http.get(ideUrl, function (response) {
                                                response.pipe(devonideComp);
                                                devonideComp.on('finish', function () {
                                                    devonideComp.close();
                                                    win.webContents.send(events.CONSOLE_OUTPUT, 'Download finished!');
                                                    resolve();
                                                });
                                            }).on('error', function (err) {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, fs.unlinkSync("./data/devon-projects/" + version + ".tar.gz")];
                                                            case 1:
                                                                _a.sent();
                                                                reject();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            });
                                        })];
                                case 1:
                                    _a.sent();
                                    win.webContents.send(events.CONSOLE_OUTPUT, "Installing Devon-ide " + version + " distribution.");
                                    targz.decompress({
                                        src: "./data/devon-projects/" + version + ".tar.gz",
                                        dest: "./data/devon-projects/"
                                    }, function (err) {
                                        win.webContents.send(events.CONSOLE_OUTPUT, 'Finished copying files!');
                                        // shell.openItem(`${app.getAppPath()}\\data\\devon-projects\\setup.bat`);
                                        var script = child_process_1.spawn(electron_1.app.getAppPath() + "\\data\\devon-projects\\setup.bat", ['https://myhost.name/myrepo.git']);
                                        script.stdout.on('data', function (data) {
                                            console.log(data.toString());
                                            win.webContents.send(Devon.events.CONSOLE_OUTPUT, data);
                                        });
                                        script.on('exit', function () {
                                            console.log('Process finished!');
                                            win.webContents.send(Devon.events.PROCESS_FINISHED, null);
                                        });
                                        win.webContents.send(events.PROCESS_FINISHED, null);
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    Devon.actions = actions;
    Devon.events = events;
    return Devon;
}(ipcHandler_schema_1.default));
exports.default = Devon;
//# sourceMappingURL=Devon.js.map