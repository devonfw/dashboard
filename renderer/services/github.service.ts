import fetch from 'isomorphic-unfetch';
import Repository from '../models/repository.model';

interface ResType {
  description: string;
  html_url: string;
  clone_url: string;
  pushed_at: string;
  name: string;
}

function formatQuery(query: string) {
  if (!query) return '';
  return `${query.trim().replace(' ', '+')}+`;
}

function processResponse(data: any) {
  const output: Repository[] = [];
  data.forEach((repo: ResType) => {
    output.push({
      description: repo.description,
      url: repo.html_url,
      name: repo.name,
      git: repo.clone_url,
      updated: new Date(repo.pushed_at),
    });
  });

  return output;
}

function fetchGithub(query: string): Promise<Response> {
  return fetch(
    `https://api.github.com/search/repositories?q=${query}user:devonfw`,
    { headers: { 'User-Agent': 'jambulud' } },
  );
}

export default class GithubService {
  constructor() {}

  async getReposNonFormatted(query: string) {
    const res = await fetchGithub(query);
    const data = await res.json();
    const cleanData = data.items || [];
    const output = processResponse(cleanData);

    return output;
  }

  async getRepos(query: string = '') {
    return this.getReposNonFormatted(formatQuery(query));
  }
}
