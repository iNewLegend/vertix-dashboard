export default class Storage {
    public static get( key: string ): any {
        const value = localStorage.getItem( key );
        return value ? JSON.parse( value ) : null;
    }

    public static set( key: string, value: any ): void {
        localStorage.setItem( key, JSON.stringify( value ) );
    }
}
