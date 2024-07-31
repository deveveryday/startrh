import { Component } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';
import { AppRoutingModule } from './app-routing.module';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  title = 'startrhvideo';

  constructor(private tokenStorageService: TokenStorageService, private route: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    const user = this.accountService.userValue;
    
    this.isLoggedIn  = user != null;
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.accountService.logout();
    //
    this.route.navigate(['login']).then(() => {
      window.location.reload();
    });;
  } 
}
