import { cleanup, render, screen, act } from '@testing-library/react';
import React, { useContext,FC } from 'react';
import { describe,it,expect,beforeEach,afterEach,beforeAll,afterAll } from '@jest/globals'
import { useVault } from './useVault';
import { vault } from './vault';
import { vaultCatchUpInterval } from '../../utils';

describe('useVault function', () => {
    it('should be defined', () => {
        expect(useVault).toBeDefined();
    })
    it('should return default value', () => {
        vault.setDefault('testkey','default value');
        const Child = () => {
            const [state, setState] = useVault('testkey');
            return <>{state}</>
        }
        render(<Child />);
        expect(screen.findByText('default value')).toBeTruthy();
    })
    it('should return valid value', () => {
        vault.set('testkey','test value');
        const Child = () => {
            const [state, setState] = useVault('testkey');
            return <>{state}</>
        }
        render(<Child />);
        expect(screen.findByText('test value')).toBeTruthy();
    })
    it('should inspire rerender on vault value change', async () => {
        vault.set('testkey','test value');
        vault.set('another','another test value');
        const Child = () => {
            const [state, setState] = useVault('testkey');
            return <>{state}</>
        }
        
        render(<Child />);
        expect(screen.findByText('test value')).toBeTruthy();

        vault.set('another','updated another test value');
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*2));
        })
        expect(screen.findByText('test value')).toBeTruthy();
        
        vault.set('testkey','updated test value');
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, vaultCatchUpInterval*2));
        })
        expect(screen.findByText('updated test value')).toBeTruthy();
    })
})