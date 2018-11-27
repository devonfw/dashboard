import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
const { app } = require('electron').remote;
const { dialog } = require('electron').remote;

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  serverPath = new FormControl('');
  dbControl = new FormControl('', [Validators.required]);
  constructor() {}

  ngOnInit() {}

  searchFolder(): any {
    console.log(app.getPath('exe'));
    const defaultPath = app
      .getPath('exe')
      .slice(0, app.getPath('exe').lastIndexOf('\\'));
    console.log(defaultPath);
    this.serverPath.setValue(
      dialog.showOpenDialog({
        defaultPath: defaultPath,
        properties: ['openDirectory'],
      }),
    );
    console.log(this.serverPath.value);
  }
}
