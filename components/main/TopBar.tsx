"use client";

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Languages, Plus } from 'lucide-react'
import { ChooseModel } from "@/components/chat/ChooseModel"
import { languages } from "@/data/models"
import { useAppContext } from '@/components/context/States'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function TopBar() {
  const pathname = usePathname();
  const { language, setLanguage, resetChat } = useAppContext();
  const router = useRouter();

  const capitalizeSlug = (slug: string) => {
    return slug.charAt(1).toUpperCase() + slug.slice(2);
  };

  const handleNewChat = () => {
    if (pathname === '/chat') {
      resetChat();
    } else {
      router.push('/chat');
    }
  };

  const getBreadcrumbPageContent = () => {
    if (pathname === '/chat') {
      return "Test multilingual models";
    } else if (pathname === '/dream') {
      return "Create images";
    }
    return ""; // Default empty string for other pathnames
  };

  return (
    <div id="top-bar" className='flex w-full'>
      <div id="site-icon" className='flex min-w-[62px] min-h-[62px] h-[62px] w-[62px] border-r border-b'>
        <div className='flex w-full h-full items-center justify-center'>
          <Image src="/favicon.svg" alt="Uhura" width={28} height={28} />
        </div>
      </div>
      <div className='flex w-full h-[62px] min-h-[62px] border-b items-center justify-between px-4 gap-2'>
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{capitalizeSlug(pathname)}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
              <BreadcrumbPage>{getBreadcrumbPageContent()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className='flex items-center gap-2'>
          {pathname === '/chat' && (
            <>
              <ChooseModel 
                models={languages} 
                onModelChange={(newLanguage) => setLanguage(newLanguage)} 
                value={language}
                icon={false}
                width="150px"
              />
              <Button variant="outline" onClick={handleNewChat} className='font-mono text-xs'>
                <div className='flex items-center'>
                  <Plus className='w-3 h-3 mr-2' />
                  New chat
                </div>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar