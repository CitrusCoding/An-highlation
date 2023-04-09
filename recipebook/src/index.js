import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//Chat Dialogue 

let state = {}; //keep track of choices

const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('response-options');

function startGame()
{
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex)
{
  //display current conversation text
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  //remove the preset 4 options set when defining the format 
  while(optionButtonsElement.firstChild)
  {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  textNode.options.forEach(option => {
    if(showOption(option))
    {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  })
}

function showOption(option)
{
  //if there is no required state or our required state is our current state, show the options
  if(option.requiredState == null || option.requiredState(state))
  {
    return true;
  }
  return;
}

function selectOption(option)
{
  const nextTextNodeId = option.nextText; 
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

//conversation tree
const textNodes = 
[
  {
    id: 1,
    text: "Hello there, Nice to meet you :)",
    options:
    [
      {
        text: "Hello",
        nextText: 2
      }
    ]
  },

  {
    id: 2,
    text: "What is your favourite season?",
    options:
    [
      {
        text: "Autumn",
        setState: {autumn: true}, //might be uneccesary, change background to season
        background: "orange", //just a tester 
        nextText: 3
      },
      {
        text: "Winter",
        setState: {winter: true},
        nextText: 3
      },
      {
        text: "Spring",
        setState: {spring: true},
        nextText: 3
      },
      {
        text: "Summer",
        setState: {summer: true},
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "wipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwipwip\nwipwip",
    options:
    [
      {
        text: "aw"
      },
      {
        text: "aw"
      },
      {
        text: "aw"
      }
    ]
  }
]

startGame();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
