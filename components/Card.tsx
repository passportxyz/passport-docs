import Link from 'next/link'
import React from 'react'

interface CardProps {
  title: string
  href: string
}

export function Card({ title, href }: CardProps) {
  return (
    <Link
      href={href}
      className="block p-4 border rounded-lg hover:border-gray-400 transition-colors"
    >
      <h3 className="font-semibold">{title}</h3>
    </Link>
  )
}

export function Cards({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
      {children}
    </div>
  )
}
