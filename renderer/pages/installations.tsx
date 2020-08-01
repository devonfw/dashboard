import { Component } from 'react';
import Drawer from '../modules/shared/components/drawer/drawer';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import Repository from '../services/github/models/repository.model';
import Installations from '../components/Installations/Installations.contoller';

interface HomeProps {
  data: Repository[];
}
export default class Home extends Component<HomeProps> {
  render(): JSX.Element {
    return (
      <Drawer>
        <SpaceAround bgColor={'#f4f6f8'}>
          <Installations></Installations>
        </SpaceAround>
      </Drawer>
    );
  }
}
