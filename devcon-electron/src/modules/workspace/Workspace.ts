import { CommandModule } from '../../common/CommandModule';
import { ContextPathInfo } from '../../common/utils/ContextPathInfo';
import * as fs from 'fs';
import { spawn } from 'child_process';
import { ipcMain } from 'electron';

/**
 * This class contains command to generate a new workspace with default configuration.
 */
export class Workspace extends CommandModule {
  /**
   * This command allow to create a new workspace with default configuration.
   *
   * @param distribution Path to Devon Distribution
   * @param workspace Name of the workspace folder
   * @throws Exception Exception thrown by workspace create command
   */
  public static create(workspace: string, distribution?: string) {
    let distInfo;

    if (distribution === null) {
      distInfo = ContextPathInfo.getDistributionRoot();
    } else {
      distInfo = ContextPathInfo.getDistributionRoot(distribution);
    }

    const workspacePath = distInfo + '\\workspaces\\' + workspace;

    const updateWorkspace = `create-or-update-workspace.bat ${workspace} noPause`;

    let batLog;
    batLog = [];

    function log(message: string): void {
      batLog.push(message);
      console.log(batLog[batLog.length - 1]);
    }

    fs.mkdir(workspacePath, (err) => {
      if (err) {
        console.error(`The workspace ${workspace} can't be created`);
        if (err.errno === -4075) {
          console.log(
            `Workspace ${workspace} already exists in ${distInfo}\\workspaces\\`,
          );
        }
      } else {
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
        const bat = spawn('cmd.exe', ['/c', updateWorkspace], {
          cwd: distInfo,
        });

        bat.stdout.on('data', (data) => {
          // console.log(`stdout: ${data}`);
          log(`stdout: ${data}`);
        });

        bat.stderr.on('data', (data) => {
          // console.log(`stderr: ${data}`);
          log(`stderr: ${data}`);
        });

        bat.on('close', (code) => {
          // console.log(`child process exited with code ${code}`);
          log(`child process exited with code ${code}`);
          console.log(batLog);
        });

        bat.on('error', (error) => {
          console.log('Failed to start subprocess');
          console.log(error);
        });
      }
    });
  }
}
