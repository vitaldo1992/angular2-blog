import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-root-room',
  templateUrl: './root-room.component.html',
  styleUrls: ['./root-room.component.scss']
})
export class RootRoomComponent implements OnInit {
  root: boolean;
  constructor(private firebase: AuthService) { }

  ngOnInit() {
    // this.firebase.getUsers();
    this.firebase.af.auth.subscribe(auth => {
      if (auth) {
        this.firebase.af.database.list('/users').subscribe(users => {
          for (let i = 0; i < users.length; i++) {
            if (users[i].userToken == auth.uid && users[i].role == "root") {
              this.root = true;
              console.log(this.root);
            }
          }
        })
      }
    });
    // console.log(this.firebase.root);
  }


  getUsers() {
  }

}
