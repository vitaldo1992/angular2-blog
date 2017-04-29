import { Injectable } from '@angular/core';

@Injectable()
export class newFeature {

  role: string;
  canEdit: boolean;

  constructor(role) {
    this.role = role;
    switch (role) {
      case 'root':
        this.canEdit = true;
        break;
      case 'admin':
        this.canEdit = true;
        break;
      default:
        this.canEdit = false;
    }
  }
}
