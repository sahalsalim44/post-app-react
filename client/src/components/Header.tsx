import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePosts } from "../hooks/usePosts";

export default function Header() {
  const [location] = useLocation();
  const { setSearchQuery } = usePosts();
  const [inputValue, setInputValue] = useState("");
  
  // Clear search when navigating
  useEffect(() => {
    if (location !== "/") {
      setInputValue("");
    }
  }, [location]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary-600 text-xl font-bold cursor-pointer">PostHub</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8" aria-label="Main Navigation">
              <Link href="/">
                {({ isActive }) => (
                  <a
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive || location === "/"
                        ? "border-primary-500 text-secondary-900"
                        : "border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700"
                    }`}
                  >
                    Home
                  </a>
                )}
              </Link>
              <Link href="/new">
                {({ isActive }) => (
                  <a
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive || location.startsWith("/new") || location.startsWith("/edit")
                        ? "border-primary-500 text-secondary-900"
                        : "border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700"
                    }`}
                  >
                    New Post
                  </a>
                )}
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            {location === "/" && (
              <div className="relative w-full max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-secondary-400" />
                </div>
                <Input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2"
                  placeholder="Search posts..."
                  type="search"
                  value={inputValue}
                  onChange={handleSearch}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
