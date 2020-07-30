import { Component } from 'react';
import ResponsiveDrawer from '../modules/shared/components/responsive-drawer/ResponsiveDrawer';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import Repository from '../services/github/models/repository.model';
import Installations from '../components/Installations/Installations.contoller';

interface HomeProps {
  data: Repository[];
}
export default class Home extends Component<HomeProps> {
  render(): JSX.Element {
    return (
      <ResponsiveDrawer>
        <SpaceAround bgColor={'#f4f6f8'}>
          <Installations></Installations>
        </SpaceAround>
      </ResponsiveDrawer>
    );
  }
}
