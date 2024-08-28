import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { IUser } from "@/API/fetchers/fetchers";
interface IUserSlice extends IUser {
  accountId: string;
}

const initialState: IUserSlice = {
  name: "",
  accountNumber: 0,
  accountId: "",
  balance: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSlice>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
