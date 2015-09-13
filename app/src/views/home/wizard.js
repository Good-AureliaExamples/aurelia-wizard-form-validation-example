import {inject} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {Person} from 'src/views/home/person';
import {vertebrates} from 'src/views/home/data';

@inject(Validation)
export class Wizard {

  constructor(validation) {

    this.validation = validation;
    this.vertebrates = vertebrates;
    this.person = new Person();

    this.validationStep1 = validation.on(this)
      .ensure('person.forename')
      .isNotEmpty()
      .ensure('person.surname')
      .isNotEmpty()
      .ensure('person.favouriteVertebrateClass')
      .isNotEmpty();

    this.validationStep2 = validation.on(this)
      .ensure('person.favouriteVertebrateType')
      .isNotEmpty();

    this.validationStep3 = validation.on(this)
      .ensure('person.agreeToTerms')
      .isNotEqualTo(false)
      .withMessage('*')
      .ensure('person.agreeToSellKidney')
      .isNotEqualTo(false)
      .withMessage('*');
  }
}
