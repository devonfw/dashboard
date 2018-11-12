import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Devconroute } from '../devconroute';
import { DevconrouteService } from '../devconroute.service';
import { ipcRenderer } from 'electron';
import { SimplePDFBookmark, SimplePdfViewerComponent } from 'simple-pdf-viewer';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {
  @ViewChild(SimplePdfViewerComponent)
  private pdfViewer: SimplePdfViewerComponent;
  bookmarks: SimplePDFBookmark[] = [];

  pdfSrc = './src/assets/Devonfw_Guide_v2.4.0.pdf';
  devconroute: string;

  electronOut: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.devconroute = params.get('devconroute');
    });

    switch (this.devconroute) {
      case 'devon': {
        ipcRenderer.send('angular-async:command', 'devon');
        ipcRenderer.on('electron-async-rep:devon', (event, arg) => {
          this.electronOut = arg;
          console.log('respuesta de electron' + this.electronOut);
        });

        break;
      }
      case 'devonguide': {
        ipcRenderer.send('angular-async:command', 'devonguide');
        ipcRenderer.on('electron-async-rep:devonguide', (event, arg) => {
          this.electronOut = arg;
          console.log('respuesta de electron' + this.electronOut);
        });
        break;
      }
      case 'getstarted': {
        break;
      }
      case 'links': {
        break;
      }
      case 'oasp4jguide': {
        break;
      }
      case 'userguide': {
        break;
      }
    }
  }

  // how to open PDF document
  openDocument(document: File) {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => {
      this.pdfViewer.openDocument(new Uint8Array(fileReader.result));
    };
    fileReader.readAsArrayBuffer(document);
  }

  goDevonsite() {
    ipcRenderer.send('angular-async:devonsite');
    console.log('go to devon site');
  }

  openDevonguide() {
    ipcRenderer.send('angular-async:devonguide');
    console.log('go to devonguide');
  }
}
