import { Component } from 'react';
import ResponsiveDrawer from '../components/responsive-drawer/ResponsiveDrawer';
import SpaceAround from '../hoc/SpaceAround';
import Repository from '../services/github/models/repository.model';
import Searcher from '../components/Searcher/Searcher.controller';

interface HomeProps {
  data: Repository[];
}
export default class Home extends Component<HomeProps> {
  render(): JSX.Element {
    return (
      <ResponsiveDrawer>
        <SpaceAround>
          <Searcher></Searcher>
        </SpaceAround>
      </ResponsiveDrawer>
    );
  }
}
