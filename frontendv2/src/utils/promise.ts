export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const allowBlocking = async ()=>{sleep(0);};