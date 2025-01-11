'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'


export function ThemeProvider({children,...props}:React.ComponentProps<typeof NextThemesProvider>){
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}



// The ThemeProvider function is a React component that wraps its children with the NextThemesProvider component (imported from the next-themes library).

// Key Points:
// It allows for theme management (e.g., dark mode, light mode) in a Next.js application.
// It forwards all received props (...props) to the NextThemesProvider.
// It ensures that the theme context is accessible to its child components (children) for consistent theme settings across the app.