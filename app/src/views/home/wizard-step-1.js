import {inject, ObserverLocator} from 'aurelia-framework';
import {Wizard} from 'src/views/home/wizard';

@inject(Wizard, ObserverLocator)
export class WizardStep1 {
  constructor(wizard, observerLocator) {
    this.wizard = wizard;
    this.observerLocator = observerLocator;

    this.disposeSubscription = this.observerLocator
      .getObserver(this.wizard.person, 'favouriteVertebrateClass')
      .subscribe(() => this.onFavouriteVertebrateClassChange());
  }

  onFavouriteVertebrateClassChange() {
    this.wizard.person.favouriteVertebrateType = '';

    // reset validation flags to prevent initial validation error appearing when
    // favouriteVertebrateClass has triggered a change in favouriteVertebrateType
    let t = this.wizard.validationStep2.result.properties['person.favouriteVertebrateType'];
    t.isValid = false;
    t.isDirty = false;
  }

  detached() {
    this.disposeSubscription();
  }
}

