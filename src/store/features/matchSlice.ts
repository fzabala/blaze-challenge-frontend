import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { matchesIndexService } from "../../services";
import { ErrorResponseType, MatchModelType } from "../../types";
import { normalizeAxiosError } from "../../utils";

interface MatchState {
  loading: boolean;
  fetchError?: ErrorResponseType;
  matches: MatchModelType[];
}

const initialState: MatchState = {
  loading: false,
  matches: [],
};

export const fetchMatches = createAsyncThunk<
MatchModelType[],
  {teamId: number},
  {
    rejectValue: ErrorResponseType;
  }
>("match/fetchMatchs", async (params, thunkAPI) => {
  try {
    const response = await matchesIndexService(params.teamId);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(normalizeAxiosError(err));
  }
});

export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMatches.pending, (state) => {
      state.loading = true;
      state.fetchError = undefined;
    });
    builder.addCase(fetchMatches.fulfilled, (state, action) => {
      state.loading = false;
      state.matches = action.payload;
    });
    builder.addCase(fetchMatches.rejected, (state, action) => {
      state.loading = false;
      state.fetchError = action.payload;
    });
  },
});