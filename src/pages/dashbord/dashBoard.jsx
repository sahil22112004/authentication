import { useSelector, useDispatch } from 'react-redux'
import {handleLogout} from '../../redux/slices/authslice.js'
import { useNavigate } from "react-router";




function dashBoard(){
    let users = useSelector((state) => state.auth.currentUser.username)
    const dispatch = useDispatch()
    let navigate = useNavigate();



    function handleLogoutbutton(){
        console.log("working buton")
        dispatch(handleLogout())
        navigate("/")


    }
    return(
        <>
        <h1>welcome to my site {users} </h1><br/>
        <button onClick={()=>handleLogoutbutton()}>logout</button>
        </>
    )
}

export default dashBoard