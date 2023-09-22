import React, { KeyboardEvent } from "react";

import ZenCore from "@zenflux/core";
import { badwordsSomeUsed } from "@vertix-base/utils/badwords";
import { useBeforeUnload } from "react-router-dom";
import { IDashboardConfigurationState } from "@dashboard/configuration/model";

let timerId: NodeJS.Timeout | null = null;

export default function ConfigureBadwords( props: { data: IDashboardConfigurationState["dataDB"], guildId: string } ) {
    const badwords = props.data?.find( ( item: any ) => item.key === "badwords" ),
        values = badwords ? badwords.values : [];

    // TODO: Part to files, use ZenFlux.Redux for saving data or session storage.

    const [ updateKey, setUpdateKey ] = React.useState( Math.random() ),
        [ valuesState, setValuesState ] = React.useState( values ),
        [ showAddInput, setShowAddInput ] = React.useState( false ),
        [ , setTestInput ] = React.useState( "" );

    const addInputRef = React.useRef<HTMLInputElement>( null ),
        testInputRef = React.useRef<HTMLInputElement>( null );

    // Update backend.
    const requestUpdateRemote = ( timeout = 3000 ) => {
        setUpdateKey( Math.random() );

        if ( timerId ) {
            clearTimeout( timerId );
        }

        timerId = setTimeout( () => {
            ZenCore.managers.data.update( "Dashboard/Badwords", {
                guildId: props.guildId,
                badwords: values,
            } ).then( () => {
                timerId = null;
            } )
        }, timeout );
    };

    const AddComponent = () => {
        const className = `badge rounded-pill fs-5 ms-3 mt-2 mb-2 shadow user-select-none cursor-pointer ${ showAddInput ? "" : "text-bg-success" }`;
        return ( <div className={ className }>
            {
                showAddInput ? (
                    <>
                        <div className="input-group">
                            <input ref={ addInputRef } onKeyDown={ onInputKeyDown }
                                   type="text" className="form-control shadow-none"
                                   placeholder="Add New"
                            />

                            <button onClick={ onAddClick } className="btn btn-success" type="button">
                                <i className="bi bi-plus-lg fs-5 fw-bold"></i>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <span onClick={ () => setShowAddInput( true ) }>
                            <span className="text-body-emphasis">Add</span>&nbsp;
                            <i className="bi bi-plus-lg"></i>
                        </span>
                    </>
                )
            }
        </div> )
    };

    const ListComponent = () => {
        if ( valuesState.length === 0 ) {
            return (
                <div className="text-center text-muted mt-4">
                    <p>No badwords yet.</p>
                    <AddComponent/>
                </div>
            )
        }

        return (
            <div className="badwords-list border border-2 rounded-3 bg-secondary-subtle mt-4 p-3">
                {
                    valuesState.map( ( badword: string, index: number ) => {
                        return (
                            <span key={ index }
                                  className="badword badge rounded-pill text-bg-secondary fs-5 ms-3 mt-2 mb-2 shadow user-select-none cursor-pointer">
                                { badword }&nbsp;
                                <i onClick={ () => onRemoveClick( index ) } className="bi bi-x-lg"></i>
                            </span>
                        )
                    } )
                }

                <AddComponent/>

            </div>
        )
    };

    const onAddClick = () => {
        const value = addInputRef.current?.value;

        if ( ! value ) {
            return;
        }

        values.push( value );

        setValuesState( values );

        requestUpdateRemote();
    };

    const onRemoveClick = ( index: number ) => {
        values.splice( index, 1 );

        setValuesState( values );

        requestUpdateRemote();
    };

    const onInputKeyDown = ( e: KeyboardEvent ) => {
        if ( e.key !== "Enter" ) {
            return;
        }

        onAddClick();

        // Restore focus to the input.
        setTimeout( () => {
            addInputRef.current?.focus();
        } );
    };

    const onClearAllClick = () => {
        values.length = 0;

        setValuesState( values );

        requestUpdateRemote();
    };

    // TODO: Moving different pages will not trigger this.
    // Get fucked when mixed with "log out" due inactivity.
    useBeforeUnload( async ( e ) => {
        // Check if timerId is set, if so, we have pending changes.
        if ( timerId ) {
            requestUpdateRemote( 0 );

            e.preventDefault();
            e.returnValue = "";
        }
    });

    const currentTestInputValue = testInputRef.current?.value || "",
        badwordUsed = badwordsSomeUsed( currentTestInputValue, values );

    return (
        <div className="badwords p-3" key={ updateKey }>
            <div className="row">
                <div className="col-6">
                    <span className="text-body-emphasis fs-5">Current badwords</span>
                </div>
                {
                    valuesState.length > 0 && (
                        <div className="col-6 text-end">
                            <button onClick={ onClearAllClick } className="btn btn-danger ms-3"
                                    type="button">Clear <b className="shadow">{ valuesState.length }</b> items
                            </button>
                        </div>
                    )
                }
            </div>

            <ListComponent/>

            <div className="badwords-test border border-1 rounded-3 bg-secondary-subtle mt-4 p-3">
                <span className="text-body-emphasis fs-5 mt-3">Test against text:</span>
                <div className="input-group mt-3 w-25" style={ { maxWidth: "450px" } }>
                    <input ref={ testInputRef }
                           value={ currentTestInputValue }
                           onChange={ ( e ) => setTestInput( e.currentTarget.value ) }
                           type="text"
                           className="form-control"
                           placeholder="Something inappropriate"/>
                </div>

                {
                    currentTestInputValue && (
                        <div className="mt-3">
                            <span className="text-body-emphasis fs-5">Result:</span>
                            <span className="result">
                                <span
                                    className="badword badge rounded-pill text-bg-secondary fs-5 ms-3 mt-2 mb-2 shadow user-select-none cursor-pointer me-3">
                                    { currentTestInputValue }
                                </span>
                                {
                                    badwordUsed ? (
                                        <>
                                            <span className="fs-5">
                                                Is matched to
                                            </span>
                                            <span
                                                className="badge rounded-pill text-bg-success fs-5 ms-3 mt-2 mb-2 shadow user-select-none cursor-pointer">
                                                { badwordUsed }
                                            </span>
                                        </>
                                    ) : (
                                        <b className="fs-5">
                                            Is not matched to any bad words and can be used.
                                        </b>
                                    )
                                }
                            </span>
                        </div>
                    )
                }
            </div>

            <div className="alert border border-1 alert-secondary mt-3">
                <p>
                    <b>Note</b>
                </p>
                <p>
                    The <code>*</code> acts like a joker that can match any sequence of characters.
                </p>
                <p>
                    For example, if you have the bad word <code>badword</code> in your list of bad words, using it as-is will only match that exact word. However, if you add a <code>*</code> to it as <code>b*dword</code>,
                    it will match not only <code>badword</code> but also other words that start with <code>b</code> and end with <code>dword</code>, with any characters in between.
                </p>
                <p>
                    The wildcard <code>*</code> allows you to catch variations of bad words without having to list each variation separately. It helps make the filtering process more flexible and efficient.
                </p>
                <p>
                    Just remember to use wildcards carefully, as they can potentially match unintended words if not used properly, use <b>test</b> to validate them.
                </p>
            </div>
        </div>
    );
}
