import ZenCore from "@zenflux/core";

export class Badwords extends ZenCore.commandBases.CommandData {
    public static getName() {
        return "Dashboard/Badwords";
    }

    getEndpoint(): string {
        return "dashboard/badwords";
    }
}
