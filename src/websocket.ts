class websocket {
  private static instance: websocket;

  public connection: WebSocket;

  private constructor(url: string, protocol?: string) {
    this.connection = new WebSocket(url, protocol);
  }
  static getInstance(): websocket {
    if (!this.instance) {
      this.instance = new websocket("ws:localhost:8000/");
    }
    return websocket.instance;
  }
}

export { websocket };
