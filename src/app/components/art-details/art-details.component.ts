import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-art-details',
  templateUrl: './art-details.component.html',
  styleUrls: ['./art-details.component.scss']
})
export class ArtDetailsComponent implements OnInit {

  id: any;
  details: any;
  imageUrl: String;
  canEdit: any;

  constructor(private fbService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    let vm = this;
    let firebaseData = this.fbService.af;

    this.id = this.route.snapshot.params['id'];
    this.fbService.getArtDetails(this.id).subscribe(details => {

      if (!details.art_content) {
        this.router.navigate(['article'])
      }
      this.details = details;

      let storageRef = firebase.storage().ref();

      if (details.path) {
        let spaceRef = storageRef.child(details.path);
        storageRef.child(details.path).getDownloadURL().then((url) => {
          this.imageUrl = url;
        }).catch((error) => {
          console.log(error)
        })
      }
    });

    firebaseData.auth.subscribe((auth) => {
      if (auth) { firebaseData.database.list('/users').subscribe(users => {
          for (let i = 0; i < users.length; i++ ) {
            if (users[i].userToken == auth.uid) {
              this.canEdit = users[i].canEdit;
              console.log(this.canEdit);
              break;
            }
          }
        });
      } else { this.canEdit = false }
    });


  }

  onDeleteArticle() {
    this.fbService.deleteArticle(this.id);
    this.router.navigate(['article']);
  }

}
