import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { FlashMessagesService  } from 'angular2-flash-messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private flashMessages: FlashMessagesService ) {

  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.authService.loginingGoogle().then((data) => {
      this.authService.createUser(data);
      return this.router.navigate(['article']);

    });
  }

  logOut() {
    this.authService.logOut();
    this.flashMessages.show('You are logged out', {cssClass: 'alert-success', timeout: 3000})
  }

}
