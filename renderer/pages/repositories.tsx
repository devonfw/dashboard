import { Component } from 'react';
import Drawer from '../modules/shared/components/drawer/drawer';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import Repository from '../services/github/models/repository.model';
import Searcher from '../components/Searcher/Searcher.controller';

interface HomeProps {
  data: Repository[];
}
export default class Home extends Component<HomeProps> {
  render(): JSX.Element {
    return (
      <Drawer>
        <SpaceAround>
          <Searcher></Searcher>
        </SpaceAround>
      </Drawer>
    );
  }
}
