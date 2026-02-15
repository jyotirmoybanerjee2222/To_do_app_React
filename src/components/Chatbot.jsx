// Chatbot.jsx (FIXED - Better command parsing)
import React, { useState, useRef, useEffect } from "react";

function Chatbot({ tasks, onAddTask, onDeleteTask, onMoveTaskUp, onMoveTaskDown }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Process task commands
  const processCommand = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Add task commands
    if (lowerMessage.includes("add") || lowerMessage.includes("create")) {
      const taskMatch = userMessage.match(/add(?:\s+task)?\s+(.+)/i) || 
                       userMessage.match(/create(?:\s+task)?\s+(.+)/i);
      
      if (taskMatch && taskMatch[1]) {
        const newTask = taskMatch[1].trim();
        onAddTask(newTask);
        return `✅ Added task: "${newTask}"`;
      }
      return "❌ Please specify a task to add. Example: 'add buy groceries'";
    }
    
    // Delete task commands
    if (lowerMessage.includes("delete") || lowerMessage.includes("remove")) {
      const numberMatch = userMessage.match(/\d+/);
      if (numberMatch) {
        const taskIndex = parseInt(numberMatch[0]) - 1;
        if (taskIndex >= 0 && taskIndex < tasks.length) {
          const deletedTask = tasks[taskIndex];
          onDeleteTask(taskIndex);
          return `🗑️ Deleted task: "${deletedTask}"`;
        } else {
          return `❌ Task number ${numberMatch[0]} doesn't exist. You have ${tasks.length} tasks.`;
        }
      }
      
      // Try to match task by name
      const taskName = userMessage.replace(/delete|remove|task/gi, '').trim();
      if (taskName) {
        const taskIndex = tasks.findIndex(t => t.toLowerCase().includes(taskName.toLowerCase()));
        
        if (taskIndex !== -1) {
          const deletedTask = tasks[taskIndex];
          onDeleteTask(taskIndex);
          return `🗑️ Deleted task: "${deletedTask}"`;
        }
      }
      return "❌ Please specify a task number or name. Example: 'delete task 2'";
    }
    
    // Move task up commands
    if (lowerMessage.includes("move") && (lowerMessage.includes("up") || lowerMessage.includes("higher"))) {
      // First try to find a number
      const numberMatch = userMessage.match(/\d+/);
      if (numberMatch) {
        const taskIndex = parseInt(numberMatch[0]) - 1;
        if (taskIndex > 0 && taskIndex < tasks.length) {
          const taskName = tasks[taskIndex];
          onMoveTaskUp(taskIndex);
          return `⬆️ Moved task "${taskName}" up`;
        } else if (taskIndex === 0) {
          return `❌ Task is already at the top!`;
        } else {
          return `❌ Task number ${numberMatch[0]} doesn't exist.`;
        }
      }
      
      // If no number, try to match by name
      const taskName = userMessage.replace(/move|up|higher|task/gi, '').trim();
      if (taskName) {
        const taskIndex = tasks.findIndex(t => t.toLowerCase().includes(taskName.toLowerCase()));
        
        if (taskIndex !== -1) {
          if (taskIndex === 0) {
            return `❌ Task "${tasks[taskIndex]}" is already at the top!`;
          }
          const movedTask = tasks[taskIndex];
          onMoveTaskUp(taskIndex);
          return `⬆️ Moved task "${movedTask}" up`;
        } else {
          return `❌ Task "${taskName}" not found. You have: ${tasks.join(', ')}`;
        }
      }
      
      return "❌ Please specify which task to move. Example: 'move task 2 up' or 'move Joga up'";
    }
    
    // Move task down commands
    if (lowerMessage.includes("move") && (lowerMessage.includes("down") || lowerMessage.includes("lower"))) {
      // First try to find a number
      const numberMatch = userMessage.match(/\d+/);
      if (numberMatch) {
        const taskIndex = parseInt(numberMatch[0]) - 1;
        if (taskIndex >= 0 && taskIndex < tasks.length - 1) {
          const taskName = tasks[taskIndex];
          onMoveTaskDown(taskIndex);
          return `⬇️ Moved task "${taskName}" down`;
        } else if (taskIndex === tasks.length - 1) {
          return `❌ Task is already at the bottom!`;
        } else {
          return `❌ Task number ${numberMatch[0]} doesn't exist.`;
        }
      }
      
      // If no number, try to match by name
      const taskName = userMessage.replace(/move|down|lower|task/gi, '').trim();
      if (taskName) {
        const taskIndex = tasks.findIndex(t => t.toLowerCase().includes(taskName.toLowerCase()));
        
        if (taskIndex !== -1) {
          if (taskIndex === tasks.length - 1) {
            return `❌ Task "${tasks[taskIndex]}" is already at the bottom!`;
          }
          const movedTask = tasks[taskIndex];
          onMoveTaskDown(taskIndex);
          return `⬇️ Moved task "${movedTask}" down`;
        } else {
          return `❌ Task "${taskName}" not found. You have: ${tasks.join(', ')}`;
        }
      }
      
      return "❌ Please specify which task to move. Example: 'move task 2 down' or 'move Joga down'";
    }
    
    // List tasks command
    if (lowerMessage.includes("list") || lowerMessage.includes("show") || lowerMessage.includes("what are")) {
      if (tasks.length === 0) {
        return "📝 You don't have any tasks yet. Add one to get started!";
      }
      const taskList = tasks.map((task, index) => `${index + 1}. ${task}`).join('\n');
      return `📝 Your tasks:\n${taskList}`;
    }
    
    // Help command
    if (lowerMessage.includes("help") || lowerMessage === "?") {
      return `🤖 Here's what I can do:
- Add task: "add buy groceries"
- Delete task: "delete task 2" or "delete Meditation"
- Move task: "move task 1 up" or "move Joga down"
- List tasks: "list my tasks" or "show tasks"`;
    }
    
    // Unknown command
    return `❓ I didn't understand that. Try:
- "add [task name]" to add a task
- "delete task [number]" or "delete [name]" to delete
- "move task [number] up/down" or "move [name] up/down" to reorder
- "list tasks" to see all tasks
Type "help" for more info.`;
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);

    // Process command and get response
    const botResponse = processCommand(userMessage);
    
    // Add bot response
    setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
  };

  const startSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = function (event) {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = function () {
      setIsListening(false);
    };
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>🤖 Task Assistant</h2>
        <p className="chatbot-help">Try: "add buy groceries", "delete task 1", "move Joga up"</p>
      </div>
      
      <div className="chatbot-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>👋 Hi! I can help you manage your tasks.</p>
            <p>Try saying things like:</p>
            <ul>
              <li>"Add buy groceries"</li>
              <li>"Delete task 2" or "Delete Meditation"</li>
              <li>"Move task 1 up" or "Move Joga down"</li>
              <li>"List my tasks"</li>
            </ul>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < msg.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a command or question..."
        />
        <button 
          className="voice-button" 
          onClick={startSpeech}
          disabled={isListening}
        >
          {isListening ? "🎤 Listening..." : "🎤"}
        </button>
        <button 
          className="send-button" 
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;