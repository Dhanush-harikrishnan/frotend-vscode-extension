"use client"

import type React from "react"

import { LayoutWrapper } from "@/components/layout-wrapper"

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>
}
