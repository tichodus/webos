import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import taskManager from './kernel/proces-management/task/taskManager';
import scheduler from './kernel/proces-management/scheduler/scheduler';
import { Connector } from './kernel/connector/connector';
import conenctorRegister from './kernel/connector-register/connetor-register';





class App extends React.Component {

  public componentDidMount() {
    setTimeout(() => scheduler.startScheduling(), 3000);
    window.addEventListener("click", ($event) => {
      console.log(($event.target as any).title === 'workerEvent');
      scheduler.notifyWorking(($event.target as any).id);
    });
  }




  public openDialog = () => {
    const task = taskManager.fork();
    taskManager.setJobForTask({
      taskId: task.Pid,
      threadUrl: 'testApp',
    }).then(() => {
      taskManager.run(task);
      const connector = new Connector(task);
      conenctorRegister.registerConnector(task.Pid, connector);
    });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.openDialog}>Open dialog</button>
      </div>
    );
  }
}


export default App;
