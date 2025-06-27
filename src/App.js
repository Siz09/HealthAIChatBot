import { ChatProvider } from "./contexts/chat-context";
import EnhancedMentalHealthChatbot from "./components/mentalHealthChatbot";

function App() {
  return (
    <ChatProvider>
      <EnhancedMentalHealthChatbot />
    </ChatProvider>
  );
}

export default App;
