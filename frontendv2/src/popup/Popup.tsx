
import { AssignmentList, AuthChip, AuthFlagChip } from "../component";
import { foreground as registerer } from '../app/backendWrapper/registerer';

const Popup = () => {
  return <>
    <div>
      <AssignmentList />
      <AuthChip />
      <AuthFlagChip />
      <button onClick={()=>{
        registerer.registerAllPendingAssignments();
      }}>未登録の課題を登録</button>
    </div>
  </>
};

export default Popup;
