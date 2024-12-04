import { isValidCard } from "./validator";
import { isCardSystem } from "./cardsystems";

export class CardsWidget {
  constructor(parentEl) {
      this.parentEl = parentEl;
      this.systemDefined = false;
      this.onInput = this.onInput.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onClear = this.onClear.bind(this);
  }

  static get markup() { /** @license images of card systems from google.com */
      return `
        <div class="cardsform">
          <div class="cardsystems">
            <h3>Check your credit card number</h3>
            <ul class="cards list-unstyled">
              <li><span class="card mir" title="МИР">МИР</span></li>
              <li><span class="card visa" title="Visa">Visa</span></li>
              <li><span class="card master" title="Mastercard">Mastercard</span></li>
              <li><span class="card jcb" title="JCB">JCB</span></li>
            </ul>
          </div>
          <form class="form">
            <!-- <label for="input">Check your credit card number</label> -->

            <input type="text" class="input" id="input" maxlength="22">
            <span class="clear">&#10060;</span>
            <input type="submit" class="btn btn-success" value="Click to Validate">
          </form>
          <div class="result"></div>
        </div>
      `;
  }

  static get submitSelector() {
      return '.btn';
  }

  static get inputSelector() {
      return '.input';
  }

  static get selector() {
      return '.cardsform';
  }

  static get result() {
    return '.result';
  }
  
  static get card() {
    return '.card';
  }

  static get clear() {
    return '.clear';
  }

  bindToDOM() {
      this.parentEl.innerHTML = CardsWidget.markup;

      this.element = this.parentEl.querySelector(CardsWidget.selector);
      this.submit = this.element.querySelector(CardsWidget.submitSelector);
      this.input = this.element.querySelector(CardsWidget.inputSelector);
      this.result = this.element.querySelector(CardsWidget.result);
      this.cards = Array.from(this.element.querySelectorAll(CardsWidget.card));
      this.clear = this.element.querySelector(CardsWidget.clear);
      this.input.addEventListener('input', this.onInput);
      this.element.addEventListener('submit', this.onSubmit);
      this.clear.addEventListener('click', this.onClear);
  }
  
  onInput(e) {
    this.result.textContent = '';
    this.result.classList.value = 'result';
    // this.result.classList.remove('success');
    const value = this.input.value.replaceAll(' ', '');
    if(Number.isInteger(Number(value))) {
      this.CardSystem(value);
    } else {
      this.isResultError('Input Error', 0);
    }
  }

  CardSystem(value) {
    const foundsystems = isCardSystem(value);
    if (foundsystems === false) {
      this.isResult('Card system is not found', 0);
      return false;
    }
    let namesystems = [];
    foundsystems.forEach(item => namesystems.push(item.type));
    this.cards.forEach((card) => {
      if(namesystems.includes(Array.from(card.classList)[1])) {
        card.classList.remove('cdisabled');
      } else {
        card.classList.add('cdisabled');
      }
      this.systemDefined = foundsystems;
    })
  }

  isResult(value, messageType) {
    if(messageType === 0) {
      this.cards.forEach(card => card.classList.remove('cdisabled'));
      this.input.value = '';
      this.systemDefined = false;
      this.result.classList.add('error');
    } else if (messageType === 1) {
      this.result.classList.add('success');
    }
      this.result.textContent = value;
  }

  onSubmit(e) {
    e.preventDefault();
    this.result.textContent = '';
    this.result.classList.value = 'result';
    // this.result.classList.remove('success');
    const value = this.input.value.replaceAll(' ', '');
    this.input.value = value;
    if(value.length === 0) {
      this.isResult('Input Error', 0);
      return;
    }
    if(this.systemDefined.length === 1 && isValidCard(value, this.systemDefined)) {
     this.isResult('Card is Valid', 1);
      return;
    }
    this.isResult('Card is not valid', 0);
  }
  
  onClear(e) {
    this.cards.forEach(card => card.classList.remove('cdisabled'));
    this.input.value = '';
    this.systemDefined = false;
    this.result.classList.value = 'result';
    // this.result.classList.remove('success');
    this.result.textContent = '';
  }
}