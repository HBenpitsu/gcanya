from ..InterpackageObject.dataTransferObject import Assignment,CalenderEvent
from ..InterpackageObject.datetime_expansion import timespan
from ..GoogleCalenderAPIWrapper import GoogleCalenderAPIClient
from datetime import datetime,timedelta,timezone,time
from .CalenderEventScheduler import Scheduler
from .config import DEFAULT_SLEEP_SCHEDULE
from .exceptions import AssignmentOverDue

class CalenderEventGenerator:
    def __init__(self,APIClient:GoogleCalenderAPIClient):
        self.google_calender_api_client = APIClient
    async def generate_events(self, assignment:Assignment):
        if assignment.dueDate < datetime.now(timezone.utc):
            raise AssignmentOverDue()

        scheduler = await Scheduler(
            timespan(
                datetime.now(timezone.utc),
                assignment.dueDate
            ),
            self.google_calender_api_client,
            sleepSchedule=DEFAULT_SLEEP_SCHEDULE
        )
        chunks = await scheduler.get_chunks_fulfill_specs(assignment.duration)
        for chunk in chunks:
            yield CalenderEvent(
                title=assignment.title_of_assignment,
                description=assignment.description,
                start=chunk.start,
                end=chunk.end
            )
