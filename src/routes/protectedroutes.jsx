import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const UUU = useSelector((state) => state);
    console.log(UUU)
    let location = useLocation();
    const user = useSelector((state) => state.auth.currentUser);

    if(!user) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;