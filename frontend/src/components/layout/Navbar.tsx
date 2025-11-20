import { Menu, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo + Nom */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Spacelance" className="h-9 w-9 rounded-lg" />
            <span className="text-2xl font-bold text-blue-600">spacelance</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="/" className="text-blue-600 font-semibold">Home</a>
            <a href="/find-work" className="text-gray-700 hover:text-blue-600">Find work</a>
            <a href="/freelancers" className="text-gray-700 hover:text-blue-600">Find Freelancers</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden md:block text-sm font-medium text-gray-700">Log In</a>
          <a href="/signup" className="hidden md:block text-sm font-medium text-gray-700">Sign Up</a>
          
          <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition">
            <span>Post a project</span>
          </button>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}