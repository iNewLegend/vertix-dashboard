import { SessionStorage } from "@internal/_utils/session-storage";

import LoadingContainer from "@internal/ui-general/loading/loading-container";

/**
 * What should it do?
 *  - Manage template names
 *  - Manage buttons
 *  - Manage verified roles.
 *  - Mention enabled/disabled.
 *  - Manage log channels.
 * New:
 *  - Save dynamic channel of each user.
 *  - Set claim channel configuration.
 */
export default function ConfigureMasterChannel( props: { guildId: string, channelId: string } ) {
    // Try to get master channel from session storage.
    const masterChannels = SessionStorage.getItem( "Dashboard/Guild" )?.masterChannels,
        masterChannel = masterChannels.find(
            ( channel: any ) => channel.channelId === props.channelId
        );

    if ( ! masterChannel ) {
        return <LoadingContainer><>Receiving data...</>
        </LoadingContainer>;
    }

    const index = masterChannels.findIndex( ( i: any ) => i.id === masterChannel.id ) + 1,
        settings = masterChannel.data.find( ( i: any ) => i.key === "settings" )?.object || {};

    return (
        <div className="cards row pt-5 p-xxl-5 pb-xxl-0 justify-content-center">
            <div className="col-bsm-12">
                <div className="card mx-auto user-select-none">
                    <div className="card-header">
                        Master Channel Configuration
                    </div>

                    <div className="card-body">
                        <h4>Master Channel # { index }</h4>

                        <div className="general p-3 pb-0">
                            <h4>🎛️ General</h4>
                            <ul style={ { listStyleType: "none" } } className="p-2">
                                <li className="mb-1">
                                    <b>Channel Name:</b>
                                    <code suppressContentEditableWarning={ true } contentEditable={ true }
                                          className="black m-2 cursor-pointer">
                                        { masterChannel.discord.name }
                                    </code>
                                </li>
                                <li><b>Channel ID:</b> <code>{ props.channelId }</code></li>
                                <li><b>Dynamic Channel Template Name:</b>
                                    <code suppressContentEditableWarning={ true } contentEditable={ true }
                                          className="black m-2 cursor-pointer">
                                        { settings.dynamicChannelNameTemplate }
                                    </code>
                                </li>
                            </ul>
                        </div>

                        <div className="buttons p-3 pb-0">
                            <h4>🎚 Buttons Interface</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
