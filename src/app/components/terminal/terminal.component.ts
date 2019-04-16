import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnChanges {

  @ViewChild('myTerminal') terminalDiv: ElementRef;
  @Input() lines: string[];

  constructor() { }

  public newLine(e: string) {
    this.lines.push(e);
    this.terminalDiv.nativeElement.scrollTop = this.terminalDiv.nativeElement.scrollHeight + 20;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.terminalDiv.nativeElement.scrollTop = this.terminalDiv.nativeElement.scrollHeight + 20;
  }

}
