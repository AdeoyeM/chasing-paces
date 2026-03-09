"use client";

import React, { useState, useEffect } from "react";
import Calculator from "../components/Calculator";
import { PaceZones } from "../components/PaceZones";
import { Activity } from "lucide-react";
import { PaceData } from "../types/pace";

const STORAGE_KEY = "runningAppData";

export default function Home() {
  // Initialize with localStorage
  const [paceData, setPaceData] = useState<PaceData | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load saved data", e);
        }
      }
    }
    return null;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (paceData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(paceData));
    }
  }, [paceData]);

  const handleCalculate = (data: PaceData) => {
    setPaceData(data);
  };

  const handleReset = () => {
    setPaceData(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <header className="border-b border-white/10 bg-linear-to-r from-red-600/10 to-pink-500/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-red-600 to-pink-500 rounded-xl"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl">Chasing Paces</h1>
              <p className="text-neutral-400 text-sm mt-1">
                Train smarter, run faster
              </p>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Calculator */}
          <div className="space-y-6">
            <Calculator
              key={paceData ? JSON.stringify(paceData) : "new"}
              onCalculate={handleCalculate}
              onReset={handleReset}
              initialData={paceData}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {paceData ? (
              <>
                <PaceZones paceData={paceData} />
              </>
            ) : (
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-linear-to-br from-red-600/20 to-pink-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl mb-2 text-neutral-300">
                  Enter your goal
                </h3>
                <p className="text-neutral-500 text-sm">
                  Fill in your target distance and goal time to get personalized
                  pacing guidance
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 text-center text-neutral-500 text-sm">
          <p>
            © 2026 Chasing Paces • Your personal running coach by Misty Adeoye
          </p>
        </div>
      </footer>
    </div>
  );
}
