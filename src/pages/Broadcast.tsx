import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface InvestmentPlan {
  name: string;
  investment: number;
  returns: number;
  duration: string;
  color: string;
  icon: React.ReactNode;
}

const Invest = () => {
  const navigate = useNavigate();

  const plans: InvestmentPlan[] = [
    {
      name: "Silver Plan",
      investment: 10000,
      returns: 70000,
      duration: "24 hours",
      color: "from-slate-400 to-slate-600",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "Gold Plan",
      investment: 20000,
      returns: 150000,
      duration: "24 hours",
      color: "from-yellow-400 to-yellow-600",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      name: "Platinum Plan",
      investment: 30000,
      returns: 200000,
      duration: "24 hours",
      color: "from-cyan-300 to-cyan-600",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "Diamond Plan",
      investment: 40000,
      returns: 300000,
      duration: "24 hours",
      color: "from-indigo-400 to-indigo-600",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const handleInvestNow = (plan: InvestmentPlan) => {
    // Navigate to payment page with the exact amount for the chosen plan
    navigate("/invest-payment", { state: plan });
  };

  return (
    <div className="min-h-screen liquid-bg pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground glow-primary">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-background/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Invest</h1>
            <p className="text-xs opacity-90">Crowdfunding Investment Plans</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 p-4">
          <h2 className="text-sm font-semibold text-foreground mb-2">How It Works</h2>
          <p className="text-xs text-muted-foreground">
            Choose an investment plan, invest the required amount, and earn returns in 24 hours. All returns are credited directly to your balance.
          </p>
        </Card>

        {/* Investment Plans Grid */}
        <div className="space-y-3">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-lg border-border/50 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Plan Header with Color Gradient */}
              <div className={`bg-gradient-to-r ${plan.color} p-4 text-white`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {plan.icon}
                  </div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                </div>
              </div>

              {/* Plan Details */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Investment</p>
                    <p className="text-lg font-bold text-foreground">
                      ₦{plan.investment.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Returns</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-lime-200 via-lime-300 to-white bg-clip-text text-transparent">
                      ₦{plan.returns.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Duration & Profit */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Duration</span>
                    <span className="text-sm font-semibold text-foreground">{plan.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Profit</span>
                    <span className="text-sm font-bold text-green-500">
                      +₦{(plan.returns - plan.investment).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Invest Button */}
                <Button
                  onClick={() => handleInvestNow(plan)}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-2`}
                >
                  Invest Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <Card className="bg-card/80 backdrop-blur-lg border-border/50 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            💡 Tip: Choose a plan that matches your investment capacity
          </p>
          <p className="text-xs text-muted-foreground">
            All returns are guaranteed within 24 hours of investment.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Invest;
