"use client"

import Link from "next/link"
import { useState } from "react"
import { navItems } from "@/data/site"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, profile, signOut, isAdmin } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/Lets_innovate_academy_logo.png"
              alt="Let's Innovate Academy"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={`desktop-${item.href}`}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-full transition-all"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin/enrollments"
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-full transition-all"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-zinc-400 hover:text-white text-sm transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="ml-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium rounded-full transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4 border-t border-white/10 mt-2 pt-4">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors text-sm px-2 py-1"
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-full transition-all text-center mx-2"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin/enrollments"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-full transition-all text-center mx-2"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut()
                      setOpen(false)
                    }}
                    className="px-4 py-2 text-zinc-400 hover:text-white text-sm transition-colors text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-medium rounded-full transition-all text-center mx-2"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
