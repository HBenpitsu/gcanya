import { settingVault } from './settingVault';
import { LMS,UITheme,Keys } from './settings';
import { vault } from '../vault';
import { Temporal } from 'temporal-polyfill';

describe('settingVault', () => {
  it('should be defined', () => {
    expect(settingVault).toBeDefined();
  });

  it('should handle LMS list', () => {
    expect(settingVault.LMSList).toEqual([]);
    settingVault.addLMS(LMS.NuTACT);
    expect(settingVault.LMSList).toContain(LMS.NuTACT);
    expect(vault.get(Keys.LMSList)).toBe(JSON.stringify([LMS.NuTACT]));
    settingVault.removeLMS(LMS.NuTACT);
    expect(settingVault.LMSList).toEqual([]);
    expect(vault.get(Keys.LMSList)).toBe(JSON.stringify([]));
  });

  it('should handle UItheme', async () => {
    expect(settingVault.uiTheme).toEqual(UITheme.light);
    settingVault.uiTheme = UITheme.dark;
    expect(settingVault.uiTheme).toEqual(UITheme.dark);
    expect(vault.get(Keys.UITheme)).toBe(UITheme.dark);
  });

  it('should handle defaultAssignmentDuration', async () => {
    expect(settingVault.defaultAssignmentDuration).toEqual(Temporal.Duration.from({minutes: 30}));
    settingVault.defaultAssignmentDuration = Temporal.Duration.from({minutes: 60});
    expect(settingVault.defaultAssignmentDuration).toEqual(Temporal.Duration.from({minutes: 60}));
    expect(vault.get(Keys.defaultAssignmentDuration)).toBe(String(Temporal.Duration.from({minutes: 60})));
  });
})