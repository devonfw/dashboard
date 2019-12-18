import {
  Component,
} from 'react';
import Layout from '../components/Layout';
import SpaceAround from '../components/SpaceAround';
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
