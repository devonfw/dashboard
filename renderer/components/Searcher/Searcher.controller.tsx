import { Component, ChangeEvent } from 'react';
import SearcherView from './Searcher.view';
import Repository from '../../services/github/models/repository.model';
import GithubService from '../../services/github/github.service';

const DELAY_TIME = 1000;
interface SearcherState {
  query?: string;
  repositories?: Repository[];
}

export default class Searcher extends Component<unknown, SearcherState> {
  timeout: NodeJS.Timeout;
  githubService: GithubService;
  state = {
    query: '',
    repositories: [],
  };

  constructor(props: unknown) {
    super(props);
    this.githubService = new GithubService();
  }

  componentDidMount(): void {
    this.getRepositories();
  }

  componentDidUpdate(_: unknown, prevState: SearcherState): void {
    const queryUpdated = this.state.query !== prevState.query;
    if (queryUpdated) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(this.getRepositories, DELAY_TIME);
    }
  }

  getRepositories = (): void => {
    this.githubService
      .getRepos(this.state.query)
      .then((repositories) => this.setState({ repositories }));
  };

  handleQuery = (event: ChangeEvent<{ value: unknown }>): void => {
    const query: string = event.target.value as string;
    this.setState({ query });
  };

  render(): JSX.Element {
    return (
      <SearcherView
        handleQuery={this.handleQuery}
        query={this.state.query}
        repositories={this.state.repositories}
      ></SearcherView>
    );
  }
}
