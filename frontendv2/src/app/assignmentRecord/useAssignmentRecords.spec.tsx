import { render, screen, act } from '@testing-library/react';
import { describe,it,expect } from '@jest/globals'
import { sleep } from '../../utils';
import { useAssignmentRecordVault } from './useAssignmentRecords';
import { vaultCatchUpInterval } from '../vault/vault';
import { AssignmentRecordVault } from './assignmentRecordVault';
import { AssignmentRecord } from './assignmentRecord';

describe('useSetting functions ', () => {
    it('should be defined', () => {
        expect(useAssignmentRecordVault).toBeDefined();
    })

    it ('should be able to be used in components', async () => {
        
        const outerVault = new AssignmentRecordVault();

        const Child = () => {
            const assignmentRecordVault = useAssignmentRecordVault();
            return <>{JSON.stringify(assignmentRecordVault.all().map(rec=>rec.unwrap()))}</>
        }
        render(<Child />);

        // screen.debug();
        
        act(() => {
            outerVault.push({id: '1', title: 'test'});
        });

        // screen.debug();
        
        act(() => {
            outerVault.push({id: '2', title: 'test2'});
        });

        // screen.debug();

        act(() => {outerVault.drop((rec)=>rec.id == '1');});

        // screen.debug();

    })
})