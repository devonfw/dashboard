import { ipcMain, IpcMainEvent } from 'electron';

function Process(path: string, verbose = true) {
  // this is the decorator factory
  return function (
    _: unknown,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = propertyDescriptor.value;

    propertyDescriptor.value = function () {
      const eventHandler = (event: IpcMainEvent, ...eventArgs: unknown[]) => {
        Promise.resolve(method.apply(this, eventArgs)).then((result) => {
          const r = JSON.stringify(result);

          const params = eventArgs.map((a) => JSON.stringify(a)).join();
          if (verbose) {
            console.log(
              `Path: ${path}\t---> Call: ${propertyName}(${params}) => ${r}`
            );
          }
          event.sender.send(path, result);
        });
      };

      // invoke foo() and get its return value
      ipcMain.removeListener(path, eventHandler);
      ipcMain.on(path, eventHandler);
    };
    return propertyDescriptor;
  };
}

export default Process;
