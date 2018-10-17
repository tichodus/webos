import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import taskManager from './kernel/tasks/models/taskManager';


class App extends React.Component {
  public componentDidMount() {



    const foo = () => {
      self.addEventListener("message", (e) => {
        if (e.data === 'run') {
          console.log("Worker 1 started");
        }
        if (e.data === 'quit') {
          console.log("Worker 1 terminated");
        }
      })
    };

    const goo = () => {
      self.addEventListener("message", (e) => {
        if (e.data === 'run') {
          console.log("Worker 2 started");
        }
        if (e.data === 'quit') {
          console.log("Worker 2 terminated");
        }
      })
    };

    const task = taskManager.fork();
    taskManager.setJobForTask({
      job: foo,
      taskId: task.Pid
    });
    taskManager.run(task);

    const task2 = taskManager.fork();
    taskManager.setJobForTask({
      job: goo,
      taskId: task2.Pid
    });
    taskManager.run(task2);

  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}


export default App;
