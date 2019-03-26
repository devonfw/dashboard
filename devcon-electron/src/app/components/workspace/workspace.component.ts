import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
const { app } = require('electron').remote;
const { dialog } = require('electron').remote;
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  workspaceForm = new FormGroup({
    workspaceName: new FormControl('', [Validators.required]),
    workspacePath: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-z]:((((\\|\/)[a-z0-9\s_@\-^!#$%&.+={}\[\]]+)+)|(\\|\/)|(((\\|\/)[a-z0-9\s_@\-^!#$%&.+={}\[\]]+)+(\\|\/)))$/i,
      ),
    ]),
  });
  constructor() {}

  ngOnInit() {}

  searchFolder(): any {
    console.log(app.getPath('exe'));

    const defaultPath = app
      .getPath('exe')
      .slice(0, app.getPath('exe').lastIndexOf('\\'));

    console.log(defaultPath);

    this.workspaceForm.patchValue({
      workspacePath: dialog.showOpenDialog({
        defaultPath: defaultPath,
        properties: ['openDirectory'],
      }),
    });

    console.log(this.workspaceForm.value.workspacePath);
  }

  onSubmit() {
    console.warn(this.workspaceForm.value);
    ipcRenderer.send('workspace-info', this.workspaceForm.value);
  }
}
