export class Home {

  constructor(wizard) {
    this.wizard = wizard;
    this.steps = [
      new Step(1, 'Personal details', 'wizard-step-one'),
      new Step(2, 'Step 2', 'wizard-step-two'),
      new Step(3, 'Step 3', 'wizard-step-three')
    ];
    this.reset();
  }

}
