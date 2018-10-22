import * as React from 'react';
import './App.css';
import logo from './logo.svg';
// import scheduler from './kernel/proces-management/scheduler/scheduler';
import taskManager from './kernel/proces-management/task/taskManager';
// import interupter from './kernel/proces-management/interupter/interupter';
import { IWindowOptions } from './shell/window/window';
import { WindowManager } from './shell/window-manager/window.manager';
import scheduler from './kernel/proces-management/scheduler/scheduler';
// import Worker from 'worker-loader!./test/t';
// import testApp from './test/testApp';
import { Connector } from './kernel/connector/connector';
import { Renderer } from './shell/window-manager/renderer';





class App extends React.Component {

  public componentDidMount() {
    setTimeout(() => scheduler.startScheduling(), 3000);
    window.addEventListener("click", ($event) => {
      console.log(($event.target as any).title === 'workerEvent');
        scheduler.notifyWorking(($event.target as any).id);
    });
  }


  public addTask() {
    const task = taskManager.fork();
    taskManager.setJobForTask({
      taskId: task.Pid,
      threadUrl: 'testApp',
    }).then(() => {
      taskManager.run(task);
      const connector = new Connector(task, {
        onRender: (jsx: any) => {

         const el = Renderer.render(jsx);
          const windowOptions: IWindowOptions = {
            content: el,
            subtitle: "Test",
          }
          WindowManager.runWindow(windowOptions);
        }
      });
      connector.render();
    });

    // taskManager.run(task);
    // connector.render();


  }

  // public terminate() {
  //   interupter.interupt(3);
  // }


  public openDialog = () => {
    const windowOptions: IWindowOptions = {
      content: <button onClick={this.addTask}>Click</button>,
      subtitle: "Test",
    }

    WindowManager.runWindow(windowOptions);
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
