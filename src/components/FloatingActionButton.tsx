import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, History, Gift, User, DollarSign, MessageCircle, Radio, CheckCircle2, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [telegramVisible, setTelegramVisible] = useState(true);
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { icon: CheckCircle2, label: "Tasks", path: "/tasks" },
    { icon: History, label: "History", path: "/history" },
    { icon: Gift, label: "Referrals", path: "/referrals" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: DollarSign, label: "Withdraw", path: "/withdraw" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: MessageCircle, label: "Support", path: "/support" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setTelegramVisible(false);
  };

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setTelegramVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50" ref={sidebarRef}>
        {/* Telegram Support Circle - Absolute positioning above menu button */}
        {telegramVisible && (
          <button
            onClick={() => window.location.href = "https://t.me/Earnix9jasupport"}
            className="absolute -top-18 right-0 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center transition-all active:scale-95 touch-manipulation cursor-pointer z-10"
            style={{ WebkitTapHighlightColor: 'transparent', pointerEvents: 'auto' }}
            aria-label="Telegram Support"
            title="Telegram Support"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        )}

        {isOpen && (
          <Card className="absolute bottom-16 right-0 p-2 bg-card/95 backdrop-blur-lg border-border/50 shadow-lg animate-fade-in mb-2" style={{ pointerEvents: 'auto', zIndex: 60 }}>
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex items-center justify-start gap-3 hover:bg-muted px-4 py-2 rounded-md transition-colors touch-manipulation cursor-pointer min-h-[44px]"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </Card>
        )}

        <button
          ref={menuButtonRef}
          type="button"
          onClick={toggleMenu}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg glow-primary hover:opacity-90 flex items-center justify-center transition-all active:scale-95 touch-manipulation cursor-pointer relative"
          style={{ WebkitTapHighlightColor: 'transparent', pointerEvents: 'auto', zIndex: 20 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
};
