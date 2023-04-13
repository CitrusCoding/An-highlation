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
var body = document.getElementsByTagName('body')[0];
var AIname; 

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

  //specific response effects
  //get the user-inputted name
  if(textNode.id === 2)
  {
    AIname = prompt("Please pick a name for me"); //could make this visually nicer but good for now
  }
  //change season based on user's response (IMAGES TEMPORARY)
  if(textNode.id === 3)
  {
    if(state.autumn)
    {
      document.body.style.backgroundImage = "url('https://cdn.theatlantic.com/media/img/photo/2022/10/fall-air-images-season/a01_1244081372-1/original.jpg')"; //only works with online urls I guess
    }
    if(state.winter)
    {
      document.body.style.backgroundImage = "url('https://c.tadst.com/gfx/600x337/winter-lake.jpg?1')"; //only works with online urls I guess
    }
    if(state.spring)
    {
      document.body.style.backgroundImage = "url('https://media.cnn.com/api/v1/images/stellar/prod/210316134609-01-wisdom-project-spring.jpg?q=w_4000,h_2250,x_0,y_0,c_fill')"; //only works with online urls I guess
    }
    if(state.summer)
    {
      document.body.style.backgroundImage = "url('https://hips.hearstapps.com/hmg-prod/images/beautiful-tropical-sunset-scenery-two-sun-beds-royalty-free-image-1595368231.jpg')"; //only works with online urls I guess
    }
  }
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
    text: "Please pick a name for me.",
    options:
    [
      {
        text: "Enter Name",
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
        //background: "orange", //just a tester, doesn't work
        //bgimage: "images/fall.jpg", //doesnt work

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
