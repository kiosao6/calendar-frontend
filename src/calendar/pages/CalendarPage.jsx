import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import enUS from 'date-fns/locale/en-US'

import { addHours } from 'date-fns'
import { Navbar, CalendarEvent, CalendarModal, FavAddNew, FavDelete } from "../"
import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useEffect } from 'react'
import { useAuthStore } from '../../hooks'




export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  useEffect(() => {  
      startLoadingEvents();
  }, [])
  

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');


 
  const onDoubleClick = (e) => {
      console.log({doubleClick: e});
      openDateModal();
  }
  const onSelect = (e) => {
      console.log({click: e});
      setActiveEvent(e);
  }
  const onViewChange = (e) => {
      console.log({viewChange: e});
      localStorage.setItem('lastView', e);

      
  }
 
  const eventStyleGetter = (event, start, end, isSelected) => {

      const isMyEvent = ( user.uid === event.user._id ) || (user.uid === event.user.uid);



      const style = {
          backgroundColor: isMyEvent ? '#347CF7' : '#465660',
          borderRadious: '0px',
          opacity: 0.8,
          color: 'white'
      }

      return {
          style
      }
  }
  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter= {eventStyleGetter}
        messages = { getMessagesES() }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
    />

      <CalendarModal />
      <FavAddNew />
      <FavDelete />
    
    </>
  )
}