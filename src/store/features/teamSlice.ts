import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { teamsIndexService } from "../../services";
import { ErrorResponseType, TeamModelType } from "../../types";
import { normalizeAxiosError } from "../../utils";

interface TeamState {
  loading: boolean;
  fetchError?: ErrorResponseType;
  teams: TeamModelType[];
}

const initialState: TeamState = {
  loading: false,
  teams: [],
};

export const fetchTeams = createAsyncThunk<
TeamModelType[],
  void,
  {
    rejectValue: ErrorResponseType;
  }
>("team/fetchTeams", async (_, thunkAPI) => {
  try {
    const response = await teamsIndexService();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(normalizeAxiosError(err));
  }
});

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = true;
      state.fetchError = undefined;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.loading = false;
      state.fetchError = action.payload;
    });
  },
});