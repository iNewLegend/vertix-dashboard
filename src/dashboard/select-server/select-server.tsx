import { useNavigate } from "react-router-dom";
import React from "react";

import { createImageFromInitials, getInitials, textToHexColor } from "@internal/utils";
import ZenRedux from "@zenflux/redux";

export function SelectServer( props: { guilds: any[] | null, routePrefix: string } ) {
    const navigate = useNavigate();

    const onGuildClick = ( guild: any ) => {
        navigate( `/dashboard/${ props.routePrefix }/${ guild.id }` );
    };

    const guildCards = props.guilds?.map( ( guild: any, index ) => {
        let guildImage = "";

        if ( ! guild.icon ) {
            guildImage = createImageFromInitials( 256, 256, getInitials( guild.name ) as string, textToHexColor( guild.id ) ) || "https://cdn.discordapp.com/icons/0/0.png";
        } else {
            guildImage = `https://cdn.discordapp.com/icons/${ guild.id }/${ guild.icon }.png`;
        }

        const masterChannels = guild.channels.filter( ( channel: any ) => channel.internalType === "MASTER_CREATE_CHANNEL" ).length,
            dynamicChannels = guild.channels.filter( ( channel: any ) => channel.internalType === "DYNAMIC_CHANNEL" ).length;

        return (
            <div className="select-server col-auto p-2 d-flex justify-content-center" key={ index }
                 onClick={ () => onGuildClick( guild ) }>
                <div className="card shadow">
                    <div className="row g-0">
                        <div className="col-md-5 m-auto mt-5 mb-4">
                            <img src={ guildImage }
                                 className="card-img-top rounded-4"
                                 alt={ guild.id }/>
                        </div>

                        <div className="card-body">
                            <h5 className="card-title text-primary-emphasis"><b>Name:</b> { guild.name }</h5>
                            <div className="card-text pt-2">
                                <ul style={{listStyleType: "none"}} className="p-1">
                                    <li>Id: <code className="black">{ guild.id }</code></li>
                                    <li>Master Channels: <b>{ masterChannels }</b></li>
                                    <li>Dynamic Channels: <b>{ dynamicChannels }</b></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } ) || null;

    return (
        <>
            <h4>
                Select Server
            </h4>

            <div className="row p-5 d-flex justify-content-center">
                { guildCards }
            </div>
        </>
    );
}

const SelectServerMemo = React.memo( ( props: {
        routePrefix: string
    } ) => {
        const guilds = ZenRedux.hooks.useControllerProperty( "Dashboard/Controller", "guilds" );

        return <SelectServer guilds={ guilds } routePrefix={ props.routePrefix }/>
    }
);

export default SelectServerMemo;
