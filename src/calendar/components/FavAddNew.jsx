import { useSelector } from "react-redux"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { addHours } from "date-fns"




export const FavAddNew = () => {

    const {openDateModal} = useUiStore()
    const { setActiveEvent } = useCalendarStore()

    const handleClick = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
               id: '123',
               name: 'Gabriel'
            }
          
          })
        openDateModal();
    }
    
  return (
    <button onClick={handleClick} className="btn btn-primary fab">
        <i className="fas fa-plus"></i>
    </button>
  )
}