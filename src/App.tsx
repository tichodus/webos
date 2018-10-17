import * as React from 'react';
import Worker from 'worker-loader!./kernel/tasks/task.worker';
import './App.css';
import { Messages } from './kernel/tasks/types/message.enum';
import logo from './logo.svg';
import { Message } from './kernel/tasks/types/message';
import { Hooks } from './kernel/tasks/callbacks';


class App extends React.Component {
  public componentDidMount() {
    const worker = new Worker();
    const foo = () => console.log("Started");
    Hooks.onRun = () => foo();
    const message: Message = {
      body: 5,
      message: Messages.RUN,
    };
    worker.postMessage(message);
    // setTimeout(() => worker.postMessage(Messages.PAUSE), 5000);
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
