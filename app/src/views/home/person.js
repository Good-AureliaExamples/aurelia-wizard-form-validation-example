import {transient, computedFrom} from 'aurelia-framework';

@transient()
export class Person {
  forename = '';
  surname = '';
  favouriteVertebrateClass = '';
  favouriteVertebrateType = '';
  agreeToTerms = false;
  agreeToSellKidney = false;

  @computedFrom('forename', 'surname')
  get fullname() {
    return `${this.forename} ${this.surname}`;
  }
}
