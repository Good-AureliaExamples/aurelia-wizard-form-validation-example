import {inject, computedFrom} from 'aurelia-framework';
import {Wizard} from 'src/views/home/wizard';

@inject(Wizard)
export class Home {

  constructor(wizard) {
    this.wizard = wizard;
    this.steps = [
      new Step(1, 'Personal details', 'wizard-step-1'),
      new Step(2, 'Favourite vertebrate type and address', 'wizard-step-2', ['validationStep2a', 'validationStep2b']),
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
    let currentStep = this.activeStep.id - 1;

    this.steps[currentStep].validations.forEach((item) => {
      this.wizard[item].clear();
    });

    this.activeStep = this.steps[currentStep - 1];
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
    let promises;

    if (step.id !== 2) {
      promises = [this.wizard['validationStep' + step.id].validate()];
    } else {
      promises = [
        this.wizard.validationStep2a.validate(),
        this.wizard.validationStep2b.validate()
      ];
    }
    return Promise.all(promises).then(
      () => true,
      () => false
    );
  }
}

class Step {
  id = 0;
  title = '';
  path = '';
  validations = [];

  constructor(id, title, path, validations) {
    this.id = id;
    this.title = title;
    this.path = 'src/views/home/' + path;
    this.validations = validations || 'validationStep' + id;
  }
}
