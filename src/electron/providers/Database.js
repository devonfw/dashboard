"use strict";
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
var typeorm_1 = require("typeorm");
var electron_1 = require("electron");
var item_schema_1 = require("../../assets/model/item.schema");
var workspace_schema_1 = require("../../assets/model/workspace.schema");
var actions;
(function (actions) {
    actions["GET_ITEMS"] = "db.get-items";
    actions["ADD_ITEM"] = "db.add-item";
    actions["DELETE_ITEM"] = "db.delete-item";
    actions["ADD_WORKSPACE"] = "db.add-workspace";
    actions["GET_WORKSPACES"] = "db.get-workspaces";
})(actions = exports.actions || (exports.actions = {}));
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.init = function (win) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, itemRepo, workspaceRepo;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, typeorm_1.createConnection({
                            type: 'sqlite',
                            synchronize: true,
                            logging: true,
                            logger: 'simple-console',
                            database: './data/database.sqlite',
                            entities: [item_schema_1.Item, workspace_schema_1.Workspace],
                        })];
                    case 1:
                        connection = _a.sent();
                        itemRepo = connection.getRepository(item_schema_1.Item);
                        workspaceRepo = connection.getRepository(workspace_schema_1.Workspace);
                        electron_1.ipcMain.on(actions.GET_ITEMS, function (event) {
                            var args = [];
                            for (var _i = 1; _i < arguments.length; _i++) {
                                args[_i - 1] = arguments[_i];
                            }
                            return __awaiter(_this, void 0, void 0, function () {
                                var _a, err_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 2, , 3]);
                                            _a = event;
                                            return [4 /*yield*/, itemRepo.find()];
                                        case 1:
                                            _a.returnValue = _b.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            err_1 = _b.sent();
                                            throw err_1;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        electron_1.ipcMain.on(actions.ADD_ITEM, function (event, _item) { return __awaiter(_this, void 0, void 0, function () {
                            var item, _a, err_2;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 4, , 5]);
                                        return [4 /*yield*/, itemRepo.create(_item)];
                                    case 1:
                                        item = _b.sent();
                                        return [4 /*yield*/, itemRepo.save(item)];
                                    case 2:
                                        _b.sent();
                                        _a = event;
                                        return [4 /*yield*/, itemRepo.find()];
                                    case 3:
                                        _a.returnValue = _b.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        err_2 = _b.sent();
                                        throw err_2;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        electron_1.ipcMain.on(actions.DELETE_ITEM, function (event, _item) { return __awaiter(_this, void 0, void 0, function () {
                            var item, _a, err_3;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 4, , 5]);
                                        return [4 /*yield*/, itemRepo.create(_item)];
                                    case 1:
                                        item = _b.sent();
                                        return [4 /*yield*/, itemRepo.remove(item)];
                                    case 2:
                                        _b.sent();
                                        _a = event;
                                        return [4 /*yield*/, itemRepo.find()];
                                    case 3:
                                        _a.returnValue = _b.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        err_3 = _b.sent();
                                        throw err_3;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        electron_1.ipcMain.on(actions.ADD_WORKSPACE, function (event, _workspace) { return __awaiter(_this, void 0, void 0, function () {
                            var workspace, _a, err_4;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 4, , 5]);
                                        return [4 /*yield*/, workspaceRepo.create(_workspace)];
                                    case 1:
                                        workspace = _b.sent();
                                        return [4 /*yield*/, workspaceRepo.save(workspace)];
                                    case 2:
                                        _b.sent();
                                        _a = event;
                                        return [4 /*yield*/, workspaceRepo.find()];
                                    case 3:
                                        _a.returnValue = _b.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        err_4 = _b.sent();
                                        throw err_4;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        electron_1.ipcMain.on(actions.GET_WORKSPACES, function (event) {
                            var args = [];
                            for (var _i = 1; _i < arguments.length; _i++) {
                                args[_i - 1] = arguments[_i];
                            }
                            return __awaiter(_this, void 0, void 0, function () {
                                var _a, err_5;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 2, , 3]);
                                            _a = event;
                                            return [4 /*yield*/, workspaceRepo.find()];
                                        case 1:
                                            _a.returnValue = _b.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            err_5 = _b.sent();
                                            throw err_5;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.actions = actions;
    return Database;
}());
exports.default = Database;
//# sourceMappingURL=Database.js.map