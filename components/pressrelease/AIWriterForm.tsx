"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

export default function AIWriterForm({ setForm, onBack }: { setForm: any; onBack: () => void }) {
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [tone, setTone] = useState('professional');
  const [companyName, setCompanyName] = useState('');

  const inputCls = "bg-forground/10 border-forground/20 text-forground placeholder:text-forground/40 focus:border-[#D34586]";



function parseAIResponse(raw: string) {
  try {
    let cleaned = raw
      .replace(/```(?:json)?\s*|\s*```/gi, "")   // strip markdown code blocks
      .trim();

    // Aggressively remove or escape control characters (including \n, \r, \t, etc.)
    cleaned = cleaned.replace(/[-\u001F\u007F-\u009F]/g, (char) => {
      if (char === "\n") return "\\n";
      if (char === "\r") return "\\r";
      if (char === "\t") return "\\t";
      return " "; // replace other control chars with space
    });

    // Now handle the "content" field specifically: escape any remaining unescaped double quotes inside it
    // This regex finds "content": "....."  (assuming content is the last field)
    cleaned = cleaned.replace(
      /("content"\s*:\s*")([\s\S]*?)("\s*}\s*$)/,
      (match, prefix, contentValue, suffix) => {
        let safe = contentValue
          .replace(/\\/g, "\\\\")           // escape backslashes first
          .replace(/"/g, '\\"')             // escape double quotes
          .replace(/\n/g, "\\n")            // ensure newlines are escaped
          .replace(/\r/g, "\\r");

        return `${prefix}${safe}${suffix}`;
      }
    );

    // Remove anything after the final closing brace (sometimes AI adds extra text)
    const lastBraceIndex = cleaned.lastIndexOf("}");
    if (lastBraceIndex > 0) {
      cleaned = cleaned.substring(0, lastBraceIndex + 1);
    }

    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (err: any) {
    console.error("Parse failed:", err.message);
    console.error("Raw input was:", raw);
    return null;
  }
}

  const handleGenerate = async () => {
    if (!topic.trim()) { toast.error('Please enter a topic.'); return; }
    setGenerating(true);

    try {

      const res = await fetch("/api/aigenerate/version", {
        method: "POST",
        body: JSON.stringify({
          title: topic,
          company: companyName,
          tone: tone,
          quotes: keyPoints,
        }),
      });

      const data = await res.json();
      let raw = data.data;
      
      if (data?.success) {

        
      const parsed = parseAIResponse(raw);
 
      setForm((prev: any) => ({
        ...prev,
        title: parsed?.title || topic,
        summary: parsed?.summary || '',
        content: parsed?.content || raw,
      }));
      setGenerating(false);
      toast.success('Press release generated! Go ahead and customize it as you like.');
      setForm((prev: any) => ({
        ...prev,
        method: 'customize',
      }));
      return;
      }
      setGenerating(false);
      toast.error('Something went wrong. Please try again.');

    } catch (error) {
      setGenerating(false);
      toast.error('Failed to generate press release.');
    }

  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-forground/50 hover:text-forground text-sm transition-colors cursor-pointer">
        <ArrowLeft className="w-4 h-4" /> Back to options
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#D34586]/20 border border-[#D34586]/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#D34586]" />
          </div>
          <div>
            <h3 className="text-forground font-bold text-lg">AI Press Release Writer</h3>
            <p className="text-forground/50 text-sm">Tell us your topic and we'll craft a professional release.</p>
          </div>
        </div>

        <div className='mt-4'>
          <Label className="text-forground/80 font-medium mb-1.5 block">What is your press release about? *</Label>
          <Input placeholder="e.g. Product launch, company milestone, partnership announcement..." value={topic} onChange={e => setTopic(e.target.value)} className={inputCls} />
        </div>

        <div>
          <Label className="text-forground/80 font-medium mb-1.5 block">What is your company name? *</Label>
          <Input placeholder="e.g. TechCorp, Innovate Inc..." value={companyName} onChange={e => setCompanyName(e.target.value)} className={inputCls} />
        </div>

        <div>
          <Label className="text-forground/80 font-medium mb-1.5 block">Key Points <span className="text-forground/40 font-normal">(Optional)</span></Label>
          <Textarea placeholder="List the key facts, quotes, or talking points you want included..." value={keyPoints} onChange={e => setKeyPoints(e.target.value)} className={`${inputCls} min-h-25`} />
        </div>

        <div>
          <Label className="text-forground/80 font-medium mb-2 block">Tone</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'professional', label: 'Professional', desc: 'Corporate & polished' },
              { value: 'exciting', label: 'Exciting', desc: 'Energetic & dynamic' },
              { value: 'formal', label: 'Formal', desc: 'Traditional & serious' },
              { value: 'conversational', label: 'Conversational', desc: 'Friendly & approachable' },
            ].map(opt => (
              <button key={opt.value} type="button" onClick={() => setTone(opt.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${tone === opt.value ? 'border-[#D34586] bg-[#D34586]/20' : 'border-forground/20 hover:border-forground/40 bg-forground/5'}`}>
                <p className="text-forground text-sm font-semibold">{opt.label}</p>
                <p className="text-forground/50 text-xs">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleGenerate} disabled={generating} className="w-full bg-[#D34586] hover:bg-[#D34586]/90 text-forground py-6 text-base font-semibold">
          {generating ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating your press release...</>
          ) : (
            <><Sparkles className="w-5 h-5 mr-2" /> Generate with AI</>
          )}
        </Button>
      </motion.div>

    </div>
  );
}