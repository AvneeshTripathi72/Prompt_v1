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

export default function SellPromptPage() {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  
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
    if (step === 2 && images.length < 2) {
      toast.error("Please upload at least 2 output images");
      return;
    }
    setStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#8b5cf6']
    });
    toast.success("Prompt published successfully!");
    // Redirect or show success UI
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4">Beta Access</Badge>
          <h1 className="text-4xl font-bold">List Your Prompt</h1>
          <p className="text-muted-foreground">Share your engineering brilliance and start earning.</p>
        </div>

        {/* Stepper */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2" />
          <div className="relative flex justify-between">
            {STEPS.map((s) => (
              <div 
                key={s.id} 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                  step >= s.id ? 'bg-primary border-primary text-primary-foreground scale-110' : 'bg-background border-white/10 text-muted-foreground'
                }`}
              >
                <s.icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <Card className="glass-card p-10 rounded-[2.5rem] border-white/5 min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-grow"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xl font-bold">Paste your prompt here</label>
                    <p className="text-sm text-muted-foreground">Don't worry, buyers can only see the first 2 lines until purchase.</p>
                  </div>
                  <Textarea 
                    placeholder="Enter the full instruction set..." 
                    className="min-h-[300px] bg-black/20 border-white/10 rounded-2xl focus:ring-primary/20 text-lg font-mono leading-relaxed"
                    {...form.register("promptText")}
                  />
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-primary" /> Tip: Use [brackets] to indicate dynamic variables like [topic].
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xl font-bold">Upload Output Previews</label>
                    <p className="text-sm text-muted-foreground">Show users the amazing results your prompt can generate.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div 
                      className="border-2 border-dashed border-white/10 rounded-3xl aspect-square flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary/50 transition-all bg-white/[0.02]"
                      onClick={() => setImages([...images, `https://images.unsplash.com/photo-${1680000000000 + Math.random()}?auto=format&fit=crop&q=80&w=400`])}
                    >
                      <Upload className="w-8 h-8 text-primary" />
                      <span className="text-xs font-semibold">Upload Image</span>
                    </div>
                    {images.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-3xl overflow-hidden group">
                        <img src={img} className="w-full h-full object-cover" alt="Preview" />
                        <button 
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-muted-foreground uppercase">Discovery Text</label>
                      <Input 
                        placeholder="Title (e.g. Cinematic 8k Architect)" 
                        className="h-14 bg-white/5 border-white/10 rounded-xl"
                        {...form.register("title")}
                      />
                      <Input 
                        placeholder="Short Tagline (e.g. Generate hyper-realistic buildings...)" 
                        className="h-14 bg-white/5 border-white/10 rounded-xl"
                        {...form.register("tagline")}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">Platform</label>
                        <select className="flex h-14 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20" {...form.register("platform")}>
                          <option className="bg-background">ChatGPT</option>
                          <option className="bg-background">Midjourney</option>
                          <option className="bg-background">Claude</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground">Category</label>
                        <select className="flex h-14 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20" {...form.register("category")}>
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
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xl font-bold">Set Your Price</label>
                      <Badge className="text-lg py-1 px-4 bg-primary text-primary-foreground">{form.watch("price")} Coins</Badge>
                    </div>
                    <Slider 
                      value={[form.watch("price")]}
                      className="py-6"
                      min={10} 
                      max={500} 
                      step={5}
                      onValueChange={(v) => form.setValue("price", v[0])}
                    />
                  </div>

                  <Card className="bg-white/5 border-white/10 p-8 rounded-3xl space-y-6">
                    <h3 className="font-bold flex items-center gap-2">
                       Earnings Breakdown <CircleDollarSign className="w-4 h-4 text-primary" />
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sale Price</span>
                        <span>{form.watch("price")} Coins</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-red-400">Platform Fee (10%)</span>
                        <span className="text-red-400">-{Math.round(form.watch("price") * 0.1)} Coins</span>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>You Receive</span>
                        <span className="text-primary">{Math.round(form.watch("price") * 0.9)} Coins</span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8 flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-bounce">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold">Ready to Launch?</h3>
                    <p className="text-muted-foreground max-w-sm">Review your listing carefully. Once sold, you can't edit the primary prompt text.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left w-full space-y-2">
                    <p className="text-sm font-bold">Prompt Preview:</p>
                    <p className="text-sm text-muted-foreground font-mono line-clamp-3">"{form.getValues("promptText")}"</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto pt-10 flex justify-between gap-4">
            <Button 
              variant="outline" 
              className={`h-14 px-8 rounded-2xl border-white/10 flex-grow ${step === 1 ? 'invisible' : ''}`}
              onClick={prevStep}
            >
              <ChevronLeft className="mr-2 w-5 h-5" /> Back
            </Button>
            <Button 
              className="h-14 px-12 rounded-2xl flex-grow font-bold glow-primary"
              onClick={step === 5 ? form.handleSubmit(onSubmit) : nextStep}
            >
              {step === 5 ? "Publish Prompt" : "Continue"} <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
