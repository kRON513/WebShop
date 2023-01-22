import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            //user.setIsAuth(true)


           let auth = localStorage.getItem('auth')
             console.log(user.isAuth)
              if (auth === 'true')
               {
                    user.setIsAuth(true)
               }
               else
                    user.setIsAuth(false)
            let admin = localStorage.getItem('admin')
            if (admin === 'true')
            {
                user.setIsAdmin(true)
            }
            else
                user.setIsAdmin(false)

        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
