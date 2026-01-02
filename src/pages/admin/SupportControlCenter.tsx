import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    User,
    Clock,
    CheckCircle2,
    Send,
    Shield,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    CircleDashed,
    Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

export default function SupportControlCenter() {
    const { user } = useAuth();
    const [chats, setChats] = useState<any[]>([]);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const socketRef = useRef<WebSocket | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch initial chats
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/support/chats", {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await res.json();
                setChats(data);
            } catch (e) {
                console.error("Failed to fetch chats", e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChats();
        const interval = setInterval(fetchChats, 10000); // Poll for new chats
        return () => clearInterval(interval);
    }, []);

    // WebSocket for selected chat
    useEffect(() => {
        if (selectedChat) {
            const socket = new WebSocket(`ws://localhost:8000/api/support/ws/${selectedChat.id}`);
            socketRef.current = socket;

            socket.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                setMessages(prev => [...prev, msg]);
            };

            // Fetch history
            fetch(`http://localhost:8000/api/support/history/${selectedChat.id}`)
                .then(res => res.json())
                .then(data => setMessages(data));

            return () => socket.close();
        }
    }, [selectedChat]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !socketRef.current) return;

        socketRef.current.send(JSON.stringify({
            content: inputText,
            sender_type: "STAFF",
            sender_id: user?.id
        }));
        setInputText("");
    };

    return (
        <div className="h-[calc(100vh-120px)] flex gap-6 overflow-hidden">
            {/* Sidebar: Chat List */}
            <div className="w-80 flex flex-col gap-4">
                <div className="glass-card p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Active Sessions</h3>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{chats.length}</Badge>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search chats..." className="pl-9 h-9 bg-secondary/30 border-border/50 text-xs" />
                    </div>
                </div>

                <div className="flex-1 glass-card overflow-y-auto p-2 space-y-2 scrollbar-hide">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <CircleDashed className="w-6 h-6 text-primary animate-spin" />
                        </div>
                    ) : chats.length === 0 ? (
                        <div className="text-center py-10 space-y-2">
                            <MessageSquare className="w-8 h-8 text-muted-foreground/30 mx-auto" />
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">No active chats</p>
                        </div>
                    ) : (
                        chats.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className={`w-full p-4 rounded-xl text-left transition-all border ${selectedChat?.id === chat.id
                                    ? "bg-primary/10 border-primary ring-1 ring-primary/20"
                                    : "bg-secondary/20 border-border/30 hover:bg-secondary/40 hover:border-border/50"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${chat.status === 'BOT' ? 'bg-status-warning' : 'bg-status-safe'} animate-pulse`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{chat.status}</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-muted-foreground opacity-50 uppercase tracking-tighter">
                                        {new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-xs font-bold text-foreground truncate">{chat.guest_name || chat.user?.full_name || "Guest Trader"}</h4>
                                        <p className="text-[10px] text-muted-foreground truncate">{chat.guest_email || chat.user?.email || "No email provided"}</p>
                                    </div>
                                    {chat.priority === 'PRIORITY' && (
                                        <Shield className="w-3.5 h-3.5 text-accent-primary shrink-0 ml-auto" />
                                    )}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Main Content: Chat Window */}
            <div className="flex-1 glass-card flex flex-col overflow-hidden relative">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-secondary/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-black text-foreground uppercase tracking-widest text-sm flex items-center gap-2">
                                        {selectedChat.guest_name || "Guest Trader"}
                                        {selectedChat.priority === 'PRIORITY' && <Badge className="bg-accent-primary text-black text-[9px] h-4">Subscriber</Badge>}
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium">{selectedChat.guest_email || "Anonymous Visitor"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="h-9 px-4 font-black uppercase tracking-widest text-[10px] rounded-lg">End Session</Button>
                                <Button size="sm" className="h-9 px-4 font-black uppercase tracking-widest text-[10px] rounded-lg bg-primary text-white">Transfer</Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-primary/5"
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender_type === 'STAFF' ? 'justify-end' : 'justify-start'}`}>
                                    <div className="flex flex-col gap-1 max-w-[70%]">
                                        <div className={`p-4 rounded-2xl text-sm ${msg.sender_type === 'STAFF'
                                            ? "bg-primary text-white rounded-br-none shadow-xl shadow-primary/20"
                                            : msg.sender_type === 'BOT'
                                                ? "bg-secondary/50 border border-border/30 rounded-bl-none text-muted-foreground italic"
                                                : "bg-card border border-border/50 rounded-bl-none shadow-sm"
                                            }`}>
                                            <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                                        </div>
                                        <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${msg.sender_type === 'STAFF' ? 'justify-end text-primary' : 'text-muted-foreground'}`}>
                                            {msg.sender_type === 'BOT' && <Bot className="w-3 h-3" />}
                                            {msg.sender_type} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {msg.sender_type === 'STAFF' && <CheckCircle2 className="w-3 h-3" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-sm flex gap-3">
                            <Input
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your response to the trayder..."
                                className="flex-1 h-14 bg-secondary/30 border-border/50 focus:border-primary rounded-xl text-base px-6 shadow-inner"
                            />
                            <Button type="submit" className="h-14 w-14 rounded-xl bg-foreground text-background hover:bg-primary hover:text-white transition-all shadow-lg">
                                <Send className="w-6 h-6" />
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-6">
                        <div className="w-24 h-24 rounded-3xl bg-secondary/20 flex items-center justify-center animate-pulse">
                            <MessageSquare className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                        <div className="max-w-xs space-y-2">
                            <h3 className="text-xl font-black text-foreground uppercase tracking-widest">Support Matrix</h3>
                            <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                Please select an active session from the sidebar to begin interacting with traders.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="glass-card p-4 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Queue Status</p>
                                <p className="text-xl font-bold text-status-safe">Healthy</p>
                            </div>
                            <div className="glass-card p-4 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Response Time</p>
                                <p className="text-xl font-bold text-primary">~2m</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
