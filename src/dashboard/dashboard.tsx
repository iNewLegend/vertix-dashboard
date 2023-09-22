import React, { useEffect } from "react";

import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";

import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import Sidebar from "@dashboard/sidebar/sidebar";
import RequireAuth from "@internal/auth/require-auth";

import DashboardController from "@dashboard/controller";
import AuthController from "@internal/auth/controller";

import { APIDataTypeGuild } from "@vertix-base/data-types/api-data-type";

const Profile = React.lazy( () => import( "@dashboard/profile/profile" ) );

const Management = React.lazy( () => import( "@dashboard/management/management" ) );

const Configuration = React.lazy( () => import( "@dashboard/configuration/configuration" ) );

export default function Dashboard() {
    const isAuth = ( ZenCore.managers.controllers.get( 'Auth/Controller' ) as AuthController ).getState()?.isAuthenticated,
        dashboardController = ZenCore.managers.controllers.get( "Dashboard/Controller" ) as DashboardController;

    useEffect( () => {
        if ( ! dashboardController.getState()?.guilds ) {
            setTimeout( () => {
                ZenCore.managers.data.get( "Dashboard/Guilds" ).then( ( result: APIDataTypeGuild[] ) => {
                    ZenRedux.store.getStore().dispatch(
                        dashboardController.getSlice().actions.setGuilds( result )
                    );
                } );
            }, 600 );
        }
    }, [ isAuth ] );

    const location = useLocation(),
        params = useParams();

    const paramsParts = Object.values( params ).at( 0 )?.split( "/" ) || [],
        maybeGuildId = paramsParts.at( 1 ),
        maybeChannelId = paramsParts.at( 2 );

    const guilds = ZenRedux.hooks.useControllerProperty( "Dashboard/Controller", "guilds" )

    const guild = guilds?.find( ( guild: any ) => guild.id === maybeGuildId ),
        channel = guild?.channels?.find( ( channel: any ) => channel.channelId === maybeChannelId );

    return (
        <RequireAuth>
            <div className="dashboard">
                <Sidebar/>

                <div className="content normalize d-flex justify-content-center">
                    <div className="content-body d-flex flex-column flex-shrink-0">
                        <h2 className="content-heading d-flex justify-content-between align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Dashboard</li>
                                    <li className="breadcrumb-item active text-capitalize"
                                        aria-current="page">{
                                        location.pathname.split( "/" ).at( 2 ) || "/profile"
                                            .substring( 1 )
                                    }</li>
                                </ol>
                            </nav>
                        </h2>

                        {
                            guild &&
                            <div className={ "d-flex justify-content-between align-items-center" }>
                                <h2>Selected Server: <span className="text-primary">{ guild.name }</span></h2>
                                <p>id: <code>{ guild.id }</code></p>
                            </div>
                        }

                        <Routes>
                            <Route path="/" element={ <Profile/> }/>

                            <Route path="management" element={ <Management/> }/>
                            <Route path="management/:guildId" element={ <Management/> }/>

                            <Route path="configuration" element={ <Configuration/> }/>
                            <Route path="configuration/:guildId/:channelId?" element={ <Configuration/> }/>

                            <Route
                                path="*"
                                element={ <Navigate to="/dashboard" replace/> }
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
}



