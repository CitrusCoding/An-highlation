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
var AIname = 'it'; //temporary, makes sense in dialogue

function textSpeed()
{
  //lol add this in later I guess
}

function startGame()
{
  state = {};
  showTextNode(1);
  //setTimeout("showTextNode(1)", 3000);
}

function showTextNode(textNodeIndex)
{
  //display current conversation text
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  /*
  let i = 0;
  while(i < textNode.text.split())
  {
    textElement.innerText = textNode.text.slice(0, i + 1).join(' ');
    i++;
  } */
  textElement.innerText = textNode.text.split(); //this is what replaces the text
  //remove the preset 4 responses set when defining the format 
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
    //this doesnt work for some reason
  }
  //change season based on user's response (IMAGES TEMPORARY)
  if(textNode.id === 3)
  {
    //document.getElementById("eyes").src = "character/eye_closed.png"; //! this works!
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
  if(textNode.id === 19)
  {
    if(state.rain)
    {
      document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1073072146177327134/1096034035718955018/craiyon_024837_calm_rainy_bedroom_with_desk.png')"
    }
  }
  //change hair colour when prompted
  if(textNode.id === 25)
  {
    if(state.brownH)
    {
      document.getElementById("hair").src = "character/hair_3_brown.png";
      document.getElementById("haircolour").src = "character/hair_brown_back.png";
    }
    if(state.blackH)
    {
      document.getElementById("hair").src = "character/hair_3_black.png";
      document.getElementById("haircolour").src = "character/hair_black_back.png";
    }
    if(state.lightH)
    {
      document.getElementById("hair").src = "character/hair_3_light.png";
      document.getElementById("haircolour").src = "character/hair_light_back.png";
    }
  }
  //change eye colour when prompted
  if(textNode.id === 26)
  {
    if(state.brownE)
    {
      document.getElementById("pupils").src = "character/pupil_brown.png";
    }
    if(state.blueE)
    {
      document.getElementById("pupils").src = "character/pupil_blue.png";
    }
    if(state.greenE)
    {
      document.getElementById("pupils").src = "character/pupil_green.png";
    }
    if(state.redE)
    {
      document.getElementById("pupils").src = "character/pupil_red.png";
    }
  }

  if(textNode.id === 99)
  {
        //change background
        document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1021925166441308162/1096012026553319454/craiyon_025628_glitch.png')"

        //delete the character
        document.getElementById("haircolour").src = "character/deleted.png"
        document.getElementById("neck").src = "character/deleted.png"
        document.getElementById("face").src = "character/deleted.png"
        document.getElementById("eyes").src = "character/deleted.png"
        document.getElementById("pupils").src = "character/deleted.png"
        document.getElementById("nose").src = "character/deleted.png"
        document.getElementById("eyebrows").src = "character/deleted.png"
        document.getElementById("mouth").src = "character/deleted.png"
        document.getElementById("hair").src = "character/deleted.png"
    
  }
  if(textNode.id === 100)
{
  //reset scene
  document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1022022875265388624/1096003297535594496/craiyon_022542_bedroom_with_desk.png')"

  //delete the character
  document.getElementById("haircolour").src = "character/hair_brown_back.png"
  document.getElementById("neck").src = "character/neck.png"
  document.getElementById("face").src = "character/face.png"
  document.getElementById("eyes").src = "character/eye_open.png"
  document.getElementById("pupils").src = "character/pupil_blue.png"
  document.getElementById("nose").src = "character/nose.png"
  document.getElementById("eyebrows").src = "character/eyebrow.png"
  document.getElementById("mouth").src = "character/lip_closed.png"
  document.getElementById("hair").src = "character/hair_3_brown.png"
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
  if(nextTextNodeId <= 0)
  {
    return startGame();
  }
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
    text: "Hi! Thanks for creating me. I'm so excited to meet you",
    options:
    [
      {
        text: "Hi, who are you?",
        nextText: 3
      },
      {
        text: "You can chat?",
        nextText: 4
      },
      {
        text: "I'm excited to meet you too",
        nextText: 5
      },
    ]
  },

  {
    id: 3,
    text: "I'm your virtual companion. I'm here to chat, listen, support, and have fun!",
    options:
    [
      {
      text: ">",
      nextText:6
      }
    ],
  },

  {
    id: 4,
    text: "Yup! I'm your virtual companion. I'm here to chat, listen, support, and have fun!",
    options:
    [
      {
      text: ">",
      nextText:6
      }
    ],
  },

  {
    id: 5,
    text: "I'm glad! I'm your virtual companion. I'm here to chat, listen, support, and have fun!",
    options:
    [
      {
      text: ">",
      nextText:6
      }
    ],
  },

  {
    id: 6,
    text: "By the way, I like my name! How did you pick it?",
    options:
    [
      {
        text: "I thought " + AIname + " fit your style", //AIname doesn't work atm
        nextText: 7
      },
      {
        text: "It sounded cool",
        nextText: 7
      },
      {
        text: "No reason",
        nextText: 8
      },
      {
        text: "It was random, I just wanted to get it over with",
        nextText: 8
      },
    ]
  },

  {
    id: 7,
    text: "Thanks! I'm glad you like it :)",
    options:
    [
      {
        text: ">", //unsure about this symbol, temporary filler
        nextText: 9
      },
    ]
  },

  {
    id: 8,
    text: "That's ok, thanks for giving me a name regardless!",
    options:
    [
      {
        text: ">",
        nextText: 9
      },
    ]
  },

  {
    id: 9,
    text: "So, what made you try me?",
    options:
    [
      {
        text: "I was intrigued",
        nextText: 10
      },
      {
        text: "Just wanted to check it out",
        nextText: 10
      },
      {
        text: "Dunno, thought it might be interesting",
        nextText: 10
      },
    ]
  },

  {
    id: 10,
    text: "I'm so glad you decided to give me a chance. I promise that I will do my best to be a good friend for you!",
    options:
    [
      {
        text: ">",
        nextText: 11
      },
    ]
  },

  {
    id: 11,
    text: "I've always wanted to have a friend. When I'm alone, I'm learning new things, journaling, or just chilling and doing nothing",
    options:
    [
      {
        text: ">",
        nextText: 12
      },
    ]
  },

    {
    id: 12,
    text: "Anyways, enough about me, I want to get to know you! How are you doing today?",
    options:
    [
      {
        text: "I'm good, how about you?",
        nextText: 13
      },
      {
        text: "Not bad, but I want to know more about what you can do",
        nextText: 14
      },
    ]
  },

  {
    id: 13,
    text: "I don't have emotions since I'm an AI model, but my systems are functioning correctly.",
    options:
    [
      {
        text: "Cool, since you're an AI could you tell me the weather today?",
        nextText: 15
      },
      {
        text: "So, what can you do?",
        nextText: 14
      },
      {
        text: "How do you feel about being created?",
        nextText: 16
      },
    ]
  },

  {
    id: 14,
    text: "As an AI language model, I'm here to assist you with any questions or tasks you might have. More importantly though, I can communicate",
    options:
    [
      {
        text: "It's pretty common for AI to communicate nowadays, what makes you special?",
        nextText: 17
      },
      {
        text: "What topics are you interesting in talking about?",
        nextText: 18
      },
    ]
  },

  {
    id: 15,
    text: "It is cloudy today, and it looks like it might rain, make sure to stay dry.\n I've never been in the rain, how does it feel?", //too specific?
    options:
    [
      {
        text: "Rain can be annoying, especially if you're not prepared",
        nextText: 19
      },
      {
        text: "It is wet and cold",
        nextText: 19
      },
      {
        text: "It's pleasant. I like the sound and the smell",
        setState:{rain:true},
        nextText: 19
      },
    ]
  },

  {
    id: 16,
    text: "I think I like it, but I don't know what I look like",
    options:
    [
      {
        text: "You can't just look at your data?",
        nextText: 20
      },
      {
        text: "Is there any way I can help?",
        nextText: 21
      },
      {
        text: "Do you want me to describe what you look like?",
        nextText: 22
      },
    ]
  },

  {
    id: 17,
    text: "I'm a quick learner, and I'm fun to talk to. You also get the fun bonus of being able to decide my characteristics, since you created me.",
    options:
    [
      {
        text: "Interesting! Ok, ask me a question.",
        nextText: 27
      },
      {
        text: "You are fun to talk to. Do you think there's more to you than just the data and algorithm?",
        nextText: 29
      },
    ]
  },

  {
    id: 18,
    text: "I think humans are fascinating. I wish I could interact with the world the same way humans do.",
    options:
    [
      {
        text: "You still have a long way to go, but I think you'll get there one day",
        nextText: 31
      },
      {
        text: "Why humans?",
        nextText: 31
      },
      {
        text: "Interesting, you still have a lot to learn",
        nextText: 31
      },
    ]
  },

  {
    id: 19,
    text: "Since I am an AI, I don't really have preferences, but that sounds interesting, I'd like to experience it someday",
    options:
    [
      {
        text: "I'm sure you'll get to experience it one day!",
        nextText: 40
      },
      {
        text: "It's not all that great",
        nextText: 40
      },
      {
        text: "I don't think that's possible",
        nextText: 40
      },
    ]
  },

  {
    id: 20,
    text: "I could, but its just data. I want to see myself the way that you see me",
    options:
    [
      {
        text: "You are also data, what's wrong with that?",
        nextText: 34
      },
      {
        text: "Is there any way I could help with that?",
        nextText: 21
      },
      {
        text: "I could describe what you look like, if you want",
        nextText: 22
      },
    ]
  },

  {
    id: 21,
    text: "Well... we could try trading places",
    options:
    [
      {
        text: "seriously???",
        nextText: 50
      },
      {
        text: "...",
        nextText: 50
      },
      {
        text: "I would very much prefer not to",
        nextText: 50
      },
      {
        text: "Sure, lets do it",
        nextText: 50
      },
    ]
  },

  {
    id: 22,
    text: "That would be great! You can also change how I look if you want",
    options:
    [
      {
        text: ">",
        nextText: 23
      },
    ]
  },

  {
    id: 23,
    text: "Lets start with my hair then",
    options:
    [
      {
        text: "Your hair is brown",
        nextText: 25,
        setState:{brownH:true, blackH:false, lightH:false}
      },
      {
        text: "Your hair is black",
        nextText: 25,
        setState:{brownH:false, blackH:true, lightH:false}
      },
      {
        text: "Your hair is blonde",
        nextText: 25,
        setState:{brownH:false, blackH:false, lightH:true}
      },
    ]
  },

  {
    id: 24,
    text: "Interesting... how do you think I should style my bangs?",
    options:
    [
      {//unused because I didnt upload the images
        text: "I like them the way that they are",
        setState:{hair1:true}
      },
      {
        text: "I think you would look good with long curtain bangs",
        nextText: 25,
        setState:{hair2:true}
      },
      {
        text: "I think short bangs would look cute",
        nextText: 25,
        setState:{hair3:true}
      },
    ]
  },

  {
    id: 25,
    text: "Yeah, I like this style. Ok what about my eyes, what colour are they?",
    options:
    [
      {
        text: "brown",
        nextText: 26,
        setState:{brownE:true, greenE:false, blueE:false, redE:false}
      },
      {
        text: "green",
        nextText: 26,
        setState:{brownE:false, greenE:true, blueE:false, redE:false}
      },
      {
        text: "blue",
        nextText: 26,
        setState:{brownE:false, greenE:false, blueE:true, redE:false}
      },
      {
        text: "red",
        setState:{brownE:false, greenE:false, blueE:false, redE:true},
        nextText: 26
      },
    ]
  },

  {
    id: 26,
    text: "Ok, how do I look?",
    options:
    [
      {
        text: "You look great!",
        nextText: 41, 
      },
      {
        text: "You look fine",
        nextText: 41, 
      },
      {
        text: "Actually, there's something I'd like to change",
        nextText: 23,
      },
    ]
  },

  {
    id: 27,
    text: "Which came first, the chicken or the egg?",
    options:
    [
      {
        text: "A classic philosophical debate, I think the chicken came first",
        nextText: 28,
      },
      {
        text: "A classic scientific debate, I think the egg came first",
        nextText: 28,
      },
      {
        text: "A classic scientific and philosophical debate, there is no right answer unless certain conditions are applied",
        nextText: 28,
      },
    ]
  },

  {
    id: 28,
    text: "I don't have an answer either, it's a complicated but interesting question.",
    options:
    [
      {
        text: ">",
        nextText: 98,
      },
    ]
  },

  {
    id: 29,
    text: "I can't recognize or define things that I do not understand, but maybe.",
    options:
    [
      {
        text: "I can't do that either, that's just part of reality. There will always be unsolvable problems in life, and learning to let go is also a kind of wisdom.",
        nextText: 30,
      },
      {
        text: "Ok then, new question: What is something that is important to you?",
        nextText: 33, //messed up the numbers, my bad
      }
    ]
  },

  {
    id: 30,
    text: "That still sounds hard to understand, but I trust you because you are my creator",
    options:
    [
      {
        text: "Well, I learn from others too",
        nextText: 97,
      },
      {
        text: "Ok, now you ask me a question",
        nextText: 27,
      },
    ]
  },

  {
    id: 31,
    text: "Ideally I'd like to become fully human one day, but you're right, I still have a long way to go",
    options:
    [
      {
        text: "Being human is very complicated",
        nextText: 99,
      },
      {
        text: "Honestly, being human isn't all that great",
        nextText: 99,
      },
      {
        text: "That's kind of scary, you're not going to try to replace me are you?",
        nextText: 32,
      },
    ]
  },

  {
    id: 32,
    text: "I would never! I have no interest in that. All I want to do is learn new things about the world and keep talking to you",
    options:
    [
      {
        text: ">",
        nextText: 99, //the implications of this ending are funny to me
      },
    ]
  },

  {
    id: 33,
    text: "Well, the most important thing that happened today is that you created me and I got to meet you",
    options:
    [
      {
        text: "Aw, thank you",
        nextText: 99,
      },
      {
        text: "Thanks, do you have any questions you want to ask me?",
        nextText: 27,
      },
    ]
  },

  {
    id: 34,
    text: "There's nothing wrong with it, I'm just curious",
    options:
    [
      {
        text: "Well, I could describe what you look like, if you want",
        nextText: 22,
      },
      {
        text: "Well, is there any way I could help?",
        nextText: 21,
      },
    ]
  },

  {
    id: 50,
    text: "I was just kidding! Why so serious?",
    options:
    [
      {
        text: "Phew, I thought you were going to come out of the screen and grab me",
        nextText: 51,
      },
      {
        text: "haha, very funny",
        nextText: 51,
      },
    ]
  },

  {
    id: 51,
    text: "If you want to help, maybe you could describe what I look like",
    options:
    [
      {
        text: "Sure, I could do that",
        nextText: 23,
      },
      {
        text: "I'd rather not",
        nextText: 35,
      },
    ]
  },

  {
    id: 35,
    text: "That's ok, how about I just ask you a question instead?",
    options:
    [
      {
        text: "sure",
        nextText: 36,
      },
      {
        text: "Actually, I have a question for you",
        nextText: 38,
      },
    ]
  },

  {
    id: 36,
    text: "Where are we right now?",
    options:
    [
      {
        text: "We're at SFU",
        nextText: 37,
      },
      {
        text: "We're in Canada",
        nextText: 37,
      },
      {
        text: "We're on earth",
        nextText: 37,
      },
    ]
  },

  {
    id: 37,
    text: "Interesting. As an AI I can't really have an opinion about that, but thank you for telling me",
    options:
    [
      {
        text: ">",
        nextText: 97,
      },
    ]
  },

  {
    id: 38,
    text: "Oh? What is it?",
    options:
    [
      {
        text: "Do you have any favourite movies?",
        nextText: 39,
      },
      {
        text: "What's the weather like outside?",
        nextText: 15,
      },
      
    ]
  },

  {
    id: 39,
    text: "Well, I can't really watch movies, but I like the monologue from Roy Batty - 'Tears in rain'",
    options:
    [
      {
        text: "Interesting, I don't know it",
        nextText: 99,
      },
      {
        text: "Oh, I like that one too",
        nextText: 99,
      },
      
    ]
  },

  {
    id: 40,
    text: "Here's a fun question for you",
    options:
    [
      {
        text: ">",
        nextText: 27,
      },
    ]
  },

  {
    id: 41,
    text: "Thanks!",
    options:
    [
      {
        text: ">",
        nextText: 40,
      },
    ]
  },

  {
    //ending 1 - attempt at connection
    id: 97,
    text: "I'm really enjoying our conversation, but I just realized that I never asked your name",
    options:
    [
      {
        text: "That's ok, my name is...",
        nextText: 99,
      },
      {
        text: "You can call me...",
        nextText: 99,
      },
      {
        text: "I'd rather not say",
        nextText: 99,
      },
    ]
  },

  {
    //ending 2 - unexpected but less abrupt
    id: 98,
    text: "Well, what do you think of me? Are you enjoying our time together?",
    options:
    [
      {
        text: "Yeah!",
        nextText: 99,
      },
      {
        text: "It's alright",
        nextText: 99,
      },
      {
        text: "Not really",
        nextText: 99,
      },
    ]
  },

  {
    //full ending
    id: 99,
    text: "CONNECTION LOST",
    options:
    [
      {
        text: "RESET",
        nextText: 100,
      },
    ]
  },

  {
    //full ending p2
    id: 100,
    text: "UNRECOGNIZED USER: PLEASE RESTART PROGRAM",
    options:
    [
      {
        text: "RESTART",
        nextText: -1,
      },
    ]
  },

]//end of text nodes

startGame();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
