import { config } from "@/config"
import { TableSlice, deleteTableParams, newTableParams, updateTableParams } from "@/types/table"
import { Table } from "@prisma/client"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState : TableSlice = {
    tables:[],
    isloading:false,
    error:null
}

export const createTable = createAsyncThunk(
    "table/createTable",
    async (newMenu:newTableParams,thunkApi) => {
        const {onSuccess,...payload} = newMenu
        const response = await fetch(`${config.backofficeUrl}/table`,{
            method:"POST",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {table} = dataFromServer
        thunkApi.dispatch(addTable(table))
        onSuccess && onSuccess()
        return table;
    }
)

export const updateTable2 = createAsyncThunk(
    "table/updateTable",
    async (updateTable:updateTableParams,thunkApi) => {        
        const {onSuccess,...payload} = updateTable
        const response = await fetch(`${config.backofficeUrl}/table`,{
            method:"PUT",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {table} = dataFromServer

        thunkApi.dispatch(replaceTable(table))
        onSuccess && onSuccess()
        return table;
    }
)

export const deleteTable = createAsyncThunk(
    "table/deleteTable",
    async (deleteMenu:deleteTableParams,thunkApi) => {        
        const {onSuccess,...payload} = deleteMenu
        const response = await fetch(`${config.backofficeUrl}/table?id=${payload.id}`,{
            method:"DELETE",
        })

        thunkApi.dispatch(removeTable(payload.id))
        onSuccess && onSuccess()
    }
)


export const tableSlice = createSlice({
    name:"table",
    initialState,
    reducers:{
        setTable:(state,action:PayloadAction<Table[]>) => {
            state.tables = action.payload
        },
        addTable:(state,action:PayloadAction<Table>) => {
            state.tables = [...state.tables,action.payload]
        },
        replaceTable:(state,action:PayloadAction<Table>) => {
            state.tables = state.tables.map(table => table.id === action.payload.id ? action.payload : table)
        },
        removeTable:(state,action:PayloadAction<number>) => {
            state.tables = state.tables.filter(table => table.id !== action.payload)
        }
    }
})

export const {setTable,addTable,replaceTable,removeTable} = tableSlice.actions

export default tableSlice.reducer
