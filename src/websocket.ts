class ws {
  private static instance: ws;
  public client: WebSocket | null = null;
  private constructor() {
    this.client = new WebSocket("ws://localhost:8000");
    this.client.onopen = () => {
      console.log("connected");
    };
  }
  public static getInstance(): ws {
    if (!ws.instance) {
      ws.instance = new ws();
    }
    return ws.instance;
  }
}

export default ws;
