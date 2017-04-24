import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

  articles: FirebaseListObservable<any[]>;
  details: FirebaseObjectObservable<any>;
  images:FirebaseListObservable<any[]>;
  Users: FirebaseListObservable<any[]>;
  root: boolean;
  folder: any;

  constructor(public af: AngularFire) {
    this.folder = 'articles';
    this.articles = this.af.database.list('/blog-articles') as FirebaseListObservable<Articles[]>;
    this.Users = this.af.database.list('/users');
  }

  loginingGoogle() {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logOut() {
    return this.af.auth.logout()
  }

  getArticles() {
    return this.articles
  }

  getArtDetails(id) {
    this.details = this.af.database.object('/blog-articles/'+id) as FirebaseObjectObservable<Articles>;
    return this.details;
  }

  addArticle(article) {
    // Create root reference
    let refStorage = firebase.storage().ref();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;

        let ref = refStorage.child(path);
        ref.put(selectedFile).then((snapshot) => {
          // article.art_img = selectedFile.name;
          article.path = path;

          return this.articles.push(article)
        })
    }
  }

  deleteArticle(id) {
    this.details = this.af.database.object('/blog-articles/'+id) as FirebaseObjectObservable<any>;
    return this.details.remove();
  }

  updateArticle(id, article) {
    return this.articles.update(id, article);
  }


  createUser(data) {

    let exist = false;

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.af.database.list('/users').subscribe(users => {
          for (let i = 0; i < users.length; i++) {
            if (users[i].userToken == auth.uid) {
              exist = true;
              break;
            }
          }
        });

        if (!exist) {
          let newUser = {
            canEdit: false,
            email: auth.auth.email,
            name: auth.auth.displayName,
            role: 'registered',
            userToken: auth.uid
          }
          return  this.Users.push(newUser);
        }
      }
    });


  }




}


interface Articles {
  $key?: String;
  art_content?: String;
  art_title?: String;
  art_date?: String;
  path: String;
}
interface Users {
  $key?: String;
  email?: String;
  name?: String;
  role?: String;
  userToken: String;
  canEdit: boolean;
}
