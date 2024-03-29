import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

@NgModule({
  declarations: [LoaderComponent, EmptyStateComponent],
  imports: [MatProgressSpinnerModule],
  exports: [LoaderComponent, EmptyStateComponent],
})
export class SharedModule {}
