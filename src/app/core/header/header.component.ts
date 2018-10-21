import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../_services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userType : string = '';

  constructor(private authService: AuthenticateService) { 
  
  }

  ngOnInit() {
    
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();

  }

  isAdminUser() {
    return this.authService.isUserAdmin();
  }

  onLogout() {
    this.authService.logout();
  }

}
