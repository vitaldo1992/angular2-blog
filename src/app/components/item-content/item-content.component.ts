import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../providers/auth.service';


@Component({
  selector: 'app-item-content',
  templateUrl: './item-content.component.html',
  styleUrls: ['./item-content.component.scss']
})
export class ItemContentComponent implements OnInit {

  editing: Boolean;
  image: String;

  constructor(private firebase: AuthService) {
    this.editing = false;
  }

  ngOnInit() {
   }


  editArticle() {
    this.editing = !this.editing;
  }

  saveArticle(key, value) {
    this.firebase.articles.update(key, {art_content: value})
    this.editArticle();
  }

  @Input() item: string;

}
