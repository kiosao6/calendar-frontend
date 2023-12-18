import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"

import { AuthRoutes } from "../auth/router/AuthRoutes"
import { CalendarRoutes } from "../calendar/routes/CalendarRoutes"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"
import { useSelector } from "react-redux"




export const AppRouter = () => {

    const {status} = useSelector(state => state.auth)

    const {  checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if(status === 'checking'){
        return (
          <h3>Cargando...</h3>
        )
    }
    


    return (
      <Routes>

        {
            (status === 'not-authenticated')
            ? <Route path="/auth/*" element={<AuthRoutes />}/>
            : <Route path="/*" element={<CalendarRoutes />}/>
        }
            <Route path="/*" element={<Navigate to="/auth/login" />} />

      </Routes>
    )
}