'use client';

import React from 'react'
import { ChooseModel } from '@/components/chat/ChooseModel'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { PersonIcon } from '@radix-ui/react-icons';
import { models } from "@/data/models"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TextPanelProps {
  messages: any[];
  model: string;
  provider: string;
  onModelChange: (model: string) => void;
}

function TextPanel({ messages, model, provider, onModelChange }: TextPanelProps) {
  const currentModel = models.find(m => m.value === model);

  return (
    <div id="text-panel" className='flex flex-col w-full h-full border rounded-md overflow-hidden'>
      <div id="top-chat-panel" className='flex-shrink-0 flex justify-between bg-muted py-3 px-4 border-b rounded-t-md backdrop-blur-[8px] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.05)]'>
        <ChooseModel 
          onModelChange={onModelChange} 
          value={model} 
          width="280px"
        />
        <div>
          {/* 
          <Button size="icon" variant="ghost">
            <Minus className='w-4 h-4'/>
          </Button>
          <Button size="icon" variant="ghost">
            <Plus className='w-4 h-4'/>
          </Button>
          */}
        </div>
      </div>
      <ScrollArea className='flex-grow'>
        <div id="text-panel-content" className='p-4'>
          <div className="flex flex-col gap-3">
            {messages.map(m => (
              <div key={m.id} className='flex gap-3 items-start text-sm'>
                <div className="flex-shrink-0">
                  <Button size="chat" variant="secondary" className={`${m.role === 'user' ? 'bg-gradient-to-r from-blue-300 to-purple-500 text-white' : ''}`}>
                    {m.role === 'user' ? (
                      <PersonIcon className="w-4 h-4" />
                    ) : (
                      <Image src={currentModel?.icon || "/openai.svg"} width={16} height={16} alt="AI" />
                    )}
                  </Button>
                </div>
                <p className='pt-[4px] whitespace-pre-wrap'>{m.content}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
export default TextPanel