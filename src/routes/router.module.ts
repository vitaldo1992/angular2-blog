// import { NgModule } from '@angular/core';
import { ArticleComponent } from '../app/components/article/article.component';
import { AddArticleComponent } from '../app/components/add-article/add-article.component';
import { AboutComponent } from '../app/components/about/about.component';
import { ContactsComponent } from '../app/components/contacts/contacts.component';
import { ArtDetailsComponent } from '../app/components/art-details/art-details.component';
import { EditArticleComponent } from '../app/components/edit-article/edit-article.component';
import { RootRoomComponent } from '../app/components/root-room/root-room.component';
import { Routes, RouterModule } from '@angular/router';

export const routesConfig: Routes = [
  {path: 'article', component: ArticleComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'add-article', component: AddArticleComponent},
  {path: 'article/details/:id', component: ArtDetailsComponent},
  {path: 'article/edit-article/:id', component: EditArticleComponent},
  {path: 'root-room', component: RootRoomComponent},
  { path: '', component: ArticleComponent }

  // {path: 'main', component: MainComponent, children: [
  //   { path: 'about', component: AboutComponent },
  //   { path: '**', redirectTo: '/main' }
  // ]}
]
