import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    currentUser: {}
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
    }

    // todoAdded(state, action) {
    //   state.push({
    //     id: action.payload.id,
    //     text: action.payload.text,
    //     completed: false,
    //   })
    // },
    // todoToggled(state, action) {
    //   const todo = state.find((todo) => todo.id === action.payload)
    //   todo.completed = !todo.completed
    },
  },
)

export const { handleRegister,handleCurrentUser} = authSlice.actions
export default authSlice.reducer