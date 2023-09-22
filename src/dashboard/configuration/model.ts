import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import { APIDataTypeGuild } from "@vertix-base/data-types/api-data-type";

export interface IDashboardConfigurationState extends Partial<APIDataTypeGuild> {
    isSet: boolean;
}

export interface IDashboardConfigurationReducers extends SliceCaseReducers<IDashboardConfigurationState> {
    setConfiguration: CaseReducer<IDashboardConfigurationState, PayloadAction<APIDataTypeGuild>>
    clearConfiguration: CaseReducer<IDashboardConfigurationState>
}
