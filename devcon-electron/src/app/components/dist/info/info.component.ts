import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  // pruebas de expresion regular
  myFunction() {
    const str = 'c:\\';
    const str1 =
      'C:\\Users\\jsanchoh\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs';
    const patt = /^([A-z]\:|\\)((\[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+)*)$/;
    const patt2 = /^[a-z]:((((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)+)|(\\|\/)|(((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)+(\\|\/)))$/i; // <--
    const patt1 = /[a-z]/gi;
    const res = patt2.test(str);
    console.log(patt);
    console.log(res);
  }
}
