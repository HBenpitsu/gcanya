import browser from 'webextension-polyfill';
import { OAuthSig, registerSig } from '../app/signalv2';
import { background as authorizer } from '../app/backendWrapper/authorizer';
import { updateAllRecordsVault } from '../app/assignmentFetcher';
import { background as registerer } from '../app/backendWrapper/registerer';

// show welcome page on new install
// browser.runtime.onInstalled.addListener(async (details) => {
//   if (details.reason === 'install') {
//     //show the welcome page
//     const url = browser.runtime.getURL('welcome/welcome.html');
//     await browser.tabs.create({ url });
//   }
// });

//ハンドラの登録
OAuthSig.setSignalHandler(async () => {await authorizer.authorize();});
registerSig.setSignalHandler(async () => {await registerer.register();});

//槫課題一覧の取得，更新(定期的に)
updateAllRecordsVault();
setInterval(async () => {updateAllRecordsVault();}, 1800000);

console.log("background is loaded");
