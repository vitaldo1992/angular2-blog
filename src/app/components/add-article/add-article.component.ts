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
  art_content: any;
  path: any;

  constructor(private fbService: AuthService, private router: Router ) { }

  ngOnInit() {
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

}
