import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    MessageSquare,
    Send,
    Shield,
    Headphones,
    Clock,
    Zap,
    Bot,
    User as UserIcon,
    Sparkles
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

export default function LiveSupport() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState("");
    const [chatId, setChatId] = useState<number | null>(null);
    const [supportStatus, setSupportStatus] = useState<'BOT' | 'ACTIVE' | 'OFFLINE'>('BOT');
    const scrollRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);

    // Initialize/Fetch Session
    useEffect(() => {
        const initChat = async () => {
            const savedChatId = localStorage.getItem(`live_support_chat_${user?.id}`);
            if (savedChatId) {
                setChatId(parseInt(savedChatId));
                try {
                    const res = await fetch(`http://localhost:8000/api/support/history/${savedChatId}`);
                    const history = await res.json();
                    setMessages(history);
                    // Check status of latest message or chat
                    if (history.length > 0) {
                        const lastStaffMsg = history.reverse().find((m: any) => m.sender_type === 'STAFF');
                        if (lastStaffMsg) setSupportStatus('ACTIVE');
                    }
                } catch (e) {
                    console.error("Failed to load history", e);
                }
            }
        };
        initChat();
    }, [user?.id]);

    // WebSocket Connection
    useEffect(() => {
        if (chatId) {
            const socket = new WebSocket(`ws://localhost:8000/api/support/ws/${chatId}`);
            socketRef.current = socket;

            socket.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                setMessages(prev => [...prev, msg]);
                if (msg.sender_type === 'STAFF') setSupportStatus('ACTIVE');
            };

            return () => socket.close();
        }
    }, [chatId]);

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
            try {
                const res = await fetch("http://localhost:8000/api/support/chats/init", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: user?.id,
                        is_subscriber: true
                    })
                });
                const data = await res.json();
                activeId = data.id;
                setChatId(activeId);
                localStorage.setItem(`live_support_chat_${user?.id}`, activeId.toString());
            } catch (e) {
                console.error("Failed to init chat", e);
                return;
            }
        }

        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                content: inputText,
                sender_type: "USER",
                sender_id: user?.id
            }));
            setInputText("");
        }
    };

    return (
        <DashboardLayout>
            <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-6">
                {/* Chat Section */}
                <div className="flex-1 glass-card flex flex-col overflow-hidden border-border/50">
                    {/* Header */}
                    <div className="p-6 border-b border-border/50 bg-secondary/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <Headphones className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-foreground uppercase tracking-tight">VIP Live Support</h2>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${supportStatus === 'ACTIVE' ? 'bg-status-safe' : 'bg-status-warning'} animate-pulse`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                        {supportStatus === 'ACTIVE' ? "Priority Agent Connected" : "AI Routing active (Priority Queue)"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Badge className="bg-accent-primary text-black font-black uppercase tracking-widest text-[10px] h-6 px-3">Elite Tier</Badge>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-gradient-to-b from-transparent to-primary/5"
                    >
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-sm mx-auto opacity-50">
                                <div className="w-20 h-20 rounded-3xl bg-secondary/50 flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-foreground">How can we optimize your performance today?</h3>
                                    <p className="text-sm text-muted-foreground">Ask about risk parameters, account sync, or trade journal insights.</p>
                                </div>
                            </div>
                        )}
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.sender_type === 'USER' ? 'justify-end' : 'justify-start'}`}>
                                <div className="flex flex-col gap-1.5 max-w-[70%]">
                                    <div className={`p-4 rounded-2xl text-sm ${msg.sender_type === 'USER'
                                            ? "bg-primary text-white rounded-br-none shadow-xl shadow-primary/20"
                                            : msg.sender_type === 'BOT'
                                                ? "bg-secondary/50 border border-border/30 rounded-bl-none text-muted-foreground italic"
                                                : "bg-card border border-border/50 rounded-bl-none shadow-sm"
                                        }`}>
                                        <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                                    </div>
                                    <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${msg.sender_type === 'USER' ? 'justify-end text-primary' : 'text-muted-foreground'}`}>
                                        {msg.sender_type === 'BOT' && <Bot className="w-3 h-3" />}
                                        {msg.sender_type === 'STAFF' && <Headphones className="w-3 h-3" />}
                                        {msg.sender_type} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-8 border-t border-border/50 bg-background/50 flex gap-4">
                        <Input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message to support..."
                            className="flex-1 h-14 bg-secondary/20 border-border/50 focus:border-primary rounded-xl text-base px-6"
                        />
                        <Button type="submit" className="h-14 w-14 rounded-xl bg-foreground text-background hover:bg-primary hover:text-white transition-all">
                            <Send className="w-6 h-6" />
                        </Button>
                    </form>
                </div>

                {/* Info Sidebar */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                    <div className="glass-card p-6 border-accent-primary/20 bg-accent-primary/5">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="w-5 h-5 text-accent-primary" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-accent-primary">Priority Support</h3>
                        </div>
                        <p className="text-xs text-foreground/80 leading-relaxed font-medium">As a subscribed member, your requests are automatically placed at the top of our queue. Typical response time: <span className="text-accent-primary font-bold">&lt; 5 minutes</span>.</p>
                    </div>

                    <div className="flex-1 glass-card p-6 space-y-6 overflow-y-auto scrollbar-hide">
                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Support Policies</h4>
                        <div className="space-y-4">
                            {[
                                { title: "Response Times", desc: "Mon-Fri: 24h | Sat-Sun: 4h response", icon: Clock },
                                { title: "Security First", desc: "We will never ask for your broker password", icon: Shield },
                                { title: "Escalation", desc: "Complex issues are moved to dev lead", icon: MessageSquare },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                        <item.icon className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold text-foreground">{item.title}</div>
                                        <div className="text-[10px] text-muted-foreground leading-tight">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
