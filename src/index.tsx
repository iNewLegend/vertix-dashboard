import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from "react-redux";

import "./index.scss";

import config from "@internal/zenflux-config";

import App from "@internal/app/app";

import ZenCore from "@zenflux/core";

import AuthController from "@internal/auth/controller";
import DashboardController from "@dashboard/controller";
import DashboardConfigurationController from "@dashboard/configuration/controller";

ZenCore.initialize( config );

ZenCore.managers.controllers.register( new DashboardController() );
ZenCore.managers.controllers.register( new DashboardConfigurationController() );
ZenCore.managers.controllers.register( new AuthController() );

const root = ReactDOM.createRoot(
    document.getElementById( 'root' ) as HTMLElement
);

const store = ZenRedux.store.initStore();

ZenCore.managers.data.setHandler( ZenCore.interfaces.E_RESPONSE_HANDLER_TYPE.RESPONSE_HANDLER, ( data: any ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if ( data?.error ) {
        throw data;
    }

    return false;
} );

ZenCore.managers.data.setHandler( ZenCore.interfaces.E_RESPONSE_HANDLER_TYPE.ERROR_HANDLER, ( error: any ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if ( 404 === error?.code ) {
        console.warn( error );
        return false;
    }

    window.location.href = "/auth/logout";

    return false;
} );

root.render(
    <Provider store={ store }>
        <App/>
    </Provider>
);

