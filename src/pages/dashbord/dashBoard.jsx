import { useSelector, useDispatch } from 'react-redux'


function dashBoard(){
    let users = useSelector((state) => state.auth.currentUser.username)
    return(
        <>
        <h1>welcome to my site {users} </h1>
        </>
    )
}

export default dashBoard