import {transient} from 'aurelia-framework';

@transient()
export class Address {
  houseName = '';
  houseNumber = '';
  street = '';
  town = '';
  country = '';
  postcode = '';

  get formatted() {
    return `${this.houseName} ${this.houseNumber}, ${this.street}, ${this.town}, ${this.postcode}, ${this.country}`;
  }
}
