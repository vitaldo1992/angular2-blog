import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-room',
  templateUrl: './root-room.component.html',
  styleUrls: ['./root-room.component.scss']
})
export class RootRoomComponent implements OnInit {
  showUsersFlag: boolean = false;
  users: FirebaseListObservable<User[]>;
  root: boolean = false;
  constructor(private firebase: AuthService, private router: Router) {

  }

  ngOnInit() {

    this.firebase.af.auth.subscribe(auth => {
      if (auth) {
        this.users = this.firebase.getUsers();
        this.firebase.getUser(auth.uid).subscribe(user=> {
          this.root = false;
          if (user.role=='root') {
            this.root=true;
          }
        });
      } else {
        this.root = false;
        this.router.navigate(['/article']);
      }
    });

  }

  showUsers() {
    this.showUsersFlag = !this.showUsersFlag;
  }

}


interface User {
  $key?: String;
  email?: String;
  name?: String;
  role?: String;
  userToken: String;
  canEdit: boolean;
}
