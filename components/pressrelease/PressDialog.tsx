"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Target } from "lucide-react";

export default function ScheduleMeetingDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2500); // Open after 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md border-none bg-linear-to-br from-[#0B163F] to-[#1676BF] text-white">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription className="text-gray-300">
            Connect with our team to discuss your project, get expert advice, or explore our solutions tailored to your needs.
          </DialogDescription>
        </DialogHeader>

        <ul className="text-sm text-gray-200 space-y-1 mt-2">
          <li className="flex items-center justify-start gap-2"><Check size={16} className="p-px font-bold bg-[#D34586] rounded-full text-white" /> Personalized consultation</li>
          <li className="flex items-center justify-start gap-2"><Check size={16} className="p-px font-bold bg-[#D34586] rounded-full text-white" /> Expert guidance on strategy</li>
          <li className="flex items-center justify-start gap-2"><Check size={16} className="p-px font-bold bg-[#D34586] rounded-full text-white" /> Flexible time slots</li>
        </ul>

        <DialogFooter className="mt-4 flex gap-2">
          <Button
            onClick={() => {
              window.open("https://calendly.com/zeestmedia-info/30min");
            }}
            className="bg-[#D34586]"
          >
            Schedule Now
          </Button>
          <Button variant="outline" className="text-black hover:bg-black hover:text-white" onClick={() => setOpen(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}