import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    CoreModule,
    RouterModule,
    RouterModule.forRoot([
      {path: 'task', component: TaskComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }