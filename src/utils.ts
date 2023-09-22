export const getInitials = ( name: string ) => {
    let initials;
    const nameSplit = name.split( " " );
    const nameLength = nameSplit.length;
    if ( nameLength > 1 ) {
        initials =
            nameSplit[ 0 ].substring( 0, 1 ) +
            nameSplit[ nameLength - 1 ].substring( 0, 1 );
    } else if ( nameLength === 1 ) {
        initials = nameSplit[ 0 ].substring( 0, 1 );
    } else return;

    return initials.toUpperCase();
};

export const createImageFromInitials = ( width: number, height: number, name: string, color: string ) => {
    const canvas = document.createElement( 'canvas' );
    const context = canvas.getContext( '2d' );

    if ( ! canvas ) return;

    if ( context === null ) return;

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = "#ffffff";
    context.fillRect( 0, 0, width, height );

    context.fillStyle = `${ color }50`;
    context.fillRect( 0, 0, width, height );

    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = `${ width / 2 }px Roboto`;

    context.fillText( name, ( width / 2 ), ( height / 2 ) );

    return canvas.toDataURL()
};

export function textToHexColor( text: string ) {
    let hash = 0;

    for ( let i = 0 ; i < text.length ; i ++ ) {
        hash = text.charCodeAt( i ) + ( ( hash << 5 ) - hash );
    }

    const color = Math.floor( Math.abs( ( Math.sin( hash ) * 16777215 ) % 1 ) * 16777215 ).toString( 16 );

    return '#' + color.padStart( 6, '0' );
}
