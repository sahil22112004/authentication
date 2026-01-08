import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    users: [],
    currentUser: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    handleRegister(state,action){
        console.log(action.payload)
        state.users.push({
            username:action.payload.username,
            password:action.payload.password
        })
        localStorage.setItem("users", JSON.stringify(state.users));
        console.log("working")
    },
    handleCurrentUser (state,action){
        state.currentUser=action.payload
        // state.username=action.payload.username,
        // state.password=action.payload.password
        console.log(state)
    },
    handleLogout (state){
      state.currentUser=null
      console.log("working handler",state.currentUser)
    } 

    },
  },
)

export const { handleRegister,handleCurrentUser,handleLogout} = authSlice.actions
export default authSlice.reducer