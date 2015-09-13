import {inject, computedFrom} from 'aurelia-framework';
import {Wizard} from 'src/views/home/wizard';

@inject(Wizard)
export class Home {

  constructor(wizard) {
    this.wizard = wizard;
    this.steps = [
      new Step(1, 'Personal details', 'wizard-step-1'),
      new Step(2, 'Favourite animals', 'wizard-step-2'),
      new Step(3, 'Terms and conditions', 'wizard-step-3')
    ];
    this.restart();
  }

  nextStep() {
    this.validateStep(this.activeStep).then((isValid) => {
      if (isValid) {
        if (this.activeStep.id !== this.steps.length) {
          this.activeStep = this.steps[this.activeStep.id];
        } else {
          this.isComplete = true;
        }
      }
    });
  }

  previousStep() {
    if (this.activeStep.id !== 1) {
      this.wizard['validationStep' + this.activeStep.id].clear();
      this.activeStep = this.steps[this.activeStep.id - 2];
    }
  }

  @computedFrom('activeStep')
  get isLastPage() {
    return this.activeStep.id === 3;
  }

  @computedFrom('activeStep')
  get isFirstPage() {
    return this.activeStep.id === 1;
  }

  finish() {
    this.nextStep();
  }

  restart() {
    this.isComplete = false;
    this.activeStep = this.steps[0];
  }

  validateStep(step) {
    let key = 'validationStep' + step.id;
    return this.wizard[key].validate().then(() => {
      return true;
    }, (err) => {
      console.log('form data is bad...', err); // eslint-disable-line no-console
      return false;
    });
  }
}

class Step {
  id = 0;
  title = '';
  path = '';

  constructor(id, title, path) {
    this.id = id;
    this.title = title;
    this.path = 'src/views/home/' + path;
  }
}
