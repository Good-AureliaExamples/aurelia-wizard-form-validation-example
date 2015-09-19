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
    if (this.wizard.validationStep2b.result.properties['houseName'].isDirty) {
      this.checkHouseIsValid();
    }
  }

  houseNumberChanged(newValue) {
    this.wizard.address.houseNumber = newValue;
    if (this.wizard.validationStep2b.result.properties['houseNumber'].isDirty) {
      this.checkHouseIsValid();
    }
  }

  checkHouseIsValid() {
    return this.wizard.validationStep2b.validate().then(
      () => true,
      () => false
    );
  }

  attached() {
    let favType = this.wizard.validationStep2a.result.properties['favouriteVertebrateType'];
    favType.isValid = false;
    favType.isDirty = false;
  }
}
