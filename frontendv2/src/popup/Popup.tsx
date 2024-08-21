
import { AuthChip, AuthFlagChip } from '../component/authorization';
import { AssignmentList } from "../component/assignmentList";
import { registerAllPendingAssignments } from '../app/assignmentRegisterer/registerer';

const Popup = () => {
  return <>
    <div>
      <AssignmentList />
      <AuthChip />
      <AuthFlagChip />
      <button onClick={()=>{
        registerAllPendingAssignments();
      }}>未登録の課題を登録</button>
    </div>
  </>
};

export default Popup;
