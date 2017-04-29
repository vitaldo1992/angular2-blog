import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../providers/auth.service';
import { newFeature } from '../../../providers/new.feature.service';

@Component({
  selector: '[app-edit-users]',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  editUserDetailsFlag: boolean = false;
  usersTypes: string[] = [
    'root', 'registered', 'admin'
  ];
  constructor(private firebase: AuthService) { }

  ngOnInit() {
  }

  onSubmitUsers() {
    this.switcChanges();
    this.firebase.updateUsers(this.user.$key, new newFeature(this.user.role));
  }

  switcChanges() {
    this.editUserDetailsFlag = !this.editUserDetailsFlag
  }

  @Input() user: any;
}
