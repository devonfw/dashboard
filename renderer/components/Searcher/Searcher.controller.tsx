import { Component, ChangeEvent } from 'react';
import SearcherView from './Searcher.view';
import Repository from '../../models/repository.model';
import GithubService from '../../services/github.service';

const DELAY_TIME = 1000;
interface SearcherState {
  query?: string;
  repositories?: Repository[];
}

export default class Searcher extends Component<{}, SearcherState> {
  timeout: any;
  githubService: GithubService;
  state = {
    query: '',
    repositories: [],
  };

  constructor(props: {}) {
    super(props);
    this.githubService = new GithubService();
  }

  componentDidMount() {
    this.getRepositories();
  }

  componentDidUpdate(_: {}, prevState: SearcherState) {
    const queryUpdated = this.state.query !== prevState.query;
    if (queryUpdated) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(this.getRepositories, DELAY_TIME);
    }
  }

  getRepositories = () => {
    this.githubService
      .getRepos(this.state.query)
      .then((repositories) => this.setState({ repositories }));
  };

  handleQuery = (event: ChangeEvent<{ value: unknown }>) => {
    const query: string = event.target.value as string;
    this.setState({ query });
  };

  render() {
    return (
      <SearcherView
        handleQuery={this.handleQuery}
        query={this.state.query}
        repositories={this.state.repositories}
      ></SearcherView>
    );
  }
}
