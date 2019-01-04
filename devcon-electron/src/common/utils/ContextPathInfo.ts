import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { Path } from './Path';

export class ContextPathInfo {
  /**
   * If a string parameter is passed to this method it will return a Path object type with the path of devon's distribution root.
   * If this method is called without parameter takes the current working directory as path to start looking for devon's
   * distribution folder.
   *
   * @param {string} [DirPath]
   * @returns Path object type
   * @memberof ContextPathInfo
   */
  public static getDistributionRoot(DirPath?: string) {
    if (DirPath) {
      return this.onFolder(DirPath).dir;
    } else {
      return this.getDistributionRoot(this.getCurrentWorkingDirectory());
    }
  }

  /**
   * @returns String with the directory where devcon is located
   * @memberof ContextPathInfo
   */
  public static getCurrentWorkingDirectory() {
    return __dirname;
  }

  /**
   * This method receive a string with a path and climb over the folder directory looking for the root path starting in the provided path.
   * For that first of all call ParsePath to transform the input string path into a path object, after that look for conf/settings.json and
   * workspaces folder to locate the root directory.
   *
   * @param {string} DirPath
   * @returns Path object type
   * @memberof ContextPathInfo
   */
  public static onFolder(DirPath: string) {
    let ParsedPath = this.ParsePath(DirPath);

    let ErrorMessage =
      'Distribution not found, please specify the distribution path like: workspace create -workspace workspacename' +
      ' -distribution distributionpath';

    while (ParsedPath.root !== ParsedPath.dir) {
      if (
        fs.existsSync(ParsedPath.dir + '\\conf\\settings.json') &&
        fs.existsSync(ParsedPath.dir + '\\workspaces')
      ) {
        // console.log(ParsedPath.dir);
        // console.log(fs.existsSync(ParsedPath.dir + '\\conf\\settings.json'));
        // console.log(fs.existsSync(ParsedPath.dir + '\\workspaces'));
        // console.log('---------------------------------------');
        ErrorMessage = '';
        break;
      } else {
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
  }

  /**
   * This methode receive a string with a path or a path object type. If the input parameter is a string
   * @param DirPath
   * @returns Path object type
   */
  public static ParsePath(DirPath: string | Path) {
    if (typeof DirPath === 'string') {
      return path.parse(DirPath);
    } else if (typeof DirPath === 'object') {
      if (
        DirPath.hasOwnProperty('root') &&
        DirPath.hasOwnProperty('dir') &&
        DirPath.hasOwnProperty('base') &&
        DirPath.hasOwnProperty('ext') &&
        DirPath.hasOwnProperty('name')
      ) {
        return DirPath;
      } else {
        console.error(
          'Path must be a string or an object with the root, dir, base, ext and name property',
        );
      }
    } else {
      console.error(
        'Path must be a string or an object with the root, dir, base, ext and name property',
      );
    }
  }
}
