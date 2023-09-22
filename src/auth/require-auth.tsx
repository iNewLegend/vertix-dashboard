import React from "react";

import { useLocation } from "react-router-dom";

import ZenCore from "@zenflux/core";
import ZenRedux from "@zenflux/redux";

import AuthController from "@internal/auth/controller";

import LoadingContainer from "@internal/ui-general/loading/loading-container";

export default function RequireAuth( { children }: { children: JSX.Element } ) {
    const controller = ZenCore.managers.controllers.get( "Auth/Controller" ) as AuthController,
        authenticated = ZenRedux.hooks.useControllerProperty( "Auth/Controller", "isAuthenticated" );

    const location = useLocation();

    if ( ! authenticated ) {
        ZenCore.managers.data.get( "Auth/Data/Get" ).then( ( result ) => {
            if ( result.profile ) {
                ZenRedux.store.getStore().dispatch(
                    controller.getSlice().actions.setLogin( result.profile )
                );

                return;
            }

            localStorage.setItem( "authRedirect", location.pathname );

            window.location.href = result.loginURL;
        } );
    }

    return (
        <>
            {
                authenticated ? children :
                    <LoadingContainer>
                        <>Redirecting...</>
                    </LoadingContainer>
            }
        </>
    );
}
