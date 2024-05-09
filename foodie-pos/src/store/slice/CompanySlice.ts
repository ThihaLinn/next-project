import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Company } from "@prisma/client";
import { config } from "@/config";
import { updateCompanyParam } from "@/types/company";

export interface CompanySlice {
  company: Company | null;
  isloading: boolean;
  error: Error | null;
}

const initialState: CompanySlice = {
  company: null,
  isloading: false,
  error: null,
};

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (updateCompany: updateCompanyParam, thunkApi) => {
    const { onSuccess, ...payload } = updateCompany;
    const response = await fetch(`${config.backofficeUrl}/setting`, {
      method: "PUT",
      headers: {
        "content-type": "appliction/json",
      },
      body: JSON.stringify(payload),
    });

    const dataFromServer = await response.json();
    const { company } = dataFromServer;
    thunkApi.dispatch(replaceCompany(company));
    onSuccess && onSuccess();
    return company;
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
    replaceCompany: (state, action: PayloadAction<Company>) => {},
  },
});

export const { setCompany, replaceCompany } = companySlice.actions;

export default companySlice.reducer;
