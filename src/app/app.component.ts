import { Component } from '@angular/core';
import { AuthenticateService } from './_services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sports-portal';

  constructor(private authService: AuthenticateService) { }

}
