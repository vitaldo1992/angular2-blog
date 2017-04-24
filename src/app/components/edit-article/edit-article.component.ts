import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  id: any;
  art_title: any;
  art_date: any;
  art_content: any;
  path: any;
  canEdit: any;

  constructor(private fbService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.fbService.getArtDetails(this.id).subscribe(article => {
      this.art_title = article.art_title
      this.art_date = article.art_date
      this.art_content = article.art_content
      this.path = article.path
    });

    let vm = this;
    let firebaseData = this.fbService.af;
    firebaseData.auth.subscribe((auth) => {
      if (auth) { firebaseData.database.list('/users').subscribe(users => {
          users.map(function(elem){  vm.canEdit = (elem.userToken) == auth.uid? elem.canEdit: false;  });
        });
      } else { vm.canEdit = false; this.router.navigate(['article']); }
    });


  }

  onEditSubmit() {

    let new_article = {
      art_title: this.art_title,
      art_date: this.art_date,
      art_content: this.art_content,
      path: this.path,
    }

    this.fbService.updateArticle(this.id, new_article);
    this.router.navigate(['article']);
  }


}
