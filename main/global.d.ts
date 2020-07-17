/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
declare module NodeJS {
  interface Global {
    ipcRenderer: any;
  }
}
