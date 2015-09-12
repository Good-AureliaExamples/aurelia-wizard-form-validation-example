import {inject} from 'aurelia-framework';
import {Wizard} from 'src/views/home/wizard';

@inject(Wizard)
export class WizardStep3 {
  constructor(wizard) {
    this.wizard = wizard;
  }
}
