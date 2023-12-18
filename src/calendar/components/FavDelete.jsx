import { useSelector } from "react-redux"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"




export const FavDelete = () => {

    const {startDeletingEvent, hasEventSelected} = useCalendarStore();

    const handleDelete = () => {
      startDeletingEvent();
    }
    
  return (
    <button style={{display: hasEventSelected ? '' : 'none'}} onClick={handleDelete} className="btn btn-danger fab-danger">
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}