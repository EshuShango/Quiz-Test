//when I click the button
//then timer starts and I am presented
//with a question

const button = document.createElement('button');
//the button
let secondsLeft = 10;


button.innerHTML = 'click me';
button.body.appendChild(button);

const setTimer = () => {
  alert('button was clicked');
}


button.addEventListener('click',setTimer)
//event listener 