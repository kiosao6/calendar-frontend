import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLoging, onLogout, onLogoutCalendar } from "../store";





export const useAuthStore = () => {
    
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {

        dispatch( onChecking() );
        
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onLoging( { name: data.name, uid: data.uid }) );

            console.log(data)

        } catch (error) {

            dispatch( onLogout('Credenciales incorrectas') );
            console.log(error);

            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 100);
        }
    }

    const startRegister = async( { name, email, password }) => {

        dispatch( onChecking() );

        try {
            
            const { data } = await calendarApi.post('/auth/new', { name, email, password }) 
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onLoging({name: data.name, uid: data.uid }) );
            console.log(data)

        } catch (error) {

            dispatch( onLogout('Credenciales erróneas'))
            console.log(error);
        }

    }

    const checkAuthToken = async() => {

        const token = localStorage.getItem('token');
        
        if(!token) return dispatch( onLogout() );

        try {
            
            const { data } = await calendarApi.get('/auth/renew');
            console.log(data)
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( onLoging({name: data.name, uid: data.uid }) );


        } catch (error) {
            console.log(error)
            localStorage.clear();
            dispatch( onLogout() )
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() )
        dispatch( onLogoutCalendar())
    }

    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}