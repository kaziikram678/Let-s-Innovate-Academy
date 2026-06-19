"use client"

import { useEffect } from "react"

export function useDRMProtection() {
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "s") ||
        (e.ctrlKey && e.key === "p") ||
        (e.metaKey && e.key === "s") ||
        (e.metaKey && e.key === "p")
      ) {
        e.preventDefault()
      }
    }

    const preventDrag = (e: DragEvent) => {
      e.preventDefault()
    }

    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault()
    }

    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      if (widthThreshold || heightThreshold) {
        return true
      }
      return false
    }

    document.addEventListener("contextmenu", preventContextMenu)
    document.addEventListener("keydown", preventKeyboardShortcuts)
    document.addEventListener("dragstart", preventDrag)
    document.addEventListener("copy", preventCopy)
    document.addEventListener("cut", preventCopy)

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu)
      document.removeEventListener("keydown", preventKeyboardShortcuts)
      document.removeEventListener("dragstart", preventDrag)
      document.removeEventListener("copy", preventCopy)
      document.removeEventListener("cut", preventCopy)
    }
  }, [])
}
