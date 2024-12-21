"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Chat</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-grow p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.role === "user" ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`text-xs mb-1 ${
                          message.role === "user"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {message.role === "user" ? "You" : "ChatGPT"}
                      </div>
                      <div
                        className={`p-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {message.role === "user" ? (
                          message.content
                        ) : (
                          <ReactMarkdown className="prose prose-sm max-w-none">
                            {message.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] mr-auto">
                      <div className="text-xs mb-1 text-green-600">ChatGPT</div>
                      <div className="p-2 rounded-lg bg-gray-200 text-gray-800">
                        Thinking...
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && (
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          size="icon"
          className="rounded-full w-12 h-12"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
