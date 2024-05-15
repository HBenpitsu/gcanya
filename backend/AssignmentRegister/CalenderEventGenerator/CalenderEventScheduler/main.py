from .config import DEFUALT_CELL_INTERVAL,DEFAULT_TASK_MARGIN,DEFAULT_MINIMUM_CHUNK_SIZE,DEFAULT_SUBMISSION_MARGIN
from datetime import timedelta
from ...InterpackageObject.datetime_expansion import timespan
from ...InterpackageObject.dataTransferObject import SleepSchedule
from ...GoogleCalenderAPIWrapper import GoogleCalenderAPIClient
from .bitmap import FreeBusyBitMap
from .bitmapFactory import avoid_task_overlapping, avoid_sleeping_time, make_margin
from typing import Any,List,AsyncGenerator,Callable,Coroutine

class Scheduler:
    #scope <- Schedulerが考慮する時間の範囲
    margined_scope:timespan
    interval:timedelta
    #spec <- どのようなchunkを返すかを定める関数(またそのために必要な情報)。
    event_bitmap:FreeBusyBitMap
    sleeping_bitmap:FreeBusyBitMap
    event_bitmap_with_task_margin:FreeBusyBitMap
    
    minimum_chunk_size:timedelta
    submission_margin:timedelta

    async def __new__(cls, 
        scope: timespan, 
        google_calender_api_client:GoogleCalenderAPIClient, 
        sleepSchedule:SleepSchedule,
        interval:timedelta = DEFUALT_CELL_INTERVAL,
        submission_margin:timedelta = DEFAULT_SUBMISSION_MARGIN,
        task_margin:timedelta = DEFAULT_TASK_MARGIN,
        minimum_chunk_size:timedelta = DEFAULT_MINIMUM_CHUNK_SIZE
    ): # コルーチンを返すため、__init__ではなく__new__をオーバーライドする。
        self = super().__new__(cls)
        

        self.margined_scope = timespan(scope.start, scope.end - submission_margin)
        self.interval = interval


        self.event_bitmap = await avoid_task_overlapping(self.margined_scope,google_calender_api_client,interval)
        self.event_bitmap_with_task_margin = make_margin(self.event_bitmap, task_margin)
        self.sleeping_bitmap = await avoid_sleeping_time(self.margined_scope,sleepSchedule,interval)

        self.minimum_chunk_size = minimum_chunk_size
        
        return self
    
    # ひと続きの暇な時間(timespan型)をchunkと呼称している。
    # "暇な時間"とはどのようなものかを定める関数をspec(ification)あるいはchunk_specと呼称している。

    async def _get_free_chunks_of(self, bitmap:FreeBusyBitMap, required_task_duration:timedelta, minimum_chunk_size:timedelta)->List[timespan]:
        """
        条件(bitmapがfreeを示していること, required_task_duration, minimum_chunk_size)を満たすようなchunkを返す。ただしそのようなchunkのとり方が存在しない場合は空のリストを返す。
        """
        result = []
        current_task_duration = timedelta(0)
        async for chunk in bitmap.get_free_chunks():
            if chunk.duration() >= minimum_chunk_size:
                if current_task_duration + chunk.duration() >= required_task_duration:
                    result.append(
                        timespan(chunk.start, 
                                 max(
                                     chunk.start + required_task_duration - current_task_duration,
                                     chunk.start + minimum_chunk_size
                                 )# minimum_chunk_sizeよりも短いchunkは返さない。（代わりにminimum_chank_sizeのchunkを返す。）
                        )
                    )
                    return result
                else:
                    current_task_duration += chunk.duration()
                    result.append(chunk)
        return []

    async def _primary_chunk_spec(self, required_duration:timedelta):
        return await self._get_free_chunks_of(
            self.event_bitmap_with_task_margin|self.sleeping_bitmap, 
            required_duration, 
            self.minimum_chunk_size
        )

    async def _secondary_chunk_spec(self, required_duration:timedelta):
        return await self._get_free_chunks_of(
            self.event_bitmap, 
            required_duration, 
            self.minimum_chunk_size
        )

    async def _last_chunk_spec(self, required_duration:timedelta):
        return [timespan(self.margined_scope.start + self.margined_scope.duration() - required_duration, self.margined_scope.end)]
    
    async def get_chunks_fulfill_specs(self, required_duration:timedelta):
        """primary,secondary,lastの順に取得を試み、条件を満たすchunkのリストが見つかったらそれを返す。"""

        specs: List[Callable[[timedelta],Coroutine[Any,Any,List[timespan]]]] = [
            self._primary_chunk_spec,
            self._secondary_chunk_spec,
            self._last_chunk_spec
        ]

        for spec in specs:
            result = await spec(required_duration)
            if result: return result # specが満たされなかった場合空リストが返るので、その場合は次のspecを試す。

        