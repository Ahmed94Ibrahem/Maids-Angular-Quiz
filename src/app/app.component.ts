import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './core/services/global/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Maids-Angular-Quiz';
  isLoading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading;
  }
}
