import {computedFrom, inject} from 'aurelia-framework';
import {Validation, ensure} from 'aurelia-validation';

@inject(Validation)
export class Person {

  @ensure((it) => { it.isNotEmpty() })
  forename = '';

  @ensure((it) => { it.isNotEmpty() })
  surname = '';

  @ensure((it) => { it.isNotEmpty() })
  favouriteVertebrateClass = '';

  @ensure((it) => { it.isNotEmpty() })
  favouriteVertebrateType = '';

  @ensure((it) => { it.isNotEqualTo(false) })
  agreeToTerms = false;

  @ensure((it) => { it.isNotEqualTo(false) })
  agreeToSellKidney = false;

  @computedFrom('forename', 'surname')
  get fullname() {
    return `${this.forename} ${this.surname}`;
  }

  constructor(validation) {
    this.validation = validation.on(this);

    this.stage1Validation = validation.on(this).onValidate(() => {
      this.stage1Validation.result.properties.favouriteVertebrateType.isValid = true;
      this.stage1Validation.result.properties.agreeToTerms.isValid = true;
      this.stage1Validation.result.properties.agreeToSellKidney.isValid = true;
    });

    this.stage2Validation = validation.on(this).onValidate(() => {
      this.stage2Validation.result.properties.agreeToTerms.isValid = true;
      this.stage2Validation.result.properties.agreeToSellKidney.isValid = true;
    })
  }
}
