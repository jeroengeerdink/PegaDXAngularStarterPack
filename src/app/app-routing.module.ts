import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorklistComponent } from './worklist/worklist.component';

const routes: Routes = [
  {
    path: 'data',
    component: WorklistComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
