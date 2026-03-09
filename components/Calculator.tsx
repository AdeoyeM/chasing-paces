"use client";

import React, { useState, useEffect } from "react";
import { Calculator as CalcIcon, RotateCcw } from "lucide-react";
import { PaceData } from "../types/pace";

interface CalculatorProps {
  initialData: PaceData | null;
  onReset: () => void;
  onCalculate: (data: PaceData) => void;
}

// Defining distances for both units for v1
const COMMON_DISTANCES_KM = [
  { label: "5K", value: "5" },
  { label: "10K", value: "10" },
  { label: "Half Marathon", value: "21.1" },
  { label: "Marathon", value: "42.2" },
];

const COMMON_DISTANCES_MILES = [
  { label: "5K", value: "3.11" },
  { label: "10K", value: "6.21" },
  { label: "Half Marathon", value: "13.1" },
  { label: "Marathon", value: "26.2" },
];

export default function Calculator({
  initialData,
  onReset,
  onCalculate,
}: CalculatorProps) {
  const [distance, setDistance] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [unit, setUnit] = useState<"km" | "mile">("km");

  useEffect(() => {
    if (initialData) {
      setDistance(initialData.distance);
      const [h, m, s] = initialData.goalTime.split(":");
      setHours(h || "");
      setMinutes(m || "");
      setSeconds(s || "");
      setUnit(initialData.unit);
    }
  }, [initialData]);

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value as "km" | "mile";

    // Convert existing distance if there is one and it's valid
    if (distance && distance.trim() !== "") {
      const currentDist = parseFloat(distance);

      // Check if the parsed value is a valid number
      if (!isNaN(currentDist) && currentDist > 0) {
        let convertedDist: number;

        if (newUnit === "mile" && unit === "km") {
          // Converting km to miles
          convertedDist = currentDist * 0.621371;
        } else if (newUnit === "km" && unit === "mile") {
          // Converting miles to km
          convertedDist = currentDist * 1.60934;
        } else {
          convertedDist = currentDist;
        }

        setDistance(convertedDist.toFixed(2));
      }
    }

    setUnit(newUnit);
  };

  const handleSetDistance = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setDistance(value);
  };

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dist = parseFloat(distance);
    const h = parseInt(hours || "0", 10);
    const m = parseInt(minutes || "0", 10);
    const s = parseInt(seconds || "0", 10);

    if (!dist || dist <= 0 || isNaN(dist)) {
      alert("Please enter a valid distance greater than 0");
      return;
    }

    if (h === 0 && m === 0 && s === 0) {
      alert("Please enter a valid goal time greater than 0");
      return;
    }

    const totalSeconds = h * 3600 + m * 60 + s;
    const distanceInKm = unit === "km" ? dist : dist * 1.60934;
    const distanceInMiles = unit === "mile" ? dist : dist * 0.621371;

    const pacePerKmSeconds = totalSeconds / distanceInKm;
    const pacePerMileSeconds = totalSeconds / distanceInMiles;

    if (pacePerKmSeconds < 120) {
      alert("Pace seems unrealistic. Please check your distance and time");
      return;
    }

    const goalTime = `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

    onCalculate({
      distance: distance,
      goalTime: goalTime,
      targetPacePerKm: pacePerKmSeconds,
      targetPacePerMile: pacePerMileSeconds,
      unit: unit,
    });
  };

  const onResetForm = () => {
    setDistance("");
    setHours("");
    setMinutes("");
    setSeconds("");
    // setUnit(unit);
    onReset();
  };

  // Select the appropriate distance array based on current unit
  const commonDistances =
    unit === "km" ? COMMON_DISTANCES_KM : COMMON_DISTANCES_MILES;

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-red-600 to-pink-500 rounded-lg">
          <CalcIcon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Goal Calculator</h2>
      </div>
      <form
        onSubmit={handleCalculate}
        className="space-y-6"
        onReset={onResetForm}
      >
        {/* Distance Inputs */}
        <div>
          <label
            htmlFor="distance"
            className="block text-sm text-neutral-400 mb-2"
          >
            Target Distance
          </label>
          <div className="flex gap-2">
            <input
              id="distance"
              type="number"
              step="0.01"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <select
              value={unit}
              onChange={handleUnitChange}
              className="bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="km">km</option>
              <option value="mile">miles</option>
            </select>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {commonDistances.map((d) => (
              <button
                key={d.value}
                type="button"
                value={d.value}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  distance === d.value
                    ? "bg-gradient-to-r from-red-600 to-pink-500 text-white"
                    : "bg-black/40 border border-white/10 text-neutral-400 hover:border-red-500/50"
                }`}
                onClick={handleSetDistance}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Goal Time Inputs */}
        <div>
          <label className="block text-sm text-neutral-400 mb-2">
            Goal Time
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <input
                type="number"
                min="0"
                max="23"
                placeholder="HH"
                onChange={(e) => setHours(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-center placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={hours}
              />
              <span className="block text-xs text-neutral-500 text-center mt-1">
                Hours
              </span>
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="59"
                placeholder="MM"
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-center placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={minutes}
              />
              <span className="block text-xs text-neutral-500 text-center mt-1">
                Minutes
              </span>
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="59"
                placeholder="SS"
                onChange={(e) => setSeconds(e.target.value)}
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white text-center placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={seconds}
              />
              <span className="block text-xs text-neutral-500 text-center mt-1">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 text-white py-3 px-6 rounded-xl transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
          >
            Calculate
          </button>
          <button
            type="reset"
            className="bg-black/40 border border-white/20 hover:border-white/40 text-neutral-400 hover:text-white py-3 px-4 rounded-xl transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
