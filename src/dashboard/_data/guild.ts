import ZenCore from "@zenflux/core";

export class Guild extends ZenCore.commandBases.CommandData {
    public static getName() {
        return "Dashboard/Guild";
    }

    getEndpoint(): string {
        return "dashboard/guild/{id}";
    }
}
