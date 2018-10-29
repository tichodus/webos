import * as React from 'react';
import taskManager from './kernel/proces-management/task/taskManager';
import scheduler from './kernel/proces-management/scheduler/scheduler';
import { Connector } from './kernel/connector/connector';
import conenctorRegister from './kernel/connector-register/connetor-register';
import  styled from  "styled-components"
import { testApp } from './root';


const StyledDiv = styled.div`
text-align: center;
background: url("https://www.planwallpaper.com/static/images/3865967-wallpaper-full-hd_XNgM7er.jpg");
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
    }
  }

  public componentDidMount() {
    setTimeout(() => scheduler.startScheduling(), 3000);
    window.addEventListener("click", ($event) => {
      console.log(($event.target as any).title === 'workerEvent');
      scheduler.notifyWorking(($event.target as any).id);
    });
    scheduler.startScheduling();
    setInterval(() => { this.setState({ counter: this.state.counter + 1 }) }, 3000);
  }




  public startCalculator = () => {
    const task = taskManager.fork();
    taskManager.setJobForTask({
      taskId: task.Pid,
      threadUrl: testApp.Path,
    }).then(() => {
      taskManager.run(task);
      const connector = new Connector(task);
      conenctorRegister.registerConnector(task.Pid, connector);
    });
  }

  public blockThread = () => {
    while (true) {
      continue;
    }
  }

  public startCounter = () => {
    const task = taskManager.fork();
    taskManager.setJobForTask({
      taskId: task.Pid,
      threadUrl: "blocker/",
    }).then(() => {
      taskManager.run(task);
      const connector = new Connector(task);
      conenctorRegister.registerConnector(task.Pid, connector);
    });
  }
  public render() {
    return (
      <StyledDiv>
        <button onClick={this.startCalculator}>Calculator</button>
        <button onClick={this.startCounter}>Blocker within thread</button>
        <button onClick={this.blockThread}>Blocker within single thread</button>
        <label style={{ color: "#ffffff" }}>{this.state.counter}</label>
      </StyledDiv>
    );
  }
}


export default App;
