import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-[#9E1B32]/10 dark:bg-[#9E1B32]/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-4xl font-bold text-[#9E1B32]">?</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
        This page doesn&apos;t exist. Head back to the handbook.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 bg-[#9E1B32] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#7a1526] transition-colors"
      >
        <Home className="w-4 h-4" />
        Go home
      </Link>
    </div>
  );
}
