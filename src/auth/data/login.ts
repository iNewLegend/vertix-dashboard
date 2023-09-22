import ZenCore from "@zenflux/core";

export class Login extends ZenCore.commandBases.CommandData {
    static getName() {
        return "Auth/Data/Login";
    }

    getEndpoint(): string {
        return `auth/login/{code}/{state}`;
    }
}
