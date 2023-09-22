import { Slice } from "@reduxjs/toolkit";
import { IDashboardConfigurationReducers, IDashboardConfigurationState } from "@dashboard/configuration/model";

import ZenRedux from "@zenflux/redux";

export default class DashboardConfigurationController extends ZenRedux.core.Controller {
    public static getName() {
        return "Dashboard/Configuration/Controller";
    }

    getSliceInitialState(): IDashboardConfigurationState {
        return {
            isSet: false
        };
    }

    getReducers(): IDashboardConfigurationReducers {
        return {
            setConfiguration: ( state, action ) => {
                state.guildRS = action.payload.guildRS;
                state.dataDB = action.payload.dataDB;
                // @ts-ignore
                state.masterChannelsAP = action.payload.masterChannelsAP;
                state.isSet = true;
            },
            clearConfiguration: ( state ) => {
                state.guildRS = undefined;
                state.dataDB = undefined;
                state.masterChannelsAP = undefined;
                state.isSet = false;
            }
        };
    }

    getState(): IDashboardConfigurationState {
        return super.getState();
    }

    getSlice() {
        return super.getSlice() as Slice<IDashboardConfigurationState, IDashboardConfigurationReducers>;
    }
}
