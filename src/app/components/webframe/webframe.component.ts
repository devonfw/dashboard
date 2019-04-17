import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-webframe',
  templateUrl: './webframe.component.html',
  styleUrls: ['./webframe.component.scss']
})
export class WebframeComponent implements OnInit {

  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}
