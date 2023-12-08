import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { playersIndexService } from "../../services";
import { ErrorResponseType, PlayerModelType } from "../../types";
import { normalizeAxiosError } from "../../utils";

interface PlayerState {
  loading: boolean;
  fetchError?: ErrorResponseType;
  players: PlayerModelType[];
}

const initialState: PlayerState = {
  loading: false,
  players: [],
};

export const fetchPlayers = createAsyncThunk<
PlayerModelType[],
  {teamId: number},
  {
    rejectValue: ErrorResponseType;
  }
>("player/fetchPlayers", async (params, thunkAPI) => {
  try {
    const response = await playersIndexService(params.teamId);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(normalizeAxiosError(err));
  }
});

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.pending, (state) => {
      state.loading = true;
      state.fetchError = undefined;
    });
    builder.addCase(fetchPlayers.fulfilled, (state, action) => {
      state.loading = false;
      state.players = action.payload;
    });
    builder.addCase(fetchPlayers.rejected, (state, action) => {
      state.loading = false;
      state.fetchError = action.payload;
    });
  },
});