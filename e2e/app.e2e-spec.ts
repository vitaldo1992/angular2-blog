import { OwnNgFirebasePage } from './app.po';

describe('own-ng-firebase App', () => {
  let page: OwnNgFirebasePage;

  beforeEach(() => {
    page = new OwnNgFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
