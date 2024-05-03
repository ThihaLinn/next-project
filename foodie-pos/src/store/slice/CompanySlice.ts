import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Company } from '@prisma/client';

export interface CompanySlice{
    company:Company | null,
    isloading:boolean,
    error:Error | null
}

const initialState:CompanySlice ={
    company:null, 
    isloading:false,
    error:null
}

export const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{
      setCompany:(state,action:PayloadAction<Company>) => {
        state.company = action.payload
      }
    },
    
})

export const {setCompany} = companySlice.actions

export default companySlice.reducer