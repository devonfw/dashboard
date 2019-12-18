import { Component } from 'react';
import ResponsiveDrawer from '../components/ResponsiveDrawer/ResponsiveDrawer';
import SpaceAround from '../components/SpaceAround';
import fetch from 'isomorphic-unfetch';
import Repository from '../models/repository.model';
import RepositoryCard from '../components/cards/RepositoryCard';

interface ResType {
  description: string;
  html_url: string;
  clone_url: string;
  pushed_at: string;
  name: string;
}

interface HomeProps {
  data: Repository[];
}

/*
<mat-card class="devonfwrepos-repo-card" *ngFor="let repo of repos">
    <mat-card-header><mat-card-title>{{repo.name}}</mat-card-title></mat-card-header>
    <mat-card-content>
      <mat-card-subtitle>{{repo.description}}</mat-card-subtitle>
      <div class="repo-item-actions">
        <button mat-raised-button color="primary" (click)="copyURL(repo)">Copy Git URL</button>
        <button mat-raised-button (click)="openRepo(repo)">Open Repository</button>
      </div>
    </mat-card-content>
  </mat-card>
*/

const repositoryCard = (repository: Repository) => (
  <RepositoryCard {...repository}></RepositoryCard>
)
export default class Home extends Component<HomeProps> {

  static async getInitialProps(): Promise<HomeProps> {
    const res = await fetch('https://api.github.com/users/devonfw/repos');
    const data = await res.json();
    const output: Repository[] = [];
    data.forEach((repo: ResType) => {
      output.push({
        description: repo.description,
        url: repo.html_url,
        name: repo.name,
        git: repo.clone_url,
        updated: new Date(repo.pushed_at),
      });
    })

    return {
      data: output,
    }
  }

  render() {
    return (
      <ResponsiveDrawer>
        <SpaceAround>
          <div>
            {this.props.data.map(repository => repositoryCard(repository))}
          </div>
        </SpaceAround>
      </ResponsiveDrawer>
    )
  }
}