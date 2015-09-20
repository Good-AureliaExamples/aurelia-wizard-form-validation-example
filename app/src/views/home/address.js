import {transient} from 'aurelia-framework';

@transient()
export class Address {
  houseName = '';
  houseNumber = '';
  street = '';
  town = '';
  country = '';
  postcode = '';

  validator(validation) {
    return validation.on(this)

      .ensure('houseName', (config) => {
        config.computedFrom(['houseNumber']);
      })
      .if(() => {
        return !this.houseNumber;
      })
      .isNotEmpty()
      .withMessage(' is required if no house number is entered')
      .endIf()
      .if(() => {
        return !!this.houseNumber;
      })
      .mustBeEmpty()
      .withMessage(' cannot be entered if you have a house number')
      .endIf()

      .ensure('houseNumber', (config) => {
        config.computedFrom(['houseName']);
      })
      .if(() => {
        return !this.houseName;
      })
      .isNotEmpty()
      .withMessage(' is required if no house name is entered')
      .endIf()
      .if(() => {
        return !!this.houseName;
      })
      .mustBeEmpty()
      .withMessage(' cannot be entered if you have a house name')
      .endIf()

      .ensure('street')
      .isNotEmpty()

      .ensure('town')
      .isNotEmpty()

      .ensure('country')
      .isNotEmpty()

      .ensure('postcode')
      .isNotEmpty();
  }

  get formatted() {
    return `${this.houseName} ${this.houseNumber}, ${this.street}, ${this.town}, ${this.postcode}, ${this.country}`;
  }
}
