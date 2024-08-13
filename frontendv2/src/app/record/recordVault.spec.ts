import { Record } from "./record";
import { RecordVault } from "./recordVault";

describe(
    'recordVault', ()=>{
        it('should be defined', ()=>{
            expect(RecordVault).toBeDefined();
        });

        it('should add record', ()=>{
            let testRepo = new RecordVault('test');
            
            testRepo.pushObj(
                {name: 'test', value: 1}
            );
            testRepo.pushObj(
                {name: 'test2', value: 2}
            );
            testRepo.pushObj(
                {name: 'test3', value: 3}
            );
            
            testRepo.push(
                Record.parseObj({name: 'test4', value: 4})
            );

            testRepo.push(
                Record.parseStr("{\"fields\": [\"name\", \"value\"], \"values\": [\"test5\", 5]}")
            );

            // console.log(testRepo.all());
        });

        it('should filter records', ()=>{
            let testRepo = new RecordVault('test');
            
            testRepo.pushObj(
                {name: 'test', value: 1}
            );
            testRepo.pushObj(
                {name: 'test2', value: 2}
            );
            testRepo.pushObj(
                {name: 'test3', value: 3}
            );
            
            testRepo.push(
                Record.parseObj({name: 'test4', value: 4})
            );

            testRepo.push(
                Record.parseStr("{\"fields\": [\"name\", \"value\"], \"values\": [\"test5\", 5]}")
            );

            // console.log(testRepo.filter((rec: Record) => rec.get('value') > 3));
        });

        it('should drop records', ()=>{
            let testRepo = new RecordVault('test');
            
            testRepo.drop((rec: Record) => {return rec.get('value') == 3});

            console.log(testRepo.all());
        });

        it('should sort records', ()=>{
            let testRepo = new RecordVault('test');
            
            testRepo.pushObj(
                {name: 'test', value: 0}
            );
            testRepo.pushObj(
                {name: 'test2', value: 0}
            );
            testRepo.pushObj(
                {name: 'test3', value: 0}
            );

            console.log(testRepo.sort((a: Record, b: Record) => a.get('value') - b.get('value')));
        })
    },
)