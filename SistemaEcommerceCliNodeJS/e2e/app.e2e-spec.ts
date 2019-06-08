import { SistemaEcommerceCLIPage } from './app.po';

describe('sistema-ecommerce-cli App', function() {
  let page: SistemaEcommerceCLIPage;

  beforeEach(() => {
    page = new SistemaEcommerceCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
