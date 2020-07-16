// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
declare module NodeJS {
  interface Global {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ipcRenderer: any;
  }
}
