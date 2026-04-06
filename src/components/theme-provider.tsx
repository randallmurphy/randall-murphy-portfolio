"use client"

import * as React from "react"

// Temporal passthrough since 'next-themes' couldn't install on this Windows session.
// This prevents Next.js from throwing a build error so you can see the new architecture!
export function ThemeProvider({ 
  children,
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
  ...props 
}: any) {
  return (
    <div className="theme-provider-passthrough dark" {...props}>
      {children}
    </div>
  )
}
