
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from "@angular/core";

import { AngularFireModule } from 'angularfire2';
import { FireBaseConfig } from '../environments/firebase';
import { AuthService } from './providers/auth.service';

// Components
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';

// Routing
import { RouterModule } from '@angular/router';
import { routesConfig } from '../routes/router.module';

import { ItemContentComponent } from './components/item-content/item-content.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArtDetailsComponent } from './components/art-details/art-details.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { RootRoomComponent } from './components/root-room/root-room.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ItemContentComponent,
    HeaderComponent,
    AboutComponent,
    ContactsComponent,
    FooterComponent,
    SidebarComponent,
    AddArticleComponent,
    ArtDetailsComponent,
    EditArticleComponent,
    RootRoomComponent
  ],
  imports: [
    FlashMessagesModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routesConfig),
    AngularFireModule.initializeApp(FireBaseConfig)
  ],
  exports: [],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
