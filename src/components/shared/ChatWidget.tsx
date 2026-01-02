import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiService } from "@/services/api";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState("");
    const [chatId, setChatId] = useState<number | null>(null);
    const [status, setStatus] = useState<"BOT" | "ACTIVE">("BOT");
    const [agentName, setAgentName] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);

    // Initialize Chat Session
    useEffect(() => {
        const initChat = async () => {
            const savedChatId = localStorage.getItem("active_support_chat_id");
            if (savedChatId) {
                setChatId(parseInt(savedChatId));
                // Fetch history
                try {
                    const response = await fetch(`http://localhost:8000/api/support/history/${savedChatId}`);
                    const history = await response.json();
                    setMessages(history);
                } catch (e) {
                    console.error("Failed to load history", e);
                }
            }
        };
        initChat();
    }, []);

    // WebSocket Management
    useEffect(() => {
        if (chatId && isOpen) {
            const socket = new WebSocket(`ws://localhost:8000/api/support/ws/${chatId}`);
            socketRef.current = socket;

            socket.onmessage = (event) => {
                const msg = json.parse(event.data);
                if (msg.sender_type === 'STAFF') {
                    setStatus("ACTIVE");
                    setAgentName(msg.sender_name || "Agent");
                }
                setMessages(prev => [...prev, msg]);
            };

            return () => socket.close();
        }
    }, [chatId, isOpen]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        let activeId = chatId;
        if (!activeId) {
            // Create new chat session
            try {
                const res = await fetch("http://localhost:8000/api/support/chats/init", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: json.stringify({ guest_name: "Guest User" })
                });
                const data = await res.json();
                activeId = data.id;
                setChatId(activeId);
                localStorage.setItem("active_support_chat_id", activeId.toString());
            } catch (e) {
                console.error("Failed to init chat", e);
                return;
            }
        }

        // Send via WebSocket if ready
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(json.stringify({
                content: inputText,
                sender_type: "GUEST"
            }));
            setInputText("");
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass-panel w-[380px] h-[550px] mb-4 flex flex-col shadow-2xl border-border/50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary/10 border-b border-border/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">RiskLock Support</h4>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-status-safe' : 'bg-primary'} animate-pulse`} />
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            {status === 'ACTIVE' ? `Agent ${agentName} Online` : "AI Concierge active"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-status-danger/10 hover:text-status-danger">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-transparent to-primary/5"
                        >
                            {messages.length === 0 && (
                                <div className="text-center py-10 space-y-4">
                                    <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto">
                                        <Bot className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-foreground">How can we help?</p>
                                        <p className="text-xs text-muted-foreground">Ask us about pricing, features, or setup.</p>
                                    </div>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.sender_type === 'GUEST' || msg.sender_type === 'USER' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.sender_type === 'GUEST' || msg.sender_type === 'USER' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender_type === 'GUEST' || msg.sender_type === 'USER'
                                        ? 'bg-primary text-white rounded-br-none shadow-lg shadow-primary/20'
                                        : 'bg-secondary border border-border/50 rounded-bl-none'
                                        }`}>
                                        <p className="font-medium whitespace-pre-wrap">{msg.content}</p>
                                        <span className="text-[8px] opacity-50 mt-1 block uppercase font-bold tracking-tighter">
                                            {msg.sender_type} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-background/50 border-t border-border/50 flex gap-2">
                            <Input
                                placeholder="Type your message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="bg-secondary/50 border-border/50 focus:border-primary h-11"
                            />
                            <Button type="submit" size="icon" className="h-11 w-11 shrink-0 bg-primary hover:bg-primary/90">
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors ${isOpen ? 'bg-status-danger text-white' : 'bg-primary text-white'
                    }`}
            >
                {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-primary border-2 border-background"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}

const json = JSON; // Helper for JSON.stringify in string template
