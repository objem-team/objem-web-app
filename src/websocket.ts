class websocket {
  private static instance: websocket;

  public connection: WebSocket;
  public static address: string = "localhost";
  public static port: number = 8000;

  private constructor(url: string, protocol?: string) {
    this.connection = new WebSocket(url, protocol);
    this.connection.onopen = this.onOpen;
  }
  static getInstance(): websocket {
    if (!this.instance) {
      this.instance = new websocket(
        "ws:" + this.address + ":" + this.port + "/"
      );
    }
    return websocket.instance;
  }
  private onOpen = (_event: Event) => {
    console.log("connected!");
  };
}

export { websocket };
