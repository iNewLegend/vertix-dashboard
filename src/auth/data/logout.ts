import ZenCore from "@zenflux/core";

export class Logout extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Auth/Data/Logout";
    }

    getEndpoint(): string {
        return "auth/logout";
    }
}
