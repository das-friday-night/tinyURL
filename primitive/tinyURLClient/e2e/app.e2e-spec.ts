import { TinyURLClientPage } from './app.po';

describe('tiny-urlclient App', function() {
  let page: TinyURLClientPage;

  beforeEach(() => {
    page = new TinyURLClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
