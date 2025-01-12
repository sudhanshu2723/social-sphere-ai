import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
    type: 'BUTTON' | 'LINK'
    href?: string
    className?: string
  }

export default function GradientButton({ children, type, className, href }: Props){
    
    switch (type) {
        case 'BUTTON':
          return (
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2px]">
              <Button className={cn(className, 'rounded-xl')}>{children}</Button>
            </div>
          )
    
        case 'LINK':
          return (
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-[2px]">
              <Link
                href={href!}
                className={cn(className, 'rounded-xl')}
              >
                {children}
              </Link>
            </div>
          )
    
        default:
          return null
      }
}