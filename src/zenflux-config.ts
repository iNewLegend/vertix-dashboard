import ZenCore from "@zenflux/core";

const config: Partial<ZenCore.interfaces.IAPIConfig> = {
    baseURL: "http://localhost:700",
    requestInit: {
        credentials: "include",
        redirect: "manual",
    }
};

export default config;
