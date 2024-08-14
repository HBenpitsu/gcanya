import { FC, createContext, useEffect, useMemo, useRef, useState } from "react";
import { tactAPI } from "../app/assignmentFetcher/TACT/tactAPIWrapper";

class Prop{
    children: React.ReactNode;
}
const initialValueOfContent = {
    content: {},
    textInput: ''
}
export const contentContext = createContext(initialValueOfContent)
export const actionHandlerContext = createContext({
    onAllAssignmentsButtonClicked: () => {},
    onFavoriteCoursesButtonClicked: () => {},
    onAllCoursesButtonClicked: () => {},
    onCourseDetailButtonClicked: () => {},
    onInputChanged: (e: React.ChangeEvent<HTMLInputElement>) => {}
})
export const UsePopupModel:FC<Prop> = ({children}) => {
    const [data,setData] = useState(initialValueOfContent);
    
    const actionHandler = {
        onAllAssignmentsButtonClicked: () => {
            tactAPI.allAssignments().then((json) => {setData({...data,content: json});});
        },
        onFavoriteCoursesButtonClicked: () => {
            tactAPI.favoriteCourses().then((json) => {setData({...data,content: json});});
        },
        onAllCoursesButtonClicked: () => {
            tactAPI.allCourses().then((json) => {setData({...data,content: json});});
        },
        onCourseDetailButtonClicked: () => {
            tactAPI.courseDetail(data.textInput).then((json) => {setData({...data,content: json});});
        },
        onInputChanged: (e: React.ChangeEvent<HTMLInputElement>) => {
            setData({...data,textInput: e.target.value});
        }
    };

    return (
        <actionHandlerContext.Provider value={actionHandler}>
        <contentContext.Provider value={data}>
        {children}
        </contentContext.Provider>
        </actionHandlerContext.Provider>
    );
}