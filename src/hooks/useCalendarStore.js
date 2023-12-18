import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDate } from "../helpers";



export const useCalendarStore = () => {

    const { user } = useSelector(state => state.auth); 
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state) => state.calendar);


    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    } 

    const startSavingEvent = async(calendarEvent) => {

      try {

        if(calendarEvent.id){
          await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
          dispatch(onUpdateEvent({...calendarEvent, user }))

          return;
        }

        const { data } = await calendarApi.post('/events', calendarEvent);
        console.log( data );

        dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user  }))

      } catch (error) {
          console.log(error);
          Swal.fire('Error al guardar', error.response.data.msg, 'error');
      }
      

    };

    const startDeletingEvent = async() => {

        try {

            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())

        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async() => {

        try {

            const { data } = await calendarApi.get('/events');
            console.log( data );

            const events = convertEventsToDate(data.eventos)
            console.log(events)

            dispatch( onLoadEvents( events ) )

        } catch (error) {
            console.log(error)
        }
    }

    return {
      events,
      activeEvent,
      hasEventSelected: !!activeEvent,

      // Events
      setActiveEvent,
      startSavingEvent,
      startDeletingEvent,
      startLoadingEvents
    };
}