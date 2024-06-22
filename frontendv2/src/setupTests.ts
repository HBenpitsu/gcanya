import '@testing-library/jest-dom';
import { chrome } from 'jest-chrome';
import { settingVault } from './app/settingVault';

Object.assign(global, { chrome: chrome, browser: chrome });
