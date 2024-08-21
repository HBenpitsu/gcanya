import browser from 'webextension-polyfill';
import { OAuthSig, registerSig } from '../app/signalv2';
import { authorize } from '../app/assignmentRegisterer/authorizer';
import { updateAllRecordsVault } from '../app/assignmentFetcher';
import { register } from '../app/assignmentRegisterer/registerer';

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

registerSig.setSignalHandler(async () => {
  await register();
});

updateAllRecordsVault();
setInterval(async () => {
  updateAllRecordsVault();
}, 60000);

console.log("background is loaded");
