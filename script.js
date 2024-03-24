const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function addUserMessage(message) {
  const div = document.createElement('div');
  div.innerHTML = `<>&gt;</> ${message}`;
  chatBox.appendChild(div);
}

function addBotResponse(message) {
  const div = document.createElement('div');
  div.classList.add('bot-response'); // Add a class for styling
  chatBox.appendChild(div);

  let index = 0;

  function typeWriter() {
    if (index < message.length) {
      div.innerHTML += message.charAt(index);
      index++;
      setTimeout(typeWriter, 50); // Adjust typing speed as needed (milliseconds)
    }
  }

  typeWriter();
}

userInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    const userMessage = userInput.value;
    if (userMessage.trim() !== '') {
      addUserMessage(userMessage);
      if (userMessage.toLowerCase().startsWith('open ')) {
        const url = userMessage.slice(5); // Extract the URL after 'open '
        openWebPage(url);
      } else {
        const botResponse = generateBotResponse(userMessage);
        setTimeout(() => {
          addBotResponse(`<C:chatBOT> ${botResponse}`);
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);
      }
      userInput.value = '';
    }
  }
});

function generateBotResponse(userMessage) {
  const commands = [
    {
      command: ['hello', 'hi', 'hey', 'what\'s up'],
      response: ['hey dear', 'am good', 'yeah hi', 'what\'s good']
    },
    {
      command: ['02.36', '00.22', '23.85', '78.63'],
      response: ['02.34, 89.36, 36.45, 33.11  0  =  lost', 
      '02.14, 89.36, 37.45, 33.11  0%  =  lost', 
      '02.34, 19.36, 36.45, 11.11  0%  =  lost', 
      '02.94, 29.36, 06.45, 33.61  0%  =  lost',
      '02.74, 29.36, 36.45, 33.69  33%  =  tips',
      '02.55, 89.86, 36.40, 00.11  11%  =  tips',
      '02.64, 89.36, 36.45, 33.91  0%  =  lost',
      '02.04, 89.82, 36.45, 33.11  55%  =  pass',
      '02.34, 41.36, 78.45, 33.11  4%  =  tips',
      '12.34, 39.36, 26.45, 33.11  85%  =  APPROVED ==WIN== 29 $$',
      '72.34, 89.96, 36.45, 31.11  10%  =  pass',
      '02.34, 26.36, 36.04, 33.91  0%  =  lost',
      '62.94, 89.36, 36.45, 33.11  0%  =  lost',
      '02.34, 89.36, 36.45, 33.11  0% =  tips',
      '42.34, 89.36, 36.45, 33.11  0% =  lost',
      '72.34, 89.36, 36.45, 33.11  0% =  pass',
      '02.34, 89.36, 36.45, 33.11  0% =  lost',
      '52.34, 89.36, 36.45, 33.11  99% =  APPROVED ==WIN== 100 $$',
      '62.34, 89.36, 36.45, 33.11  0% =  tips',
      '12.34, 89.36, 36.45, 33.11  6% =  pass',
      '22.34, 89.36, 36.45, 33.11  0% =  lost',
      '32.34, 89.36, 36.45, 33.11  8% =  lost',
      '42.34, 89.36, 36.45, 33.11  0% =  pass',
      '52.34, 89.36, 36.45, 33.11  0% =  tips',
      '62.34, 89.36, 36.45, 33.11  32% =  lost',
      '72.34, 89.36, 36.45, 33.11  0% =  lost',
      '82.34, 89.36, 36.45, 33.11  0% =  pass',
      '92.34, 89.36, 36.45, 33.11  60% =  APPROVED ==WIN== 10 $$',
      '92.34, 89.36, 36.45, 33.11  0% =  lost',
      '82.34, 89.36, 36.45, 33.11  0% =  tips',
      '72.34, 89.36, 36.45, 33.11  44% =  lost',
      '62.34, 89.36, 36.45, 33.11  0% =  pass',
      '52.34, 89.36, 36.45, 33.11  0% =  lost',
      ]
    },
    // Add more commands and responses here
    {
      command: 'help',
      response: 'List of available commands: <br> - hello <br> - command1 <br> - command2 <br> - command3 <br> - open [URL]'
    },
    {
      command: 'command1',
      response: 'Executing command 1...'
    },
    {
      command: 'command2',
      response: 'Executing command 2...'
    },
    {
      command: 'command3',
      response: 'Executing command 3...'
    },
    {
      command: 'randomquestion',
      response: generateRandomQuestion()
    },
    {
      command: 'time',
      response: `Current time is: ${new Date().toLocaleTimeString()}`
    },
    {
      command: 'date',
      response: `Today's date is: ${new Date().toDateString()}`
    },
    {
      command: 'random',
      response: `Here's a random number: ${Math.floor(Math.random() * 100)}`
    },
    {
      command: 'about',
      response: 'I am just a simple chatbot created for demonstration purposes.'
    },
    {
      command: 'bye',
      response: 'Goodbye! Have a great day!'
    }
  ];

  let matchedCommand = null;
  for (const cmd of commands) {
    if (cmd.command instanceof Array) {
      if (cmd.command.includes(userMessage.toLowerCase())) {
        matchedCommand = cmd;
        break;
      }
    } else {
      if (userMessage.toLowerCase() === cmd.command) {
        matchedCommand = cmd;
        break;
      }
    }
  }

  if (matchedCommand) {
    if (matchedCommand.response instanceof Array) {
      const randomIndex = Math.floor(Math.random() * matchedCommand.response.length);
      return matchedCommand.response[randomIndex];
    } else {
      return matchedCommand.response;
    }
  } else {
    const responses = [
      'Command not recognized.',
      'Please try another command.',
      'I am just a simple bot, I cannot understand everything!',
      'What can I do for you today?',
      'Executing command...',
      'Processing request...',
      `You entered: ${userMessage}`,
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }
}

function generateRandomQuestion() {
  const questions = [
    'What is your favorite color?',
    'What is the capital of France?',
    'Who is the president of the United States?',
    'What is the square root of 144?',
    'What is the largest mammal in the world?',
    'What is the boiling point of water in Celsius?',
    // Add more questions here
  ];
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

function openWebPage(url) {
  window.open(url, '_blank');
}