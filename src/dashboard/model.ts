import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { APIDataTypeGuild } from "@vertix-base/data-types/api-data-type";

export interface IDashboardState {
    guilds?: APIDataTypeGuild[],
}

export interface IDashboardReducers extends SliceCaseReducers<IDashboardState> {
    setGuilds: CaseReducer<IDashboardState, PayloadAction<APIDataTypeGuild[]>>
}
