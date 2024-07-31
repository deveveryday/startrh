class StartRhServer {
    private static _instance: StartRhServer;

    private constructor() { }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new StartRhServer();
        return this._instance;
    }
}

export default StartRhServer;