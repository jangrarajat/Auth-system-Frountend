import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefeshHandler({setIsAuthed}) {

    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthed(true)
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('home', { replace: false });
            }
        }
    }, [location, navigate])

    return (
        null
    )
}

export default RefeshHandler
