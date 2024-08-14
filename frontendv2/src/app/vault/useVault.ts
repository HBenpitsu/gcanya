// vaultの変更に合わせてコンポーネントがリレンダーされるようにする。
import { useEffect, useState } from 'react';
import { vault } from './vault';

export function useVault(key: string): [string, (value: string) => void] {
    const [state,setState] = useState<string>();
    useEffect(() => {
        setState(vault.get(key));
        vault.addUpdateListener(key, async (value) => {
            setState(value);
        });
    },[]);
    return [state || '', (value: string) => vault.set(key, value)];
}
