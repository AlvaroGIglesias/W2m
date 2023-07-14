import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;

  constructor(
    private loadingSrv: LoadingService
  ) { }

  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingSrv.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
