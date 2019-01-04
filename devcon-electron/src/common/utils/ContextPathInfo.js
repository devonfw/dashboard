"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var ContextPathInfo = /** @class */ (function () {
    function ContextPathInfo() {
    }
    /**
     * If a string parameter is passed to this method it will return a Path object type with the path of devon's distribution root.
     * If this method is called without parameter takes the current working directory as path to start looking for devon's
     * distribution folder.
     *
     * @param {string} [DirPath]
     * @returns Path object type
     * @memberof ContextPathInfo
     */
    ContextPathInfo.getDistributionRoot = function (DirPath) {
        if (DirPath) {
            return this.onFolder(DirPath).dir;
        }
        else {
            return this.getDistributionRoot(this.getCurrentWorkingDirectory());
        }
    };
    /**
     * @returns String with the directory where devcon is located
     * @memberof ContextPathInfo
     */
    ContextPathInfo.getCurrentWorkingDirectory = function () {
        return __dirname;
    };
    /**
     * This method receive a string with a path and climb over the folder directory looking for the root path starting in the provided path.
     * For that first of all call ParsePath to transform the input string path into a path object, after that look for conf/settings.json and
     * workspaces folder to locate the root directory.
     *
     * @param {string} DirPath
     * @returns Path object type
     * @memberof ContextPathInfo
     */
    ContextPathInfo.onFolder = function (DirPath) {
        var ParsedPath = this.ParsePath(DirPath);
        var ErrorMessage = 'Distribution not found, please specify the distribution path like: workspace create -workspace workspacename' +
            ' -distribution distributionpath';
        while (ParsedPath.root !== ParsedPath.dir) {
            if (fs.existsSync(ParsedPath.dir + '\\conf\\settings.json') &&
                fs.existsSync(ParsedPath.dir + '\\workspaces')) {
                // console.log(ParsedPath.dir);
                // console.log(fs.existsSync(ParsedPath.dir + '\\conf\\settings.json'));
                // console.log(fs.existsSync(ParsedPath.dir + '\\workspaces'));
                // console.log('---------------------------------------');
                ErrorMessage = '';
                break;
            }
            else {
                // console.log(ParsedPath.dir);
                // console.log(fs.existsSync(ParsedPath.dir + '\\conf\\settings.json'));
                // console.log(fs.existsSync(ParsedPath.dir + '\\workspaces'));
                // console.log('---------------------------------------');
                ParsedPath = this.ParsePath(ParsedPath.dir);
            }
        }
        if (ErrorMessage.length > 0) {
            console.error(ErrorMessage);
        }
        return ParsedPath;
    };
    /**
     * This methode receive a string with a path or a path object type. If the input parameter is a string
     * @param DirPath
     * @returns Path object type
     */
    ContextPathInfo.ParsePath = function (DirPath) {
        if (typeof DirPath === 'string') {
            return path.parse(DirPath);
        }
        else if (typeof DirPath === 'object') {
            if (DirPath.hasOwnProperty('root') &&
                DirPath.hasOwnProperty('dir') &&
                DirPath.hasOwnProperty('base') &&
                DirPath.hasOwnProperty('ext') &&
                DirPath.hasOwnProperty('name')) {
                return DirPath;
            }
            else {
                console.error('Path must be a string or an object with the root, dir, base, ext and name property');
            }
        }
        else {
            console.error('Path must be a string or an object with the root, dir, base, ext and name property');
        }
    };
    return ContextPathInfo;
}());
exports.ContextPathInfo = ContextPathInfo;
//# sourceMappingURL=ContextPathInfo.js.map