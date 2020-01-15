import { Component } from 'react';
import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import SpaceAround from '../hoc/SpaceAround';
import Repository from '../models/repository.model';
import Searcher from '../components/Searcher/Searcher.controller';

interface HomeProps {
  data: Repository[];
}
export default class Home extends Component<HomeProps> {
  render() {
    return (
      <ResponsiveDrawer>
        <SpaceAround>
          <Searcher></Searcher>
        </SpaceAround>
      </ResponsiveDrawer>
    );
  }
}
