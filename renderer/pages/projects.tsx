import React, { Component } from 'react';
import Layout from '../hoc/Layout';
import SpaceAround from '../hoc/SpaceAround';
import DashboardProjects from '../components/view-dashboard-projects-detail/DashboardProjects';

export default class Projects extends Component {
    private projectsInfo = [{
        icon: '/assets/folder.png',
        title: 'My Thai Star',
        date: new Date().toDateString()
    },{
        icon: '/assets/folder.png',
        title: 'Devonfw Dashboard',
        date: new Date().toDateString()
    },{
        icon: '/assets/folder.png',
        title: 'Dashboard',
        date: new Date().toDateString()
    },{
        icon: '/assets/folder.png',
        title: 'Angular 4g',
        date: new Date().toDateString()
    }];

    render() {
        return (
            <Layout>
                <SpaceAround changeBgColor={true}>
                    <DashboardProjects projects={this.projectsInfo} />
                </SpaceAround>
            </Layout>
        )
    }
}