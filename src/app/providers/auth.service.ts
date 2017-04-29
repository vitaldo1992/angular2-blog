import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

  articles: FirebaseListObservable<any[]>;
  details: FirebaseObjectObservable<any>;
  images: FirebaseListObservable<any[]>;
  Users: FirebaseListObservable<User[]>;
  User: FirebaseObjectObservable<User>;
  root: boolean;
  folder: any;

  constructor(public af: AngularFire, private db: AngularFireDatabase) {
    this.folder = 'articles';
    this.articles = this.af.database.list('/blog-articles') as FirebaseListObservable<Articles[]>;
    this.Users = this.af.database.list('/users') as FirebaseListObservable<User[]>;
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

  getUser(uid) {
    this.User = this.af.database.object('/users/'+uid) as FirebaseObjectObservable<User>;
    return this.User;
  }

  getUsers(query={}): FirebaseListObservable<User[]> {
    this.Users = this.db.list('/users', {query: query})
    return this.Users;
  }

  addArticle(article) {

    let refStorage = firebase.storage().ref();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
        let ref = refStorage.child(path);
        ref.put(selectedFile).then((snapshot) => {

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

  updateUsers(key, user) {
    return this.Users.update(key, user);
  }

  createUser() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.getUser(auth.uid).subscribe(
          user => {
            if (!user.email) {
              let newUser = {
                canEdit: false,
                email: auth.auth.email,
                name: auth.auth.displayName,
                role: 'registered',
              }
              this.af.database.object(`/users/${auth.uid}`);
            }
          }
        );
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
interface User {
  $key?: String;
  email?: String;
  name?: String;
  role?: String;
  userToken: String;
  canEdit: boolean;
}
