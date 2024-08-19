import browser from 'webextension-polyfill';
import { Signal, signalHandler } from '../app/signal';
import { authorize } from '../app/assignmentRegisterer/authorizer';
import { sleep } from '../utils';

// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    //show the welcome page
    const url = browser.runtime.getURL('welcome/welcome.html');
    await browser.tabs.create({ url });
  }
});

signalHandler.setSignalHandler(Signal.OAuth, async () => {
  await authorize();  
});

console.log("background is loaded");
