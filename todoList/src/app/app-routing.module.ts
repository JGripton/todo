import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: '/task', component: TaskComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
  {
    path: '/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
