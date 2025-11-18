'use client';

import  { useState } from 'react';
import {
  Home,
  DollarSign,
  Receipt,
  Wallet,
  PieChart,
  Settings,
  Menu,
  X,
  BarChart3,
} from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'revenus', label: 'Revenus', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'depenses', label: 'Dépenses', icon: <Receipt className="w-5 h-5" /> },
    { id: 'budgets', label: 'Budgets', icon: <Wallet className="w-5 h-5" /> },
    { id: 'rapports', label: 'Rapports', icon: <PieChart className="w-5 h-5" /> },
    { id: 'parametres', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 btn btn-circle btn-ghost bg-base-200"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className="flex min-h-screen bg-base-200">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-base-100 shadow-xl transition-transform lg:translate-x-0 lg:static lg:z-auto ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b border-base-300 px-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold">BudgetFlow</h1>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActivePage(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activePage === item.id
                          ? 'bg-primary text-white shadow-md'
                          : 'hover:bg-base-200 text-base-content'
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User */}
            <div className="p-4 border-t border-base-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold">Jean Dupont</p>
                  <p className="text-xs text-base-content/70">jean@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold capitalize mb-6">
              {menuItems.find((i) => i.id === activePage)?.label}
            </h2>
            <div className="bg-base-100 rounded-xl p-8 shadow-sm">
              <p className="text-base-content/70">
                Contenu de la page <strong>{activePage}</strong> ici...
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}