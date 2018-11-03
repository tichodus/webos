import * as React from "react";
import taskManager from "./kernel/proces-management/task/taskManager";
import scheduler from "./kernel/proces-management/scheduler/scheduler";
import { Connector } from "./kernel/connector/connector";
import conenctorRegister from "./kernel/connector-register/connetor-register";
import styled from "styled-components";
import { calculatorLauncher, blockerLauncher } from "./root";
import { Launcher } from "./shell/launcher/launcher.component";

const StyledDiv = styled.div`
  text-align: center;
  background: url("background.jpg");
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;

interface AppState {
  counter: number;
}

class App extends React.Component<{}, AppState> {
  constructor() {
    super({});
    this.state = {
      counter: 0
    };
  }

  public componentDidMount() {
    setTimeout(() => scheduler.startScheduling(), 1000);
    scheduler.startScheduling();
    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 1000);
  }

  public blockThread = () => {
    while (true) {
      continue;
    }
  };

  public startCounter = () => {
    const task = taskManager.fork();
    taskManager
      .setJobForTask({
        taskId: task.Pid,
        threadUrl: blockerLauncher.Path
      })
      .then(() => {
        taskManager.run(task);
        const connector = new Connector(task);
        conenctorRegister.registerConnector(task.Pid, connector);
      });
  };
  public render() {
    return (
      <StyledDiv>
        <Launcher file={calculatorLauncher} />
        <Launcher file={blockerLauncher} />
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            fontSize: "25px",
            fontWeight: 700,
            height: "50px"
          }}
          onClick={this.blockThread}
        >
          Blocker within single thread
        </button>
        <label
          style={{
            backgroundColor: "powderBlue",
            borderRadius: "50%",
            color: "#ffffff",
            fontSize: "25px",
            fontWeight: 700,
            height: "50px",
            marginLeft:"20px",
            opacity: 0.7,
            padding: "20px",
            width:"50px",
          }}
        >
          {this.state.counter}
        </label>
      </StyledDiv>
    );
  }
}

export default App;
