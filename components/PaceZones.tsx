import React from 'react';
import { Zap, Gauge, TrendingUp } from 'lucide-react';
import { PaceData } from '../types/pace';

interface PaceZonesProps {
  paceData: PaceData;
}

function formatPace(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function PaceZones({ paceData }: PaceZonesProps) {
  const targetPace = paceData.unit === 'km' ? paceData.targetPacePerKm : paceData.targetPacePerMile;

  // Training zones based on target pace
  const easyPace = {
    min: targetPace * 1.15, // 15% slower
    max: targetPace * 1.25, // 25% slower
  };

  const tempoPace = {
    min: targetPace * 0.95, // 5% faster
    max: targetPace * 1.05, // 5% slower
  };

  const intervalPace = {
    min: targetPace * 0.85, // 15% faster
    max: targetPace * 0.95, // 5% faster
  };

  const zones = [
    {
      name: 'Easy Run',
      effort: '60-75',
      description: 'Recovery and base building. Build endurance and recover between hard sessions.You should be able to hold a conversation.',
      icon: Gauge,
      color: 'from-green-600 to-emerald-500',
      borderColor: 'border-green-500/30',
      bgColor: 'bg-green-500/10',
      min: easyPace.min,
      max: easyPace.max,
    },
    {
      name: 'Tempo Run',
      effort: '85-90',
      description: 'Comfortably hard, sustained effort. Improves lactate threshold and race endurance.',
      icon: TrendingUp,
      color: 'from-orange-600 to-amber-500',
      borderColor: 'border-orange-500/30',
      bgColor: 'bg-orange-500/10',
      min: tempoPace.min,
      max: tempoPace.max,
    },
    {
      name: 'Interval Training',
      effort: '95-100',
      description: 'High intensity, short bursts. with rest between. Builds speed and VO2 max.',
      icon: Zap,
      color: 'from-red-600 to-pink-500',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
      min: intervalPace.min,
      max: intervalPace.max,
    },
  ];

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="mb-2">Training Pace Zones</h2>
        <p className="text-sm text-neutral-400 mb-2">
          Target Pace: <span className="text-white font-semibold">{formatPace(targetPace)}</span> /{paceData.unit}
        </p>
        <p className="text-neutral-400 text-sm mb-6">
            Train at different intensities to build endurance, speed, and race readiness. 
            Each zone serves a specific purpose in your training.
        </p>
      </div>

      <div className="space-y-4">
        {zones.map((zone) => {
          const Icon = zone.icon;
          return (
            <div
              key={zone.name}
              className={`border ${zone.borderColor} ${zone.bgColor} rounded-xl p-4 transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 bg-gradient-to-br ${zone.color} rounded-lg shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">{zone.name}</h3>
                  <h4 className="mb-1 text-neutral-400">{zone.effort}% Effort</h4>
                  <p className="text-xs text-neutral-400 mb-3">{zone.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {formatPace(zone.min)}
                    </span>
                    <span className="text-neutral-500">-</span>
                    <span className="text-2xl font-bold text-white">
                      {formatPace(zone.max)}
                    </span>
                    <span className="text-sm text-neutral-400">/km</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
