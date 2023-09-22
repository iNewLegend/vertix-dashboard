import React from "react";
import { useParams } from "react-router-dom";

import LoadingContainer from "@internal/ui-general/loading/loading-container";
import SelectServer from "@dashboard/select-server/select-server";

import ZenRedux from "@zenflux/redux";

export function ServerManagement( props: { guildId: string } ) {
    const guilds = ZenRedux.hooks.useControllerProperty( "Dashboard/Controller", "guilds" ),
        guild = guilds.find( ( guild: any ) => guild.id === props.guildId );

    return (
        <div className="server-managment">
            <div className="control-buttons p-3">
                <div className="row btn-group">
                    <div className="col-auto">
                        <button className="btn btn-primary">➕ Create Master Channel</button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-danger">➖ Delete Master Channel</button>
                    </div>

                    <div className="col-auto">
                        <button className="btn btn-success">🔧 Configure Master Channel</button>
                    </div>

                    <div className="col-auto">
                        <button className="btn btn-warning">➖ Delete Dynamic Channel</button>
                    </div>

                    <div className="col-auto">
                        <button className="btn bg-danger-subtle border-1 border-black">👊 Block User Access From Bot
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Management() {
    const params = useParams(),
        guilds = ZenRedux.hooks.useControllerProperty( "Dashboard/Controller", "guilds" );

    return (
        <div className="management"> {
            ! guilds ?
                <LoadingContainer>
                    <>Receiving data...</>
                </LoadingContainer>
                :
                params.guildId ? <ServerManagement guildId={ params.guildId }/> :
                    <SelectServer routePrefix={ "management" }/>
        }
        </div>
    );
}
