import { Component, OnInit, OnDestroy } from '@angular/core';
import GitHubService, { Repository } from '../../shared/providers/github.service';
import { ClipboardService } from 'ngx-clipboard';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DocsService } from '../../shared/providers/docs.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit, OnDestroy {

  public static route = 'repository';
  private repos: Repository[];
  private routeSub: Subscription;
  private repoUser: string;

  constructor(
    private githubService: GitHubService,
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    private docsService: DocsService,
    private route: ActivatedRoute
    ) { }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(async params => {
      this.repoUser = params['repo'];
      this.repos = await this.githubService.getRepositories(this.repoUser);
    });
  }

  copyURL(repo: Repository){
    this.clipboardService.copyFromContent(repo.git);
    const snakbarConfig = new MatSnackBarConfig();
    snakbarConfig.verticalPosition = 'bottom';
    snakbarConfig.horizontalPosition = 'center';
    snakbarConfig.duration = 4000;
    this.snackBar.open('🔗🔗 Git URL copied', undefined, snakbarConfig);
  }

  openRepo(repo: Repository){
    this.docsService.openWeb(repo.url);
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
