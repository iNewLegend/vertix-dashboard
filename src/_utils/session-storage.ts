export class SessionStorage {
    static setItem( key: string, value: any ) {
        sessionStorage.setItem( key, JSON.stringify( value ) );
    }

    static getItem( key: string ) {
        return JSON.parse( sessionStorage.getItem( key ) ?? "null" );
    }

    static removeItem( key: string ) {
        sessionStorage.removeItem( key );
    }
}
