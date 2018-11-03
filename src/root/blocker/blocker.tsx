import * as React from "react";
import { Message, MessageType } from "src/kernel/types/message.enum";
import { WindowOptions } from "src/shell/window/window";

const ctx = self as any;

class Application {
  private eventRegister: Map<string, () => void>;
  private counter: number;

  constructor() {
    this.eventRegister = new Map();
    this.eventRegister.set("block", this.block);
    this.counter = 0;
  }
  public main() {
    const windowOptions: WindowOptions = {
      subtitle: "Blocker"
    };

    const message: Message = {
      data: JSON.stringify(windowOptions),
      type: MessageType.INITWINDOW
    };

    ctx.postMessage(JSON.stringify(message));
    this.Render();
  }

  public block = () => {
    while (true) {
      continue;
    }
  };

  public Render() {
    const el = (
      <div className="container">
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: "25px",
            fontWeight: 700,
            height: "50px"
          }}
          id="block"
          onClick={this.block}
        >
          Block thread
        </button>
        <span
          style={{
            backgroundColor: "lightblue",
            borderRadius: "100%",
            color: "#ffffff",
            display: "block",
            fontSize: "25px",
            fontWeight: 700,
            height: "50px",
            marginLeft: "50%",
            marginTop: "50px",
            padding: "10px",
            textAlign: "center",
            transform: "translate(-50%)",
            width: "50px"
          }}
        >
          <label
            style={{
              display: "block",
              marginTop: "50%",
              transform: "translate(0,-50%)"
            }}
          >
            {this.counter}
          </label>
        </span>
      </div>
    );

    const message: Message = {
      data: JSON.stringify(el),
      type: MessageType.RENDER
    };
    ctx.postMessage(JSON.stringify(message));
    setTimeout(() => {
      this.counter++;
      this.Render();
    }, 1000);
  }

  public handleEvent = (func: string) => {
    const fun = this.eventRegister.get(func);
    if (fun) {
      fun();
    }
  };

  public handleEventWithParams = (data: {
    params: string | object;
    func: string;
  }) => {
    const params = data.params;
    const func = data.func;
    this[func] = Number.parseFloat(params.toString());
    this.Render();
  };
}
const app = new Application();
export default app;
