import {ValidationGroup} from 'aurelia-validation';
import {mustBeEmpty} from './validation/custom-validation-rules';

export class App {
  constructor() {
    ValidationGroup.prototype.mustBeEmpty = mustBeEmpty;
  }

  configureRouter(config, router) {
    this.router = router;
    config.map([
      {route: ['', 'home'], moduleId: './views/home/home', title: 'Form Wizard', nav: true}
    ]);
  }
}
