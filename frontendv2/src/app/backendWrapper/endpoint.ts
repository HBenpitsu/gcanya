import { AssignmentRecord } from "../assignmentRecord";

let BACKEND_URL: string;

// BACKEND_URL = "http://localhost:8080";
BACKEND_URL = "https://jack.hbenpitsu.net";

export namespace endpoint{

export async function register(assignmentRecord: AssignmentRecord) {
    let fetched = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        body: JSON.stringify({
            course_name:assignmentRecord.course_name,
            title_of_assignment:assignmentRecord.title,
            dueDate:assignmentRecord.dueDate.toInstant().toString(),
            duration:assignmentRecord.duration.toString(),
            description:assignmentRecord.description,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (fetched.status == 200) {
        return await fetched.json();
    } else if (fetched.status == 401) {
        return {"detail": "Unauthorized"};
    } else {
        throw new Error(await fetched.text());
    }
}

export async function getAuthFlowState() {
    let fetched = await fetch(`${BACKEND_URL}/getAuthFlowState`);
    if (fetched.status == 200) {
        return await fetched.json();
    } else {
        throw new Error(await fetched.text());
    }
}

export async function getTokens() {
    let fetched = await fetch(`${BACKEND_URL}/getTokens`);
    if (fetched.status == 200) {
        return await fetched.json();
    } else if (fetched.status == 401 || fetched.status == 400) {
        return {"detail": "Unauthorized"};
    } else if (fetched.status == 408) {
        return {"detail": "Timeout"};
    } else {
        throw new Error(await fetched.text());
    }
}

export async function refreshTokens(){
    let fetched = await fetch(`${BACKEND_URL}/refreshTokens`);
    if (fetched.status == 200) {
        return await fetched.json();
    } else if (fetched.status == 401 || fetched.status == 400) {
        return {"detail": "Unauthorized"};
    } else {
        throw new Error(await fetched.text());
    }
}

export async function revokeTokens(){
    let fetched = await fetch(`${BACKEND_URL}/revokeTokens`);
    if (fetched.status == 200) {
        return await fetched.json();
    } else if (fetched.status == 401 || fetched.status == 400) {
        return {"detail": "Unauthorized"}; 
    } else {
        throw new Error(await fetched.text());
    }
}

}