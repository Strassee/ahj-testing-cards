import { CardsWidget } from "./components/cardswidget";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.app');
  const form = new CardsWidget(container);
  form.bindToDOM(); 
});
