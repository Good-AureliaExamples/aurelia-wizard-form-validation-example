import {inject, computedFrom} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {Person} from 'src/views/home/person';

@inject(Validation)
export class Wizard {

  vertebrates = [
    {
      type: 'Mammals',
      examples: ['Ape', 'Cat', 'Dog']
    },
    {
      type: 'Bony Fish',
      examples: ['Cod', 'Haddock', 'Salmon', 'Coelacanth']
    },
    {
      type: 'Cartilaginous Fish',
      examples: ['Shark', 'Ray', 'Skate', 'Sawfish']
    },
    {
      type: 'Birds',
      examples: ['Swan', 'Eagle', 'Vulture', 'Cassowary']
    },
    {
      type: 'Amphibians',
      examples: ['Frog', 'Toad', 'Newt', 'Axolotl']
    }
  ];

  constructor(validation) {
    this.validation = validation;

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
      .withMessage('You must agree to the terms and conditions')

      .ensure('person.agreeToSellKidney')
      .isNotEqualTo(false)
      .withMessage('You must agree to sell your kidney');

  }
}
