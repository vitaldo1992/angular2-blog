import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { FlashMessagesService  } from 'angular2-flash-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: String;
  root: boolean = false;
  constructor(private authService: AuthService, private router: Router, private flashMessages: FlashMessagesService ) {
  }

  ngOnInit() {
    this.authService.af.auth.subscribe(auth => {
      this.root = false;
      this.name = null;
      if (auth) {
        this.authService.getUser(auth.uid).subscribe(user=> {
          this.name = user.name;
          this.root = false;
          if (user.role=='root') {
            this.root=true;
          }
        });
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginingGoogle();
    this.authService.createUser();
  }

  logOut() {
    this.authService.logOut();
    this.flashMessages.show('You are logged out', {cssClass: 'alert-success', timeout: 3000})
  }

}
