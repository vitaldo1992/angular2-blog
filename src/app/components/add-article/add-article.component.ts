import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  art_title: any;
  art_date: any;
  art_content: string;
  path: any;
  myElem: HTMLElement;
  title: string = 'Article image';

  constructor(private fbService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.myElem = document.querySelector('input');
    console.log(this.myElem);
  }

  onAddSubmit() {
    let new_article = {
      art_title: this.art_title,
      art_date: this.art_date,
      art_content: this.art_content,
      path: this.path,

    }

    this.fbService.addArticle(new_article);
    this.router.navigate(['article'])
  }

  getInfo(event) {
    this.title = event.target.files[0].name;
  }

}
