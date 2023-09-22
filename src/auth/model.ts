import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

export interface IAuthProfile {
    avatar: string,
    discordId: string,
    discriminator: string,
    email: string,
    username: string,
}

export interface IAuthState {
    isAuthenticated: boolean;
    profile?: IAuthProfile;
}

export interface IAuthReducers extends SliceCaseReducers<IAuthState> {
    setLogin: CaseReducer<IAuthState, PayloadAction<IAuthProfile>>
    setLogout: CaseReducer<IAuthState>
}
