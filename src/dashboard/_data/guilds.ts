import ZenCore from "@zenflux/core";

export class Guilds extends ZenCore.commandBases.CommandData {
    public static getName() {
        return "Dashboard/Guilds";
    }

    getEndpoint(): string {
        return "dashboard/guilds";
    }
}
