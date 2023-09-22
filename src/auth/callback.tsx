import React, { Suspense } from "react";

import { Navigate, useSearchParams } from "react-router-dom";

import ZenCore from "@zenflux/core";

import AuthController from "@internal/auth/controller";

import { IAuthProfile } from "@internal/auth/model";

import LoadingContainer from "@internal/ui-general/loading/loading-container";

type AUTH_STATE_STATUS = "STARTED" | "AUTHENTICATING" | "AUTHENTICATED" | "ERROR";

interface IAuthState {
    status: AUTH_STATE_STATUS;
    data: Error | IAuthProfile | null;
}

const displayState = ( authState: IAuthState ) => {
    switch ( authState.status ) {
        case "ERROR":
            return (
                <div className="alert alert-danger text-center">
                    <>
                        <p>Error authenticating:</p>
                        <pre>
                            { authState.data && ( authState.data as Error ).message }
                        </pre>
                    </>
                </div>
            );

        case "AUTHENTICATING":
            return (
                <LoadingContainer>
                    <>Authenticating...</>
                </LoadingContainer>
            );

        case "AUTHENTICATED":
            const controller = ZenCore.managers.controllers.get( "Auth/Controller" ) as AuthController;

            ZenRedux.store.getStore().dispatch(
                controller.getSlice().actions.setLogin( authState.data as IAuthProfile )
            );


            return (
                <Navigate to={ localStorage.getItem( "authRedirect" ) || "/dashboard" }/>
            );
    }
};


export default function Callback() {
    const [ searchParams ] = useSearchParams();

    const [ authState, setAuthState ] = React.useState<IAuthState>( {
        status: "STARTED",
        data: null
    } );

    if ( "STARTED" === authState.status ) {
        setAuthState( {
            status: "AUTHENTICATING",
            data: null
        } );

        const code = searchParams.get( "code" ),
            state = searchParams.get( "state" );

        ZenCore.managers.data.get( "Auth/Data/Login", { code, state } ).then( ( result ) => {
            setAuthState( {
                status: "AUTHENTICATED",
                data: result
            } );
        } ).catch( ( error ) => {
            setAuthState( {
                status: "ERROR",
                data: error
            } );
        } );
    }

    return (
        <>
            { displayState( authState ) }
        </>
    )
}
