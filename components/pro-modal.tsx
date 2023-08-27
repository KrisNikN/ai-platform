"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { MessageSquare, Music, ImageIcon, VideoIcon, Code, Check, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10"
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10"
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10"
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10"
  }
];

export const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex flex-col items-center justify-center gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 py-1 font-bold'>
              Upgrade to pro
              <Badge variant='premium' className='py-1 text-sm uppercase'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='space-y-2 pt-2 text-center font-medium text-zinc-900'>
            {tools.map(tool => {
              return (
                <Card key={tool.label} className='flex items-center justify-between border-black/5 p-3'>
                  <div className='flex items-center gap-x-4'>
                    <div className={cn("w-fit rounded-md p-2", tool.bgColor)}>
                      <tool.icon className={cn(tool.color, "h-6 w-6")} />
                    </div>
                    <div className='text-sm font-semibold'>{tool.label}</div>
                  </div>
                  <Check className='h-5 w-5 text-primary' />
                </Card>
              );
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='premium' className='w-full'>
            Upgrade
            <Zap className='ml-2 h-4 w-4 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
