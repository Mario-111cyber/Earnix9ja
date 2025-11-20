import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, FileText } from "lucide-react";

interface AddBalanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const FEE_PERCENT = 2;
const BANK_DETAILS = {
  bankName: "Moniepoint",
  accountName: "DEBORAH VINCENT",
  accountNumber: "5045609512",
};

export const AddBalanceModal = ({ open, onOpenChange, onSuccess }: AddBalanceModalProps) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const amountNum = Number(amount) || 0;
  const fee = (amountNum * FEE_PERCENT) / 100;
  const totalToPay = amountNum + fee;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => {
      const isValidType = ["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      if (!isValidType) toast.error(`${file.name}: Invalid file type`);
      if (!isValidSize) toast.error(`${file.name}: File too large (max 5MB)`);
      return isValidType && isValidSize;
    });

    if (files.length + validFiles.length > 3) {
      toast.error("Maximum 3 files allowed");
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
    // Reset input so same file can be re-selected if needed
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (amountNum < 1000) {
      toast.error("Minimum amount is ₦1,000");
      return;
    }
    if (files.length === 0) {
      toast.error("Please upload at least one receipt");
      return;
    }

    setIsSubmitting(true);
    setUploading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data: topup, error: topupError } = await supabase
        .from("instant_activation_payments")
        .insert({
          user_id: session.user.id,
          amount: totalToPay,
          status: "pending",
          has_receipt: true,
          receipt_count: files.length,
        })
        .select()
        .single();

      if (topupError) throw topupError;
      if (!topup) throw new Error("Failed to create top-up request");

      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split(".").pop() || "file";
        const fileName = `${session.user.id}/topup_${topup.id}_${index}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("receipts")
          .upload(fileName, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { error: metaError } = await supabase
          .from("topup_receipts")
          .insert({
            topup_id: topup.id,
            storage_key: fileName,
            mime_type: file.type,
            file_size: file.size,
            uploaded_by: session.user.id,
          });

        if (metaError) throw metaError;
      });

      await Promise.all(uploadPromises);

      toast.success("Top-up request submitted! We'll review it shortly.");
      onSuccess();
      onOpenChange(false);
      setAmount("");
      setFiles([]);
    } catch (error: any) {
      console.error("Top-up error:", error);
      toast.error(error.message || "Failed to submit top-up request");
    } finally {
      setIsSubmitting(false);
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-card border-border max-h-[90vh] w-[95vw] max-w-[550px] flex flex-col p-0"
        // Removed overflow-hidden → this was breaking the scroll!
      >
        {/* Header - fixed at top */}
        <DialogHeader className="px-6 py-5 border-b border-border flex-shrink-0">
          <DialogTitle className="text-xl font-semibold">Add Balance</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Bank Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3 text-sm border border-border">
            <p className="font-semibold text-base">Bank Transfer Details</p>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-muted-foreground">Bank:</span>
                <span className="font-medium">{BANK_DETAILS.bankName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-medium">{BANK_DETAILS.accountName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-mono text-lg">{BANK_DETAILS.accountNumber}</span>
              </p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-base font-medium">
              Amount to Add (₦)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Minimum ₦1,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1000"
              className="h-12 text-lg"
            />
          </div>

          {/* Fee Breakdown */}
          {amountNum >= 1000 && (
            <div className="bg-muted/50 p-4 rounded-lg space-y-2 border border-border">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium">₦{amountNum.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee ({FEE_PERCENT}%):</span>
                <span className="font-medium">₦{fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border text-lg font-bold">
                <span>Total to Transfer:</span>
                <span className="text-primary">₦{totalToPay.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Receipt Upload */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Upload Payment Receipt</Label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="receipt-upload"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
                disabled={files.length >= 3 || uploading}
              />
              <label
                htmlFor="receipt-upload"
                className={`block cursor-pointer ${files.length >= 3 || uploading ? "opacity-50" : ""}`}
              >
                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {files.length >= 3
                    ? "Maximum 3 files reached"
                    : "Click to upload receipt(s)"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, PDF – max 5MB each
                </p>
              </label>
            </div>

            {/* Uploaded Files Preview */}
            {files.length > 0 && (
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-muted/30 p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <FileText className="w-10 h-10 text-primary" />
                      )}
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((file.size / 1024) / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg text-amber-700 dark:text-amber-400 text-sm">
            <p className="font-semibold mb-1">Important:</p>
            <p>
              Transfer the <strong>exact total amount</strong> shown above and attach your payment receipt.
            </p>
          </div>
        </div>

        {/* Fixed Footer Button */}
        <div className="flex-shrink-0 border-t border-border bg-card px-6 py-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || amountNum < 1000 || files.length === 0}
            className="w-full h-12 text-base font-semibold"
          >
            {isSubmitting
              ? uploading
                ? "Uploading receipts..."
                : "Submitting request..."
              : "I've Made Payment & Attached Receipt"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};