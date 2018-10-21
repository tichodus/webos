import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import scheduler from './kernel/proces-management/scheduler/scheduler';
import taskManager from './kernel/proces-management/task/taskManager';
import interupter from './kernel/proces-management/interupter/interupter';
import { IWindowOptions } from './shell/window/window';
import { WindowManager } from './shell/window-manager/window.manager';




class App extends React.Component {

  public componentDidMount() {


    const foo = () => {
      self.onmessage = e => {
        if (e.data === 'run') {
          console.log("Task 1 started");
        }
      }
    }

    const goo = () => {
      self.onmessage = e => {
        if (e.data === 'run') {
          console.log("Task 2 started");
        }
      }
    }

    const task1 = taskManager.fork();
    taskManager.setJobForTask({
      job: foo,
      taskId: task1.Pid,
    });
    taskManager.run(task1);

    const task2 = taskManager.fork();
    taskManager.setJobForTask({
      job: goo,
      taskId: task2.Pid,
    });
    taskManager.run(task2);

    setTimeout(() => scheduler.startScheduling(), 10000);

  }


  public addTask() {
    const task = taskManager.fork();
    const coo = () => {
      self.onmessage = e => {
        if (e.data === 'run') {
          setInterval(() => console.log("Task 3 started"), 1000);
        }
      }
    }
    taskManager.setJobForTask({
      job: coo, taskId: task.Pid
    })
    taskManager.run(task);
  }

  public terminate() {
    interupter.interupt(3);
  }

   public openDialog = () => {
    const windowOptions: IWindowOptions = {
      content: <button onClick={this.openDialog}>click</button>,
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
