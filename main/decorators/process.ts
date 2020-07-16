import { ipcMain, IpcMainEvent } from 'electron';

function Process(path: string) {
  // this is the decorator factory
  return function (
    target: Object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;

    propertyDescriptor.value = function (...args: any[]) {
      let result: any;
      const eventHandler = (event: IpcMainEvent, ...eventArgs: any[]) => {
        Promise.resolve(method.apply(this, eventArgs)).then((result) => {
          const r = JSON.stringify(result);

          const params = eventArgs.map((a) => JSON.stringify(a)).join();
          console.log(
            `Path: ${path}\t---> Call: ${propertyName}(${params}) => ${r}`
          );
          event.sender.send(path, result);
        });
      };

      // invoke foo() and get its return value
      ipcMain.removeListener(path, eventHandler);
      ipcMain.on(path, eventHandler);

      // return the result of invoking the method
      return result;
    };
    return propertyDescriptor;
  };
}

export default Process;
