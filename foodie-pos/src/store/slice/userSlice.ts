import { User } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UserSlice{
    users: User[]
    isLoading:Boolean
    Error:null 
}

export const initialState:UserSlice = {
    users: [],
    isLoading:false,
    Error:null
}


export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<User>) => {
            state.users.push(action.payload)
        }
    }
})

export const {addUser} = UserSlice.actions

export default UserSlice.reducer