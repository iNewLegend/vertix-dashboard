import { Slice } from "@reduxjs/toolkit";

import ZenRedux from "@zenflux/redux";

import * as data from "./_data/";

import { IDashboardReducers, IDashboardState } from "@dashboard/model";

export default class DashboardController extends ZenRedux.core.Controller {
    public static getName() {
        return "Dashboard/Controller";
    }

    public getData() {
        return data;
    }

    getSliceInitialState(): IDashboardState {
        return {
        };
    }

    getReducers(): IDashboardReducers {
        return {
            setGuilds: ( state, action ) => {
                state.guilds = action.payload;
            }
        };
    }

    getState(): IDashboardState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<IDashboardState, IDashboardReducers>;
    }
}
