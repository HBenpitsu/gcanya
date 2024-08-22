import { Temporal } from 'temporal-polyfill';
import { AssignmentRecord } from './assignmentRecord';
import { AssignmentRecordVault } from './assignmentRecordVault';

describe(
    'assignmentRecord', ()=>{
        it('should be defined', ()=>{
            expect(AssignmentRecord).toBeDefined();
        });

        it('should add record', ()=>{
            let testRepo = new AssignmentRecordVault();
            
            testRepo.push({id: '1', title: 'test'});

            // console.log(JSON.stringify(
            //     testRepo.all()
            //     .map((rec)=>rec.unwrap())
            // ));
        });

        it('should filter records', ()=>{
            let testRepo = new AssignmentRecordVault();
            
            testRepo.push({id: '1', title: 'test3'});
            testRepo.push({id: '2', title: 'test4'});
            testRepo.push({id: '3', title: 'test5'});
            testRepo.push({id: '4', title: 'test6'});

            testRepo.filter(
                (rec)=>Number(rec.id) == 4
            )[0].dueDate = Temporal.Now.zonedDateTimeISO("UTC");

            // console.log(JSON.stringify(
            //     testRepo.filter(
            //         (rec)=>Number(rec.id) > 2
            //     ).map((rec)=>rec.unwrap())
            // ));
        });

        it('should drop records', ()=>{
            let testRepo = new AssignmentRecordVault();

            testRepo.push({id: '1', title: 'test3'});
            
            testRepo.drop((rec)=>rec.id == '1');

            // console.log(JSON.stringify(
            //     testRepo.all()
            //     .map((rec)=>rec.unwrap())
            // ));
        });

        it('should sort records', ()=>{
            let testRepo = new AssignmentRecordVault();

            testRepo.push({id: '5', title: 'test1'});
            testRepo.push({title: 'test2'});

            testRepo.sortInTitle();

            // console.log(JSON.stringify(
            //     testRepo.all()
            //     .map((rec)=>rec.unwrap())
            // ));
        })

        it('should sync records', ()=>{
            let testRepo = new AssignmentRecordVault();
            let another = new AssignmentRecordVault();
            
            another.push(
                {title: 'another', id: '0'}
            );

            // console.log(JSON.stringify(
            //     testRepo.all()
            //     .map((rec)=>rec.unwrap())
            // ));

            let rec = another.filter(
                (rec) => rec.title == 'another'
            )[0];
            rec.id = '20';

            // console.log(JSON.stringify(
            //     testRepo.all()
            //     .map((rec)=>rec.unwrap())
            // ));
            
        })
    },
)
