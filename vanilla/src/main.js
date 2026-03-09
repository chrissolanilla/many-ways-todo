import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

const app = document.getElementById('app');

//DECLARING AN ELEMENT BEFORE ITS CREATED WILL NOT WORK
// const counterButton = document.getElementById('counter');
app.innerHTML = `
  <div>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Vanilla Todo</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

const counterButton = document.getElementById('counter');
setupCounter(counterButton);


