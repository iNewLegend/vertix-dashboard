import React from "react";

import { useLocation } from "react-router-dom";

import { APIDataTypeMasterChannel, APIDataTypeGuild } from "@vertix-base/data-types/api-data-type";

function MasterChannel( props: { data: APIDataTypeMasterChannel, index: number } ) {
    const location = useLocation();

    const { data, index } = props,
        { channelDB, channelDS } = data;

    return (
        <tr>
            <th scope="row">{ index + 1 }</th>
            <td><a className="text-decoration-none"
                   href={ location.pathname + "/" + channelDB.channelId }>{ channelDS.name }</a></td>
            <td>{ channelDB.channelId }</td>
            {/*<td>{ data.buttons.join( " " ) }</td>*/}
            {/*<td className="text-primary-emphasis">{ data.userOwner.tag }</td>*/}
            {/*<td>{ new Date( data.createdAt ).toLocaleString() }</td>*/}
            {/*<td>{ new Date( data.updatedAt ).toLocaleString() }</td>*/}
            {/*<td>{ data.dynamicChannels.length }</td>*/}
        </tr>
    )
}

export default function SelectMasterChannel( props: { data: APIDataTypeGuild, guildId: string } ) {
    return (
        <>
            <h5 className="p-3">
                Select master channel to configure.
            </h5>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Discord Id</th>
                    <th scope="col">Buttons Interface</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Dynamic Channels</th>
                </tr>
                </thead>
                <tbody>
                { ( props.data?.masterChannelsAP || [] ).map( ( channel, index: number ) =>
                    <MasterChannel data={ channel } index={ index } key={ index }/>
                ) }
                </tbody>
            </table>
        </>
    )
}
