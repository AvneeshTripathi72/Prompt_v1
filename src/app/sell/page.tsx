"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Settings, 
  CircleDollarSign, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  BrainCircuit,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

const formSchema = z.object({
  title: z.string().min(5, "Title too short").max(50),
  tagline: z.string().min(10, "Tagline too short").max(100),
  promptText: z.string().min(20, "Prompt is too short"),
  platform: z.string().min(1, "Select platform"),
  category: z.string().min(1, "Select category"),
  price: z.number().min(10).max(1000),
});

const STEPS = [
  { id: 1, name: "Write Prompt", icon: BrainCircuit },
  { id: 2, name: "Outputs", icon: ImageIcon },
  { id: 3, name: "Details", icon: Settings },
  { id: 4, name: "Pricing", icon: CircleDollarSign },
  { id: 5, name: "Verify", icon: CheckCircle2 },
];

import { useRouter } from "next/navigation";

export default function SellPromptPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const { publicUrl } = await res.json();
        return publicUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} file(s) uploaded!`);
    } catch (error: any) {
      console.error("Upload process error:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
      // Reset input value to allow re-uploading the same file if needed
      e.target.value = "";
    }
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tagline: "",
      promptText: "",
      platform: "ChatGPT",
      category: "Marketing",
      price: 50,
    },
  });

  const nextStep = () => {
    if (step === 1 && !form.getValues("promptText")) {
      toast.error("Please enter the prompt text first");
      return;
    }
    if (step === 2 && images.length < 1) {
      toast.error("Please upload at least 1 output image");
      return;
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Get seller from cookie if possible, otherwise use mock
      const seller = document.cookie.split('; ').find(row => row.startsWith('auth_token=')) ? "Global_Engineer" : "Anonymous_Creator";
      
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          images: images,
          seller: seller,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to publish");
      }

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6']
      });
      toast.success("Logic sequence deployed to global network!");
      setTimeout(() => router.push("/explore"), 2000);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Deployment failed: ${error.message}`);
    }
  };

  const onInvalid = (errors: any) => {
    console.log("Form errors:", errors);
    const firstError = Object.values(errors)[0] as any;
    if (firstError) toast.error(firstError.message);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Architect Your <span className="text-gradient">Logic</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-xl mx-auto">Convert your engineering brilliance into an automated income stream.</p>
        </div>

        <div className="relative pt-10">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
          <div className="relative flex justify-between gap-4 max-w-2xl mx-auto">
            {STEPS.map((s) => (
              <div 
                key={s.id} 
                className="flex flex-col items-center gap-3 group"
              >
                <div 
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 z-10 relative overflow-hidden",
                    step >= s.id 
                      ? "bg-skyblue border-skyblue text-white shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)] scale-110" 
                      : "bg-background border-white/10 text-muted-foreground group-hover:border-white/20"
                  )}
                >
                  <s.icon className={cn("w-5 h-5", step === s.id ? "animate-bounce" : "")} />
                  {step > s.id && (
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
                  step >= s.id ? "text-skyblue" : "text-muted-foreground/40"
                )}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card p-10 rounded-[2.5rem] border-white/5 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-10 flex-grow"
            >
              {step === 1 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-3xl font-black tracking-tight flex items-center gap-3">
                      <BrainCircuit className="w-8 h-8 text-skyblue" /> The Core Logic
                    </label>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">Buyers will only see an encrypted preview of this sequence until after the transaction is finalized.</p>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-skyblue/5 blur-2xl rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <Textarea 
                      placeholder="Enter the full instruction set (e.g. system commands, parameters, few-shot examples)..." 
                      className="min-h-[350px] bg-black/40 border-white/5 rounded-3xl p-8 focus:ring-skyblue/20 focus:border-skyblue/30 text-lg font-mono leading-relaxed transition-all shadow-inner relative z-10"
                      {...form.register("promptText")}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <div className="space-y-3">
                    <label className="text-3xl font-black tracking-tight flex items-center gap-3">
                      <ImageIcon className="w-8 h-8 text-skyblue" /> Output Evidence
                    </label>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">Substantiate your claims with high-fidelity outputs generated by your configuration.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div 
                      className="border-2 border-dashed border-white/5 rounded-[2.5rem] aspect-square flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-skyblue/40 hover:bg-skyblue/5 transition-all duration-500 relative group overflow-hidden"
                    >
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        accept="image/*"
                        multiple
                      />
                      <div className="absolute inset-0 bg-skyblue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {isUploading ? (
                        <div className="w-12 h-12 border-4 border-skyblue border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="flex flex-col items-center gap-4 relative z-10">
                          <div className="w-16 h-16 bg-skyblue/10 rounded-2xl flex items-center justify-center border border-skyblue/20 group-hover:scale-110 transition-transform duration-500">
                            <Upload className="w-8 h-8 text-skyblue" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-skyblue">Add Preview</span>
                        </div>
                      )}
                    </div>
                    {images.map((img, i) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={i} 
                        className="relative aspect-square rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5"
                      >
                        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <button 
                            className="p-4 bg-crimson rounded-2xl text-white shadow-xl hover:scale-110 transition-transform"
                            onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-12">
                  <div className="space-y-3">
                    <label className="text-3xl font-black tracking-tight flex items-center gap-3">
                      <Settings className="w-8 h-8 text-skyblue" /> Classification
                    </label>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">Help engineers discover your logic by providing precise metadata.</p>
                  </div>
                  <div className="space-y-10">
                    <div className="grid gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2 text-skyblue">Full Title</label>
                        <Input 
                          placeholder="e.g. ULTRA-HD CINEMATIC ARCHITECT v4.2" 
                          className="h-16 bg-black/40 border-white/5 rounded-2xl px-8 text-lg font-black tracking-tight focus:ring-skyblue/20"
                          {...form.register("title")}
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Marketplace Slugline</label>
                        <Input 
                          placeholder="e.g. Generate hyper-realistic modular designs focusing on glass and steel..." 
                          className="h-16 bg-black/40 border-white/5 rounded-2xl px-8 font-medium focus:ring-skyblue/20"
                          {...form.register("tagline")}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Target Engine</label>
                        <select className="flex h-16 w-full rounded-2xl border border-white/5 bg-black/40 px-6 py-2 text-sm font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-skyblue/20 appearance-none cursor-pointer" {...form.register("platform")}>
                          <option className="bg-background">ChatGPT</option>
                          <option className="bg-background">Midjourney</option>
                          <option className="bg-background">Claude</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Sector</label>
                        <select className="flex h-16 w-full rounded-2xl border border-white/5 bg-black/40 px-6 py-2 text-sm font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-skyblue/20 appearance-none cursor-pointer" {...form.register("category")}>
                          <option className="bg-background">Marketing</option>
                          <option className="bg-background">Development</option>
                          <option className="bg-background">Design</option>
                          <option className="bg-background">Writing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div className="space-y-3">
                        <label className="text-3xl font-black tracking-tight flex items-center gap-3">
                          <CircleDollarSign className="w-8 h-8 text-skyblue" /> Valuation
                        </label>
                        <p className="text-sm text-muted-foreground font-medium max-w-sm">Determine the market value of your engineered instructions.</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-skyblue opacity-60">Listing Price</span>
                        <span className="text-6xl font-black tracking-tighter text-skyblue">{form.watch("price")}<span className="text-sm ml-2 opacity-40">CR</span></span>
                      </div>
                    </div>
                    <div className="px-4">
                      <Slider 
                        value={[form.watch("price")]}
                        className="py-10"
                        min={10} 
                        max={1000} 
                        step={1}
                        onValueChange={(v) => form.setValue("price", v[0])}
                      />
                    </div>
                  </div>

                  <Card className="bg-skyblue/5 border-skyblue/10 p-12 rounded-[2.5rem] space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-skyblue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter relative">
                       Economic Breakdown
                    </h3>
                    <div className="space-y-6 text-sm relative">
                      <div className="flex justify-between font-bold">
                        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Gross Sale Value</span>
                        <span className="text-lg">{form.watch("price")} CR</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-muted-foreground uppercase tracking-widest text-[10px] text-crimson/60">Platform Ops (10%)</span>
                        <span className="text-crimson">-{Math.round(form.watch("price") * 0.1)} CR</span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xl font-black tracking-tighter uppercase">Net Payout</span>
                        <div className="flex flex-col items-end">
                          <span className="text-4xl font-black text-skyblue">{Math.round(form.watch("price") * 0.9)} CR</span>
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground mt-1">Direct to Vault</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-10 flex flex-col items-center justify-center py-12 text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-32 h-32 bg-skyblue/10 rounded-[2.5rem] border-2 border-skyblue/30 flex items-center justify-center text-skyblue mb-8 shadow-[0_0_50px_-10px_rgba(56,189,248,0.5)]"
                  >
                    <CheckCircle2 className="w-16 h-16" />
                  </motion.div>
                  <div className="space-y-4">
                    <h3 className="text-5xl font-black tracking-tighter">Final Validation</h3>
                    <p className="text-muted-foreground font-medium max-w-md mx-auto leading-relaxed">
                      Your logic is primed for the marketplace. Perform a final audit of your configuration parameters before broadcasting to the network.
                    </p>
                  </div>
                  <div className="p-10 bg-black/40 rounded-[2.5rem] border border-white/5 text-left w-full space-y-6 shadow-2xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-12 -translate-y-12" />
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-skyblue">Transmission Title</p>
                      <p className="text-xl font-black tracking-tight">{form.getValues("title")}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Logic Fragment</p>
                      <p className="text-sm text-muted-foreground/60 font-mono line-clamp-3 bg-black/20 p-6 rounded-2xl border border-white/5 leading-relaxed tracking-tight">
                        {form.getValues("promptText")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto pt-12 flex justify-between gap-6 relative z-10">
            <Button 
              variant="outline" 
              className={cn(
                "h-13 px-8 rounded-2xl border-white/5 bg-white/5 font-black uppercase tracking-widest text-[9px] hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
                step === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
              onClick={prevStep}
            >
              <ChevronLeft className="mr-2 w-4 h-4 text-skyblue" /> Initial Stage
            </Button>
            <Button 
              className={cn(
                "h-13 px-10 rounded-2xl font-black uppercase tracking-[0.2em] text-[9px] transition-all duration-300 relative overflow-hidden group/btn",
                step === 5 
                  ? "bg-crimson text-white shadow-[0_10px_30px_-5px_rgba(255,100,100,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(255,100,100,0.6)] hover:scale-[1.05]" 
                  : "bg-skyblue text-white shadow-[0_10px_30px_-5px_rgba(56,189,248,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(56,189,248,0.6)] hover:scale-[1.05]"
              )}
              onClick={step === 5 ? form.handleSubmit(onSubmit, onInvalid) : nextStep}
            >
              <span className="relative z-10 flex items-center">
                {step === 5 ? "Deploy Protocol" : "Next sequence"} 
                <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
