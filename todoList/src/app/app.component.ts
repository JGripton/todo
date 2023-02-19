import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoList';

  constructor(public auth: AuthService, private translate: TranslateService) {
    
    translate.addLangs(['en', 'es', 'ru']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
  
}

