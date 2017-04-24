import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles: any[];
  images: any[];
  canEdit: any;

  constructor(private firebaseService: AuthService) {
  }

  ngOnInit() {

    let vm = this;
    let firebase = this.firebaseService.af;

    this.firebaseService.getArticles().subscribe(articles => {
      this.articles = articles;
    });

    firebase.auth.subscribe((auth) => {
      if (auth) { firebase.database.list('/users').subscribe(users => {
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

  addArticle(art_title, art_content, art_date) {
    this.firebaseService.articles.push({ art_title: art_title, art_content: art_content, art_date: art_date});
  }



}
