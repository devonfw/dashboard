"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var main = require('./main.ts');
// Main Menu Template
exports.mainMenuTemplate = [
    {
        label: 'System',
        submenu: [
            { label: 'Configure Environment', click: function () { } },
            { label: 'Install Devcon', click: function () { } },
            {
                label: 'Exit',
                click: function () {
                    electron_1.app.quit();
                },
            },
        ],
    },
    {
        label: 'Github',
        submenu: [
            { label: 'Devon Code', click: function () { } },
            { label: 'Oasp4j', click: function () { } },
        ],
    },
    {
        label: 'Oasp4j',
        submenu: [
            { label: 'Build', click: function () { } },
            { label: 'Create', click: function () { } },
            { label: 'Deploy', click: function () { } },
            { label: 'Run', click: function () { } },
        ],
    },
    {
        label: 'Dist',
        submenu: [
            { label: 'Info', click: function () { } },
            { label: 'Init', click: function () { } },
            { label: 'Install', click: function () { } },
            { label: 'S2', click: function () { } },
        ],
    },
    {
        label: 'Doc',
        submenu: [
            {
                label: 'Devon',
                click: function () {
                    main.MenuNavigation('doc/devon');
                },
            },
            {
                label: 'Devon Guide',
                click: function () {
                    main.MenuNavigation('doc/devonguide');
                },
            },
            { label: 'Get Started', click: function () { } },
            { label: 'Links', click: function () { } },
            { label: 'Oasp4j Guide', click: function () { } },
            { label: 'User Guide', click: function () { } },
        ],
    },
    {
        label: 'Help',
        submenu: [
            { label: 'Command', click: function () { } },
            { label: 'Module', click: function () { } },
            { label: 'Overview', click: function () { } },
            { label: 'User Guide', click: function () { } },
        ],
    },
    {
        label: 'Oasp4js',
        submenu: [
            { label: 'Build', click: function () { } },
            { label: 'Create', click: function () { } },
            { label: 'Run', click: function () { } },
        ],
    },
    {
        label: 'Project',
        submenu: [
            { label: 'Build', click: function () { } },
            { label: 'Create', click: function () { } },
            { label: 'Run', click: function () { } },
        ],
    },
    { label: 'Workspace', submenu: [{ label: 'Create', click: function () { } }] },
];
// Create the Main Menu from the previusly defined template
// module.exports = {
//   mainMenuTemplate: mainMenuTemplate,
// };
// Apply the menu to de main window
// Menu.setApplicationMenu(mainMenu);
// // Main Menu Template
// export const mainMenuTemplate = [
//   {
//     label: 'System',
//     submenu: [
//       { label: 'Configure Environment', click() { } },
//       { label: 'Install Devcon', click() { } },
//       {
//         label: 'Exit',
//         click() {
//           app.quit();
//         },
//       },
//     ],
//   },
//   {
//     label: 'Github',
//     submenu: [
//       { label: 'Devon Code', click() { } },
//       { label: 'Oasp4j', click() { } },
//     ],
//   },
//   {
//     label: 'Oasp4j',
//     submenu: [
//       { label: 'Build', click() { } },
//       { label: 'Create', click() { } },
//       { label: 'Deploy', click() { } },
//       { label: 'Run', click() { } },
//     ],
//   },
//   {
//     label: 'Dist',
//     submenu: [
//       { label: 'Info', click() { } },
//       { label: 'Init', click() { } },
//       { label: 'Install', click() { } },
//       { label: 'S2', click() { } },
//     ],
//   },
//   {
//     label: 'Doc',
//     submenu: [
//       {
//         label: 'Devon',
//         click() {
//           if (serve) {
//             require('electron-reload')(__dirname, {
//               electron: require(`${__dirname}/node_modules/electron`),
//             });
//             win.loadURL('http://localhost:4200/#/doc/devon');
//           } else {
//             win.loadURL(
//               url.format({
//                 pathname: path.join(__dirname, 'dist/index.html/doc/devon'),
//                 protocol: 'file:',
//                 slashes: true,
//               }),
//             );
//           }
//         },
//       },
//       {
//         label: 'Devon Guide',
//         click() {
//           if (serve) {
//             require('electron-reload')(__dirname, {
//               electron: require(`${__dirname}/node_modules/electron`),
//             });
//             win.loadURL('http://localhost:4200/#/doc/devonguide');
//           } else {
//             win.loadURL(
//               url.format({
//                 pathname: path.join(
//                   __dirname,
//                   'dist/index.html/doc/devonguide',
//                 ),
//                 protocol: 'file:',
//                 slashes: true,
//               }),
//             );
//           }
//         },
//       },
//       { label: 'Get Started', click() { } },
//       { label: 'Links', click() { } },
//       { label: 'Oasp4j Guide', click() { } },
//       { label: 'User Guide', click() { } },
//     ],
//   },
//   {
//     label: 'Help',
//     submenu: [
//       { label: 'Command', click() { } },
//       { label: 'Module', click() { } },
//       { label: 'Overview', click() { } },
//       { label: 'User Guide', click() { } },
//     ],
//   },
//   {
//     label: 'Oasp4js',
//     submenu: [
//       { label: 'Build', click() { } },
//       { label: 'Create', click() { } },
//       { label: 'Run', click() { } },
//     ],
//   },
//   {
//     label: 'Project',
//     submenu: [
//       { label: 'Build', click() { } },
//       { label: 'Create', click() { } },
//       { label: 'Run', click() { } },
//     ],
//   },
//   { label: 'Workspace', submenu: [{ label: 'Create', click() { } }] },
// ];
//# sourceMappingURL=MainMenuTemplate.js.map