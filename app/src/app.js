export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {route: ['', 'home'], moduleId: './views/home/home', title: 'Form Wizard', nav: true}
    ]);
  }
}
