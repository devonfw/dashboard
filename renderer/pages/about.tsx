import { Component } from 'react';
import Layout from '../hoc/Layout';
import SpaceAround from '../hoc/SpaceAround';
import Terminal from '../components/terminal/Terminal';
import WorkspaceView from '../components/projects-workspace/workspace.view';

export default class About extends Component {
  render() {
    return (
      <Layout>
        <SpaceAround>
          <>
            <Terminal></Terminal>
            <WorkspaceView/>
          </>
        </SpaceAround>
      </Layout>
    );
  }
}
