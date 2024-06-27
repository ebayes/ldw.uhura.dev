"use client"

import { useChat } from 'ai/react';
import TextPanel from "@/components/chat/TextPanel"
import { Prompt } from "@/components/ui/prompt"
import { useState } from 'react'
import { models } from "@/data/models"
import { useAppContext } from '@/components/context/States'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Chat() {
  const router = useRouter();
  const [model1, setModel1] = useState(models[0].value);
  const [model2, setModel2] = useState(models[1].value);
  const [provider1, setProvider1] = useState(models[0].provider);
  const [provider2, setProvider2] = useState(models[1].provider);
  const { language, setResetChatFunction } = useAppContext();

  const resetChat = () => {
    chat1.setMessages([]);
    chat2.setMessages([]);
    chat1.setInput('');
    chat2.setInput('');
  };

  useEffect(() => {
    setResetChatFunction(() => resetChat);
  }, [setResetChatFunction]);

  const chat1 = useChat({
    api: '/api/chat',
    body: { model: model1, provider: provider1, language },
  });

  const chat2 = useChat({
    api: '/api/chat',
    body: { model: model2, provider: provider2, language },
  });

  const handleModelChange1 = (newModel: string) => {
    const selectedModel = models.find(m => m.value === newModel);
    if (selectedModel) {
      setModel1(newModel);
      setProvider1(selectedModel.provider);
    }
  };

  const handleModelChange2 = (newModel: string) => {
    const selectedModel = models.find(m => m.value === newModel);
    if (selectedModel) {
      setModel2(newModel);
      setProvider2(selectedModel.provider);
    }
  };

  return (
    <div id="right-main" className='flex flex-col w-full h-full items-center p-3 gap-3'>
      <div id="text-panels" className='flex gap-3 w-full h-[calc(100vh-145px)]'>
  <TextPanel messages={chat1.messages} model={model1} provider={provider1} onModelChange={handleModelChange1} />
  <TextPanel messages={chat2.messages} model={model2} provider={provider2} onModelChange={handleModelChange2} />
</div>
      <form onSubmit={(e) => {
        e.preventDefault();
        chat1.handleSubmit(e);
        chat2.handleSubmit(e);
      }} className="w-full items-center justify-center">
        <Prompt 
          placeholder='Write a prompt...'
          value={chat1.input}
          onChange={(e) => {
            chat1.handleInputChange(e);
            chat2.setInput(e.target.value);
          }}
        />
      </form>



    </div>
  )
}

export default Chat