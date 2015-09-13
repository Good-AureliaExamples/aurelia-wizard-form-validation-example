import {inject, bindable} from 'aurelia-framework';
import {Wizard} from 'src/views/home/wizard';

@inject(Wizard)
export class WizardStep2 {

  @bindable houseName;
  @bindable houseNumber;

  constructor(wizard) {
    this.wizard = wizard;
    this.houseName = this.wizard.address.houseName;
    this.houseNumber = this.wizard.address.houseNumber;
  }

  houseNameChanged(newValue) {
    this.wizard.address.houseName = newValue;
    if (this.wizard.validationStep2.result.properties['address.houseName'].isDirty) {
      this.checkHouseIsValid();
    }
  }

  houseNumberChanged(newValue) {
    this.wizard.address.houseNumber = newValue;
    if (this.wizard.validationStep2.result.properties['address.houseNumber'].isDirty) {
      this.checkHouseIsValid();
    }
  }

  checkHouseIsValid() {
    return this.wizard.validationStep2.validate().then(() => {
      return true;
    }, (err) => {
      console.log('form data is bad...', err); // eslint-disable-line no-console
      return false;
    });
  }
}
