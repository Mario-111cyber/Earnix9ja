import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Gift, Bolt, Users } from "lucide-react";

const APP_NAME = "Earnix9ja";

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const seen = localStorage.getItem("chixx9ja_welcome_seen");
    if (!seen) setIsOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem("chixx9ja_welcome_seen", "true");
    setIsOpen(false);
    setStep(1);
  };

  const joinTelegram = () => window.open("https://t.me/tivexxglobal", "_blank", "noopener,noreferrer");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md max-h-[65vh] overflow-auto">
        {/* Gradient header similar to PayGo */}
        <div className="relative rounded-t-lg overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/90">Step {step} of 2</p>
              <div className="mt-2">
                <h3 className="text-white text-sm font-semibold">.Welcome to {APP_NAME}, Friend!</h3>
              </div>
            </div>
            <button onClick={close} className="text-white/90 hover:opacity-90">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* pill progress */}
          <div className="mt-3 flex items-center gap-2">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-white/90" : "bg-white/30"}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-white/90" : "bg-white/30"}`} />
          </div>
        </div>

        {/* Body (reduced height) */}
        <div className="p-4 -mt-1 space-y-3 bg-card/80 rounded-b-lg">
          {step === 1 ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>

              <h4 className="text-base font-semibold">Welcome to {APP_NAME}!</h4>

              <p className="text-xs text-muted-foreground mx-2">
                As a new user you'll receive a welcome bonus of <span className="font-bold">₦50,000</span>.
                This bonus is credited after you complete the required steps (joining our Telegram is one of them).
              </p>

              <div className="space-y-1">
                <button onClick={joinTelegram} className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold py-1.5 rounded-lg text-sm">Join Telegram Channel</button>
                <button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-1.5 rounded-lg text-sm">Amazing! Continue →</button>
                <button onClick={close} className="w-full bg-muted hover:bg-muted/80 text-foreground font-medium py-1 rounded-lg text-sm">Maybe Later</button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Bolt className="w-5 h-5 text-yellow-400" />
              </div>

              <h4 className="text-base font-semibold">Start Earning More!</h4>

              <p className="text-xs text-muted-foreground mx-2">
                Earn by referrals, daily tasks, special promotions and by claiming earnings every few minutes.
              </p>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold">Referrals</p>
                    <p className="text-xs text-muted-foreground">Earn ₦12,000 per referral</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <div className="ml-0">
                    <p className="font-semibold">Daily Tasks</p>
                    <p className="text-xs text-muted-foreground">Complete tasks to earn instant rewards</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <div className="ml-0">
                    <p className="font-semibold">Special Promotions</p>
                    <p className="text-xs text-muted-foreground">Participate in limited-time offers</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button onClick={close} className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold py-1.5 rounded-lg text-sm">Let's Get Started →</button>
                <button onClick={() => setStep(1)} className="w-full bg-muted hover:bg-muted/80 text-foreground font-medium py-1 rounded-lg text-sm">← Back</button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
