import * as React from "react";
import { File } from "src/kernel/file-system/models/file";
import styled from "styled-components";
import Draggable from "react-draggable";
import taskManager from "src/kernel/proces-management/task/taskManager";
import { Connector } from "src/kernel/connector/connector";
import conenctorRegister from "src/kernel/connector-register/connetor-register";

interface LauncherProps {
  file: File;
}
const LauncherContainer = styled.div`
  width: fit-content;
  position: relative;
  text-align: center;
  &:active {
    opacity: 0.7;
    background-color: powderblue;
  }
`;

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
  text-align: center;
`;

const LauncherIcon = styled.div`
  min-width:40px;
  min-height:50px;
  max-width:120px;
  max-height:130px;
    background-image:url("${(props: LauncherProps) => props.file.Icon}");
    background-size:cover;
    cursor:pointer;
    margin-left: 50%;
    transform: translate(-50%);
`;

export class Launcher extends React.Component<LauncherProps> {
  public render() {
    const { file } = this.props;
    return (
      <Container>
        <Draggable>
          <LauncherContainer>
            <LauncherIcon
              tabIndex={1}
              onDoubleClick={this.launch}
              file={file}
            />
            <label>{file.Title}</label>
          </LauncherContainer>
        </Draggable>
      </Container>
    );
  }

  private launch = () => {
    const file = this.props.file;
    const task = taskManager.fork();
    taskManager
      .setJobForTask({
        taskId: task.Pid,
        threadUrl: file.Path
      })
      .then(() => {
        taskManager.run(task);
        const connector = new Connector(task);
        conenctorRegister.registerConnector(task.Pid, connector);
      });
  };
}
