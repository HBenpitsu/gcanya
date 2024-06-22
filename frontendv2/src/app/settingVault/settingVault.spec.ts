import { settingVault, __local__ } from './storageAccess';
import { LMS, Interval_OfCatchUpWithLocalStorage_InMilliSec } from '../../utils';

describe('settingVault', () => {
  it('should be defined', () => {
    expect(settingVault).toBeDefined();
  });
  it('should set values and timestamps', async () => {
    settingVault.setColorTheme('red');
    let previousUpdateTimestamp = settingVault.updatedAt();
    await new Promise((resolve) => setTimeout(resolve, 100));
    settingVault.setUsingLMS([LMS.NuTACT]);

    expect(settingVault.getColorTheme()).toBe('red');
    expect(settingVault.getUsingLMS()).toEqual([LMS.NuTACT]);
    expect(settingVault.updatedAt()).not.toBe(previousUpdateTimestamp);
  });
  it('should call catchUpHandler', async () => {
    let catchUpCalled = false;
    settingVault.addCatchUpHandler(() => {
      catchUpCalled = true;
    });
    localStorage.setItem(__local__.Key.timestamp, 'outofdate');
    await new Promise((resolve) =>
      setTimeout(resolve, Interval_OfCatchUpWithLocalStorage_InMilliSec * 3),
    );
    expect(catchUpCalled).toBe(true);
  });
});
