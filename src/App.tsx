import * as React from 'react';
import taskManager from './kernel/proces-management/task/taskManager';
import scheduler from './kernel/proces-management/scheduler/scheduler';
import { Connector } from './kernel/connector/connector';
import conenctorRegister from './kernel/connector-register/connetor-register';
import styled from "styled-components"
import { testApp } from './root';



const StyledDiv = styled.div`
text-align: center;
background: url("https://www.planwallpaper.com/static/images/3865967-wallpaper-full-hd_XNgM7er.jpg");
background-size: cover;
width: 100vw;
height: 100vh;
`;

class App extends React.Component {

  public componentDidMount() {
    scheduler.startScheduling();
  }




  public openDialog = () => {
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

  public render() {
    return (
      <StyledDiv>
        <button onClick={this.openDialog}>Open dialog</button>
      </StyledDiv>
    );
  }
}


export default App;
