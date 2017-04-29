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

    this.fbService.af.auth.subscribe(auth => {
      this.canEdit = false;
      if (auth) {
        this.fbService.getUser(auth.uid).subscribe(user=> {
          this.canEdit = user.canEdit;
        });
      }
    });


  }

  onDeleteArticle() {
    this.fbService.deleteArticle(this.id);
    this.router.navigate(['article']);
  }

}
