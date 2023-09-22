import ZenCore from "@zenflux/core";

export class Get extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Auth/Data/Get";
    }

    getEndpoint(): string {
        return "auth/get";
    }
}
