import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Gift, Users, CheckCircle2, TrendingUp, Clock } from "lucide-react";

export const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("chixx9ja_welcome_seen");
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("chixx9ja_welcome_seen", "true");
    setIsOpen(false);
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handleJoinTelegram = () => {
    window.open("https://t.me/tivexxglobal", "_blank", "noopener,noreferrer");
  };

  const handleGetStarted = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mb-4">
          <div className={`h-1 flex-1 rounded-full transition-all ${currentStep >= 1 ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"}`} />
          <div className={`h-1 flex-1 rounded-full transition-all ${currentStep >= 2 ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"}`} />
        </div>

        {/* Step Counter */}
        <p className="text-center text-xs font-semibold text-muted-foreground mb-2">
          Step {currentStep} of 2
        </p>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {currentStep === 1 ? "Welcome to Earnix9ja! 🎉" : "Start Earning More! 💰"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {currentStep === 1 ? (
            <>
              {/* Step 1: Welcome Bonus */}
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-4 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg">Welcome Bonus</span>
                </div>
                <p className="text-3xl font-bold text-primary mb-2">₦50,000</p>
                <p className="text-sm text-muted-foreground">
                  Credited to your account after joining our Telegram community and completing essential setup steps.
                </p>
              </div>

              <p className="text-center text-muted-foreground text-sm">
                Join our Telegram channel for exclusive updates, tips, and support! 🚀✨
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleJoinTelegram}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all touch-manipulation min-h-[44px]"
                >
                  Join Telegram Channel 📢
                </button>
                <button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all touch-manipulation min-h-[44px]"
                >
                  Amazing! Continue →
                </button>
                <button
                  onClick={handleClose}
                  className="w-full bg-muted hover:bg-muted/80 text-foreground font-medium py-2 px-4 rounded-lg transition-all touch-manipulation min-h-[44px]"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Maybe Later
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: Start Earning */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Referrals</p>
                    <p className="text-xs text-muted-foreground">Earn ₦12,000 per person you invite</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Daily Tasks</p>
                    <p className="text-xs text-muted-foreground">Complete tasks and earn instant rewards</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Special Promotions</p>
                    <p className="text-xs text-muted-foreground">Unlock exclusive offers and bonuses</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Claim Earnings</p>
                    <p className="text-xs text-muted-foreground">Withdraw your balance every 5 minutes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-all touch-manipulation min-h-[44px]"
                >
                  Let's Get Started →
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full bg-muted hover:bg-muted/80 text-foreground font-medium py-2 px-4 rounded-lg transition-all touch-manipulation min-h-[44px]"
                >
                  ← Back
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
