import type {Metadata} from 'next'
import './globals.css'
import React, {ReactNode} from "react";

export const metadata: Metadata = {
    title: 'Task tracker app',
    description: 'Task tracker simple kanban application',
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    )
}
