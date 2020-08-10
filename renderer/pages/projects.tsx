import { Component } from 'react';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import DashboardProjects from '../components/dashboard-projects/DashboardProjects';
import { IpcRendererEvent } from 'electron';
import { ProjectDetails } from '../modules/projects/redux/data.model';

interface IProjects {
  projects: ProjectDetails[];
}

export default class Projects extends Component<IProjects> {
  state: IProjects = {
    projects: [],
  };

  componentDidMount(): void {
    global.ipcRenderer.send('find:projectDetails');
    global.ipcRenderer.on(
      'get:projectDetails',
      (_: IpcRendererEvent, projects: ProjectDetails[]) => {
        this.setState({
          projects: projects,
        });
      }
    );
  }

  componentWillUnmount(): void {
    global.ipcRenderer.removeAllListeners('find:projectDetails');
    global.ipcRenderer.removeAllListeners('get:projectDetails');
  }

  render(): JSX.Element {
    return (
      <Layout>
        <SpaceAround bgColor={'#F4F6F8'}>
          <DashboardProjects projects={this.state.projects} />
        </SpaceAround>
      </Layout>
    );
  }
}
