import React, { Suspense } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Logout from "@internal/auth/logout";

const Dashboard = React.lazy( () => import( "@internal/dashboard/dashboard" ) );

const Callback = React.lazy( () => import( "@internal/auth/callback" ) );

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={
                <div className="container text-center p-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h5>Loading Page...</h5>
                </div> }>
                <Routes>
                    <Route path="/auth/callback/" element={ <Callback/> }/>
                    <Route path="/auth/logout/" element={ <Logout/> }/>

                    <Route path="/dashboard/*" element={ <Dashboard/> }/>

                    <Route
                        path="*"
                        element={ <Navigate to="/dashboard" replace/> }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
