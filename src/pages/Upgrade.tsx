import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FloatingActionButton } from "@/components/FloatingActionButton";

const Upgrade = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const upgradeTiers = [
    { level: "Tier 2", amount: 15000, price: 15000, color: "from-gray-400 to-gray-600" },
    { level: "Tier 3", amount: 25000, price: 25000, color: "from-yellow-400 to-yellow-600" },
    { level: "Tier 4", amount: 35000, price: 35000, color: "from-blue-400 to-blue-600" },
    { level: "Tier 5", amount: 40000, price: 40000, color: "from-purple-400 to-purple-600" },
  ];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = (tier: typeof upgradeTiers[0]) => {
    navigate("/upgrade-payment", { state: tier });
  };

  const currentEarnings = profile?.referral_earnings || 15000;

  if (loading || !profile) return null;

  return (
    <div className="min-h-screen liquid-bg pb-20">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-primary-foreground">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-background/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Upgrade</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Upgrade Benefits */}
        <Card className="bg-gradient-to-br from-card to-card/80 backdrop-blur-lg border-border/50 p-6 glow-primary">
          <div className="text-center">
            <p className="text-sm text-yellow-400/70 mb-4">UPGRADE</p>
            <p className="text-sm text-muted-foreground mb-2">Unlock Premium Features</p>
            <p className="text-xl font-bold gradient-text mb-3">Withdraw Without Referral Requirements</p>
             <p className="text-xl font-bold gradient-text mb-3">Upgrade allows you to earn more on each referral than regular members </p>
          </div>
        </Card>

        {/* Upgrade Tiers */}
        <div className="space-y-4">
          {upgradeTiers.map((tier, index) => {
            const earningsByTier = [
              "Earn ₦15,000 per each referral",
              "Earn ₦25,000 per each referral",
              "Earn ₦35,000 per each referral",
              "Earn ₦45,000 per each referral"
            ];
            return (
            <Card
              key={tier.level}
              className="bg-gradient-to-br from-card via-amber-950/20 to-card/80 backdrop-blur-lg border-yellow-600/30 p-6 hover:border-yellow-500/60 transition-all shadow-lg shadow-yellow-500/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent`}>
                    {tier.level}
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">₦{tier.amount.toLocaleString()}</p>
                  <p className="text-xs text-yellow-400/70 mt-1">Upgrade cost</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-400 drop-shadow-lg drop-shadow-yellow-500/40" />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{earningsByTier[index]}</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Lifetime upgrade benefit</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">Priority support & fast processing</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-yellow-400/70">
                  Upgrade Price: <span className="font-bold text-yellow-300">₦{tier.price.toLocaleString()}</span>
                </p>
                <Button
                  onClick={() => handleUpgrade(tier)}
                  className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 shadow-lg shadow-yellow-500/40 hover:shadow-yellow-500/60 transition-all"
                >
                  Upgrade Now
                </Button>
              </div>
            </Card>
            );
          })}
        </div>
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default Upgrade;
