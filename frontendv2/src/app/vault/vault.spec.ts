import { vault,timestampSignature } from './vault';
import { vaultCatchUpInterval } from './vault';

describe('vault', () => {
  it('should be defined', () => {
    expect(vault).toBeDefined();
  });
  it('should handle storage', () => {
    vault.set('key', 'value');
    expect(vault.get('key')).toBe('value');
  });
  it('should cooperate with each other process. and updateListeners should be called.', async () => {
    vault.set('key', 'value');
      
    let updateListenerCalled = 0;
    vault.addUpdateListener('key', async (value) => {
      updateListenerCalled++;
    });
    vault.addUpdateListener('key2', async (value) => {
      updateListenerCalled++;
    });
    let anotherListenerCalled = false;
    vault.addUpdateListener('key', async (value) => {
      anotherListenerCalled = true;
    });
    
    vault.set('key','value4');
    localStorage.setItem('key2', 'value2');
    localStorage.setItem('key', 'value3');
    localStorage.setItem(timestampSignature, 'outOfDate');
    
    await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*2));

    expect(vault.get('key2')).toBe('value2');
    expect(vault.get('key')).toBe('value3');

    expect(updateListenerCalled).toBe(3);
    expect(anotherListenerCalled).toBe(true);
  })

  it('handle default value', async () => {
    vault.setDefault('empty', 'yes it is empty');
    expect(vault.get('empty')).toBe('yes it is empty');
    vault.set('empty', 'no it is not empty');
    expect(vault.get('empty')).toBe('no it is not empty');

    vault.setDefault('empty2', 'yes it is empty');
    expect(vault.get('empty2')).toBe('yes it is empty');
    
    localStorage.setItem('empty2', 'no it is not empty');
    localStorage.setItem(timestampSignature, 'outOfDate');
    
    await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*2));

    expect(vault.get('empty2')).toBe('no it is not empty');
  });
})