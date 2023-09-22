import ZenCore from "@zenflux/core";
import AuthController from "@internal/auth/controller";
import { useEffect } from "react";

export default function Logout() {
    useEffect( () => {
        ZenCore.managers.data.get( "Auth/Data/Logout" );

        const controller = ZenCore.managers.controllers.get( "Auth/Controller" ) as AuthController;

        ZenRedux.store.getStore().dispatch(
            controller.getSlice().actions.setLogout()
        );

        // Delete session hardcoded.
        sessionStorage.clear();
    } );

    return (
        <div className="container">
            <div className="row text-center">
                <div className="alert alert-secondary p-5 m-5">
                    <h3 className="text-primary-emphasis">
                        You have been logged out due to inactivity.
                    </h3>

                    <p>
                        <a href="/auth/login">Click here</a> to login again.
                    </p>
                </div>
            </div>
        </div>
    )
}
