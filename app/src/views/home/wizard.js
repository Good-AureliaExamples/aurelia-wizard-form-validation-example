import {inject} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {Person} from 'src/views/home/person';
import {Address} from 'src/views/home/address';
import {vertebrates, countries} from 'src/views/home/data';

@inject(Validation)
export class Wizard {

  constructor(validation) {
    this.validation = validation;
    this.vertebrates = vertebrates;
    this.countries = countries;
    this.person = new Person();
    this.address = new Address();

    this.validationStep1 = this.setupValidatonStep1();
    this.validationStep2 = this.setupValidatonStep2();
    this.validationStep3 = this.setupValidatonStep3();
  }

  setupValidatonStep1() {
    return this.validation.on(this)
      .ensure('person.forename')
      .isNotEmpty()

      .ensure('person.surname')
      .isNotEmpty()

      .ensure('person.favouriteVertebrateClass')
      .isNotEmpty();
  }

  setupValidatonStep2() {
    return this.validation.on(this)
      .ensure('person.favouriteVertebrateType')
      .isNotEmpty()

      .ensure('address.houseName', (config) => {
        config.computedFrom(['address.houseNumber']);
      })
      .if(() => {
        return !this.address.houseNumber;
      })
      .isNotEmpty()
      .withMessage(' is required if no house number is entered')
      .endIf()
      .if(() => {
        return !!this.address.houseNumber;
      })
      .mustBeEmpty()
      .withMessage(' cannot be entered if you have a house number')
      .endIf()

      .ensure('address.houseNumber', (config) => {
        config.computedFrom(['address.houseName']);
      })
      .if(() => {
        return !this.address.houseName;
      })
      .isNotEmpty()
      .withMessage(' is required if no house name is entered')
      .endIf()
      .if(() => {
        return !!this.address.houseName;
      })
      .mustBeEmpty()
      .withMessage(' cannot be entered if you have a house name')
      .endIf()

      .ensure('address.street')
      .isNotEmpty()

      .ensure('address.town')
      .isNotEmpty()

      .ensure('address.country')
      .isNotEmpty()

      .ensure('address.postcode')
      .isNotEmpty();
  }

  setupValidatonStep3() {
    return this.validation.on(this)
      .ensure('person.agreeToTerms')
      .isNotEqualTo(false)
      .withMessage('*')

      .ensure('person.agreeToSellKidney')
      .isNotEqualTo(false)
      .withMessage('*');
  }
}
