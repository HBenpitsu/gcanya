from fastapi import FastAPI,Request,Response
from pydantic import BaseModel
from .InterpackageObject.dataTransferObject import Assignment,EventId
from .CalenderEventGenerator import CalenderEventGenerator
from .CalenderEventRegister import CalenderEventRegister
from datetime import datetime,timedelta
from AuthHandler import GoogleAPITokenBundle
from AuthHandler.GoogleAPITokenHandler.exceptions import TokenNotFound
from .GoogleCalenderAPIWrapper import GoogleCalenderAPIClient
from typing import List

class AssignmentHandler:
    def __init__(self, app:FastAPI = FastAPI()):
        self.APP = app
        self.defEndpoints()

    class __assignmentRegisterCommand(BaseModel):
        course_name:str
        title_of_assignment:str
        dueDate:datetime
        duration:timedelta
        description:str|None = None


    def defEndpoints(self):
        
        @self.APP.post("/register")
        async def registerAssignmentEntry(request:Request,response:Response,command:self.__assignmentRegisterCommand):
            assignment = Assignment(
                course_name=command.course_name,
                title_of_assignment=command.title_of_assignment,
                dueDate=command.dueDate,
                duration=command.duration,
                description=command.description
            )
            tokenBundle = GoogleAPITokenBundle.from_dict(request.cookies)
            GoogleAPI_client = GoogleCalenderAPIClient(tokenBundle)

            event_register = CalenderEventRegister(GoogleAPI_client)
            event_generator = CalenderEventGenerator(GoogleAPI_client)
            
            event_ids:List[EventId] = []
            async for event in event_generator.generate_events(assignment):
                event_ids.append(await event_register.register(event))
            return {"detail":"success","event_ids":event_ids}


            