# Todo List with AI Chatbot Assistant

An intelligent todo list application with an integrated AI chatbot that can manage your tasks through natural language commands and voice input.

## Features

### 🤖 AI Chatbot Assistant
- **Voice Commands**: Use speech recognition to add, delete, and move tasks
- **Natural Language Processing**: Understand commands like "add buy groceries" or "delete task 2"
- **Conversational AI**: Powered by Google Gemini for natural interactions
- **Real-time Updates**: Tasks update instantly in the main list

### ✅ Todo List Features
- Add, delete, and complete tasks
- Move tasks up and down
- Mark tasks as completed with strikethrough
- Manual input or chatbot control

## Setup Instructions

### 1. Install Dependencies
```bash
npm install @google/generative-ai
```

### 2. Set Up Environment Variables
Create a `.env` file in your project root:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from: https://makersuite.google.com/app/apikey

### 3. File Structure
```
src/
├── geminiService.js      # Google Gemini AI integration
├── Chatbot.jsx           # AI Chatbot component
├── TodoList.jsx          # Updated TodoList with chatbot
└── styles.css            # Styling for both components
```

### 4. Import the CSS
In your main application file (App.jsx or index.jsx):
```javascript
import './styles.css';
```

### 5. Use the TodoList Component
```javascript
import TodoList from './TodoList';

function App() {
  return <TodoList />;
}
```

## How to Use the Chatbot

### Text Commands

#### Add Tasks
- "add buy groceries"
- "add task call mom"
- "create go to gym"

#### Delete Tasks
- "delete task 1" (by number)
- "delete task 2"
- "remove meditation" (by name)

#### Move Tasks
- "move task 2 up"
- "move task 1 down"
- "move task 3 higher"

#### List Tasks
- "list my tasks"
- "show my tasks"
- "what are my tasks"

### Voice Commands

1. Click the 🎤 microphone button
2. Wait for "Listening..." indicator
3. Speak your command clearly
4. The command will appear in the input field
5. Click "Send" or press Enter

### Example Voice Commands
- "Add buy milk"
- "Delete task three"
- "Move task one up"
- "List all my tasks"

## Browser Compatibility

### Speech Recognition Support
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS 14.5+)
- ❌ Firefox (Not supported)

## Chatbot Command Syntax

The chatbot understands flexible natural language. Here are some examples:

### Adding Tasks
```
✅ "add buy groceries"
✅ "add task: call dentist"
✅ "create workout routine"
```

### Deleting Tasks
```
✅ "delete task 2"
✅ "remove the first task"
✅ "delete meditation"
```

### Moving Tasks
```
✅ "move task 1 up"
✅ "move task 3 down"
✅ "move second task higher"
```

## Architecture

### Component Communication
```
TodoList (Parent)
    ├── Manages task state
    ├── Passes tasks and handlers to Chatbot
    └── Chatbot (Child)
            ├── Processes commands
            ├── Calls parent handlers
            └── Uses Gemini AI for conversation
```

### State Management
- `tasks`: Array of task strings
- `completedTasks`: Array of completed task indices
- `messages`: Chatbot conversation history

### AI Integration
- **Command Processing**: Local pattern matching for task operations
- **Conversation**: Google Gemini API for natural responses
- **Context Awareness**: AI knows current task list

## Customization

### Change AI Model
In `geminiService.js`:
```javascript
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" // or "gemini-pro"
});
```

### Modify Speech Language
In `Chatbot.jsx`:
```javascript
recognition.lang = "en-IN"; // Change to your locale
// Examples: "en-US", "en-GB", "es-ES"
```

### Adjust Chatbot Personality
In `Chatbot.jsx`, modify the context prompt:
```javascript
const context = `You are a [describe personality] task management assistant...`;
```

## Troubleshooting

### "GEMINI_API_KEY is not set"
- Check `.env` file exists
- Verify variable name is exactly `VITE_GEMINI_API_KEY`
- Restart development server after adding .env

### Voice Recognition Not Working
- Ensure you're using Chrome/Safari
- Check microphone permissions
- Use HTTPS (required for speech API)

### Chatbot Not Responding
- Check API key is valid
- Check browser console for errors
- Verify internet connection

### Tasks Not Updating
- Ensure Chatbot is receiving correct props
- Check command syntax matches examples
- Look for error messages in chatbot

## API Usage Notes

- Google Gemini has usage limits on free tier
- Commands are processed locally first (no API call)
- AI conversation uses API (fallback for unclear commands)

## Future Enhancements

- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Persistent storage (localStorage/database)
- [ ] Multi-language support
- [ ] Custom command shortcuts
- [ ] Task priority levels

## Credits

- **AI**: Google Gemini 1.5 Flash
- **Speech**: Web Speech API
- **Framework**: React
- **Icons**: Unicode Emojis

## License

Free to use and modify for personal and commercial projects.