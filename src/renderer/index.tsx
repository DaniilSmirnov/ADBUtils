import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

const adb = require('@devicefarmer/adbkit');

const client = adb.createClient();

client
  .trackDevices()
  // eslint-disable-next-line promise/always-return
  .then(function (tracker) {
    tracker.on('add', function (device) {
      console.log('Device %s was plugged in', device.id);
    });
    tracker.on('remove', function (device) {
      console.log('Device %s was unplugged', device.id);
    });
    tracker.on('end', function () {
      console.log('Tracking stopped');
    });
  })
  .catch(function (err) {
    console.error('Something went wrong:', err.stack);
  });
