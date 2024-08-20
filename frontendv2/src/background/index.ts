import browser from 'webextension-polyfill';
import { OAuthSig } from '../app/signalv2';
import { authorize } from '../app/assignmentRegisterer/authorizer';

// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    //show the welcome page
    const url = browser.runtime.getURL('welcome/welcome.html');
    await browser.tabs.create({ url });
  }
});

OAuthSig.setSignalHandler(async () => {
  await authorize();  
});

console.log("background is loaded");
