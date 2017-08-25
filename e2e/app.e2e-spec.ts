import { TianzqPage } from './app.po';

describe('tianzq App', () => {
  let page: TianzqPage;

  beforeEach(() => {
    page = new TianzqPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
