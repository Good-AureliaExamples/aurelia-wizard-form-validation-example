import {inject} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {Person} from 'src/views/home/person';
import {Address} from 'src/views/home/address';
import {vertebrates, countries} from 'src/views/home/data';
import _ from 'lodash';

@inject(Person, Address, Validation)
export class Wizard {

  constructor(person, address, validation) {
    this.validation = validation;
    this.vertebrates = vertebrates;
    this.countries = countries;
    this.person = person;
    this.address = address;

    this.validationStep1 = this.person.stage1Validation;
    this.validationStep2a = this.person.stage2Validation;
    this.validationStep2b = this.address.validator(this.validation);
    this.validationStep3 = this.person.validation;
  }
}
