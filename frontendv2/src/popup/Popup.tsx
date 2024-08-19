import { useContext, useRef } from "react";
import { actionHandlerContext,contentContext } from "./PopupModel";
import { AuthChip } from '../component/authorizer';

const Popup = () => {
  const content = useContext(contentContext);
  const actionHandler = useContext(actionHandlerContext);

  return <>
    <button onClick={actionHandler.onAllAssignmentsButtonClicked}>
      課題全部
    </button>
    <button onClick={actionHandler.onFavoriteCoursesButtonClicked}>
      お気に入り
    </button>
    <button onClick={actionHandler.onAllCoursesButtonClicked}>
      全コース
    </button>
    <button onClick={actionHandler.onCourseDetailButtonClicked}>
      コース詳細
    </button>
    <input value={content.textInput} onChange={actionHandler.onInputChanged} type="text" />
    <div>
      {JSON.stringify(content)}
    </div>
    <div>
      認証チップ
      <AuthChip />
    </div>
  </>
};

export default Popup;
