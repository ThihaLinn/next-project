import { config } from "@/config";
import { LocationSlice, deleteLocationParam, newLocationParam, updateLocationParam } from "@/types/Location";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const initialState:LocationSlice = {
    locations: [],
    isLoading:false,
    Error:null
}

export const createLocation = createAsyncThunk(
    "menu/createLocation",
    async (newLocation:newLocationParam,thunkApi) => {
        const {onSuccess,...payload} = newLocation
        const response = await fetch(`${config.backofficeUrl}/location`,{
            method:"POST",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {location} = dataFromServer
        thunkApi.dispatch(addLocation(location))
        onSuccess && onSuccess()
        return location;
    }
)

export const updateLocation = createAsyncThunk(
    "locaion/updateLcoation",
    async (updatLocation:updateLocationParam,thunkApi) => {        
        const {onSuccess,...payload} = updatLocation
        const response = await fetch(`${config.backofficeUrl}/location`,{
            method:"PUT",
            headers:{
                "content-type":"appliction/json"
            },
            body:JSON.stringify(payload)
        })

        const dataFromServer = await response.json()
        const {location} = dataFromServer
        thunkApi.dispatch(replaceLocation(location))
        onSuccess && onSuccess()
        return location;
    }
)

export const deleteLocation = createAsyncThunk(
    "locaion/deleteLocation",
    async (updatLocation:deleteLocationParam,thunkApi) => {        
        const {onSuccess,...payload} = updatLocation
        const response = await fetch(`${config.backofficeUrl}/location?id=${payload.id}`,{
            method:"DELETE",
        })

        const dataFromServer = await response.json()
        const {location} = dataFromServer
        thunkApi.dispatch(removeLocation(payload.id))
        onSuccess && onSuccess()
        return location;
    }
)

export const locationSlice = createSlice({
    name:"location",
    initialState,
    reducers:{
        setLocation:(state,action:PayloadAction<Location[]>) => {
            state.locations = action.payload
        },
        addLocation:(state,action:PayloadAction<Location>) => {
            state.locations = [...state.locations,action.payload]
        },
        replaceLocation:(state,action:PayloadAction<Location>) => {
            state.locations = state.locations.map(location => location.id === action.payload.id ? action.payload : location)
        },
        removeLocation:(state,action:PayloadAction<number>) => {
            state.locations = state.locations.filter(location => location.id !== action.payload)
        }
    }
})

export const {setLocation,addLocation,replaceLocation,removeLocation} = locationSlice.actions

export default locationSlice.reducer