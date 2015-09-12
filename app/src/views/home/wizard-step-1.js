import {inject} from 'aurelia-framework';
import {Wizard} from 'src/views/home/wizard';

@inject(Wizard)
export class WizardStep1 {
  constructor(wizard) {
    this.wizard = wizard;
  }
}
