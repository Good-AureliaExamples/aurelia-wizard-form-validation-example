import {inject} from 'aurelia-framework';
import {Wizard} from 'src/views/home/wizard';

@inject(Wizard)
export class WizardStep2 {
  constructor(wizard) {
    this.wizard = wizard;
  }
}
