"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { ChatBubbleIcon, ImageIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'
import { Images } from 'lucide-react';

function LeftBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div id="left-bar" className='w-[62px] min-w-[62px] h-full border-r py-3'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <Button 
          size="icon" 
          variant={pathname === '/chat' ? "secondary" : "ghost"}
          onClick={() => router.push('/chat')}
        >
          <ChatBubbleIcon className="w-5 h-5"/>
        </Button>
        <Button 
          size="icon" 
          variant={pathname === '/dream' ? "secondary" : "ghost"}
          onClick={() => router.push('/dream')}
        >
          <ImageIcon className="w-5 h-5"/>
        </Button>
        <Button 
          size="icon" 
          variant={pathname === '/gallery' ? "secondary" : "ghost"}
          onClick={() => router.push('/gallery')}
        >
          <Images className="w-5 h-5"/>
        </Button>
      </div>
    </div>
  )
}

export default LeftBar