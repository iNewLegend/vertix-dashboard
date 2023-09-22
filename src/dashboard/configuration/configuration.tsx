import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingContainer from "@internal/ui-general/loading/loading-container";

import SelectServer from "@dashboard/select-server/select-server";
import SelectMasterChannel from "@dashboard/select-master-channel/select-master-channel";

import ConfigureBadwords from "@dashboard/configuration/configure-badwords";

import ConfigureMasterChannel from "@dashboard/configuration/configure-master-channel";

import ZenRedux from "@zenflux/redux";
import ZenCore from "@zenflux/core";

import { APIDataTypeGuild } from "@vertix-base/data-types/api-data-type";

import DashboardConfigurationController from "@dashboard/configuration/controller";
import { IDashboardConfigurationState } from "@dashboard/configuration/model";
import { SessionStorage } from "@internal/_utils/session-storage";

const controller = ZenCore.managers.controllers.get( "Dashboard/Configuration/Controller" ) as DashboardConfigurationController;

export function Configure( props: { guildId: string } ) {
    const configuration = ZenRedux.hooks.useController( "Dashboard/Configuration/Controller" ) as IDashboardConfigurationState;

    // TODO: If props.guildId, reset configuration.

    useEffect( () => {
        const savedGuildId = SessionStorage.getItem( "configurationGuildId" );

        // Clear configuration upon guild change.
        if ( savedGuildId && props.guildId !== savedGuildId ) {
            ZenRedux.store.getStore().dispatch(
                controller.getSlice().actions.clearConfiguration()
            );
        }

        setTimeout( () => {
            const get = ZenCore.managers.data.get( "Dashboard/Guild", { id: props.guildId } );

            get.then( ( result: APIDataTypeGuild ) => {
                SessionStorage.setItem( "configurationGuildId", props.guildId );

                ZenRedux.store.getStore().dispatch(
                    controller.getSlice().actions.setConfiguration( result )
                );
            } );
        }, configuration.isSet ? 2000 : 700 );
    }, [ props.guildId, configuration.isSet ] );

    const badwords = configuration.isSet ? <ConfigureBadwords data={ configuration.dataDB } guildId={ props.guildId }/> :
            <LoadingContainer><>Receiving badwords...</>
            </LoadingContainer>,
        selectMasterChannel = configuration.isSet ?
            <SelectMasterChannel data={ configuration as APIDataTypeGuild } guildId={ props.guildId }/> :
            <LoadingContainer><>Receiving master channels...</>
            </LoadingContainer>;

    return (
        <>
            <div className="cards row pt-5 p-xxl-5 pb-xxl-0 justify-content-center">
                <div className="col-bsm-12">
                    <div className="card mx-auto">
                        <div className="card-header">
                            🙅 Bad Words
                        </div>
                        <div className="card-body">
                            { badwords }
                        </div>
                    </div>
                </div>
            </div>

            <div className="cards row pt-5 p-xxl-5 pb-xxl-0 justify-content-center">
                <div className="col-bsm-12">
                    <div className="card mx-auto">
                        <div className="card-header">
                            Master Channels
                        </div>
                        <div className="card-body">
                            { selectMasterChannel }
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};


export default function Configuration() {
    const params = useParams(),
        guilds = ZenRedux.hooks.useControllerProperty( "Dashboard/Controller", "guilds" );

    return (
        <div className="configuration"> {
            ! guilds ?
                <LoadingContainer><>Receiving data...</>
                </LoadingContainer> :

                params.channelId && params.guildId ?
                    <ConfigureMasterChannel guildId={ params.guildId } channelId={ params.channelId }/> :

                    params.guildId ?
                        <Configure guildId={ params.guildId }/> :
                        <SelectServer routePrefix={ "configuration" }/>
        }
        </div>
    );
}
