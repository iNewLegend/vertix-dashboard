import ZenRedux from "@zenflux/redux";

import * as data from "./data/";

import { IAuthReducers, IAuthState } from "@internal/auth/model";
import { Slice } from "@reduxjs/toolkit";

export default class AuthController extends ZenRedux.core.Controller {
    public static getName() {
        return "Auth/Controller";
    }

    public getData() {
        return data;
    }

    getSliceInitialState(): IAuthState {
        return {
            isAuthenticated: false,
        };
    }

    getReducers(): IAuthReducers {
        return {
            setLogin: ( state, action ) => {
                state.isAuthenticated = true;
                state.profile = action.payload;
            },
            setLogout: ( state ) => {
                state.isAuthenticated = false;
                state.profile = undefined;
            }
        };
    }

    getState(): IAuthState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<IAuthState, IAuthReducers>;
    }
}
