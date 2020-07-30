import { Component } from 'react';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import Terminal from '../components/terminal/Terminal';
import CustomTable from '../components/custom-table/custom-table-body/CustomTable';

export default class About extends Component {
  render(): JSX.Element {
    return (
      <Layout>
        <SpaceAround>
          <>
            <Terminal></Terminal>
            <CustomTable />
          </>
        </SpaceAround>
      </Layout>
    );
  }
}
