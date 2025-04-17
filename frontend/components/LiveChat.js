import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('message');
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { user: 'Customer', text: message });
      setMessages((prev) => [...prev, { user: 'Customer', text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-900 text-white p-4 rounded-full hover:bg-blue-800">
        💬
      </button>
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-lg shadow-md mt-2 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.user === 'Customer' ? 'text-right' : 'text-left'}`}>
                <p className={`inline-block p-2 rounded-md ${msg.user === 'Customer' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <strong>{msg.user}:</strong> {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Nhập tin nhắn..."
            />
          </div>
        </div>
      )}
    </div>
  );
}