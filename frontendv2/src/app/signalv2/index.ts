import { Signal } from './signal';

export { SignalState } from './signal';
export const OAuthSig = new Signal('OAuthSig', 120000);
export const showAuthURLSig = new Signal('showAuthURLSig', 1000);
export const registerSig = new Signal('RegisterSig', 20000);