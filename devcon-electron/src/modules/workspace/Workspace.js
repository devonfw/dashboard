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
Object.defineProperty(exports, "__esModule", { value: true });
var CommandModule_1 = require("../../common/CommandModule");
var ContextPathInfo_1 = require("../../common/utils/ContextPathInfo");
var fs = require("fs");
var child_process_1 = require("child_process");
/**
 * This class contains command to generate a new workspace with default configuration.
 */
var Workspace = /** @class */ (function (_super) {
    __extends(Workspace, _super);
    function Workspace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This command allow to create a new workspace with default configuration.
     *
     * @param distribution Path to Devon Distribution
     * @param workspace Name of the workspace folder
     * @throws Exception Exception thrown by workspace create command
     */
    Workspace.create = function (workspace, distribution) {
        var distInfo;
        if (distribution === null) {
            distInfo = ContextPathInfo_1.ContextPathInfo.getDistributionRoot();
        }
        else {
            distInfo = ContextPathInfo_1.ContextPathInfo.getDistributionRoot(distribution);
        }
        var workspacePath = distInfo + '\\workspaces\\' + workspace;
        var updateWorkspace = "create-or-update-workspace.bat " + workspace + " noPause";
        var batLog;
        batLog = [];
        function log(message) {
            batLog.push(message);
            console.log(batLog[batLog.length - 1]);
        }
        fs.mkdir(workspacePath, function (err) {
            if (err) {
                console.error("The workspace " + workspace + " can't be created");
                if (err.errno === -4075) {
                    console.log("Workspace " + workspace + " already exists in " + distInfo + "\\workspaces\\");
                }
            }
            else {
                console.log('Workspace created succesfully');
                // exec(updateWorkspace, { cwd: distInfo }, (error, stdout, stderr) => {
                //   if (error) {
                //     console.error(err);
                //   } else if (stderr) {
                //     console.log(stderr);
                //   } else {
                //     console.log(stdout);
                //   }
                // });
                var bat = child_process_1.spawn('cmd.exe', ['/c', updateWorkspace], {
                    cwd: distInfo,
                });
                bat.stdout.on('data', function (data) {
                    // console.log(`stdout: ${data}`);
                    log("stdout: " + data);
                });
                bat.stderr.on('data', function (data) {
                    // console.log(`stderr: ${data}`);
                    log("stderr: " + data);
                });
                bat.on('close', function (code) {
                    // console.log(`child process exited with code ${code}`);
                    log("child process exited with code " + code);
                    console.log(batLog);
                });
                bat.on('error', function (error) {
                    console.log('Failed to start subprocess');
                    console.log(error);
                });
            }
        });
    };
    return Workspace;
}(CommandModule_1.CommandModule));
exports.Workspace = Workspace;
//# sourceMappingURL=Workspace.js.map