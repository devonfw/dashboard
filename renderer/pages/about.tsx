import { Component } from 'react';
import Layout from '../hoc/Layout';
import SpaceAround from '../hoc/SpaceAround';
import Terminal from '../components/terminal/Terminal';

export default class About extends Component {
  render() {
    return (
      <Layout>
        <SpaceAround>
          <Terminal></Terminal>
        </SpaceAround>
      </Layout>
    );
  }
}
