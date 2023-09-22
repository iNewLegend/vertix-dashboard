import React from "react";

export default function LoadingContainer( { children }: { children: JSX.Element } ) {
    return (
        <div className="container text-center p-5 mb-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">...</span>
            </div>
            <h5>{ children }</h5>
        </div>
    );
}
