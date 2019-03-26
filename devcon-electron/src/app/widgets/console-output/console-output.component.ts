import { Component, OnInit } from '@angular/core';
import { ConsoleOutputService } from '../../providers/console-output.service';

@Component({
  selector: 'app-console-output',
  templateUrl: './console-output.component.html',
  styleUrls: ['./console-output.component.scss'],
})
export class ConsoleOutputComponent implements OnInit {
  constructor(public consoleOutputService: ConsoleOutputService) {}

  ngOnInit() {}
}
