import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LIVE_ANNOUNCER_ELEMENT_TOKEN_FACTORY } from "@angular/cdk/a11y";
import * as Octokat from 'octokat';

export interface Repository{
    name: string,
    url: string,
    description: string,
    git: string,
    updated: Date,
}

@Injectable()
export default class GitHubService {

    client: any;

    constructor(private http: HttpClient) {
        this.client = new Octokat({ token: 'ad15b1ebf912c727e45ff1e5afbf928d58b7a590' });
    }

    public async getRepositories(user: string): Promise<Repository[]> {
        const response = await this.http.get(`https://api.github.com/users/${user}/repos`).toPromise();
        const output: Repository[] = [];
        (response as any[]).forEach(repo => {
            output.push({
                description: repo.description,
                url: repo.html_url,
                name: repo.name,
                git: repo.clone_url,
                updated: new Date(repo.pushed_at)
            });
        })
        
        return output;
    }
}