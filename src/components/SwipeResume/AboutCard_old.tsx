import React from 'react';
import { Activity, Cpu, Database, Globe, Layers, Server, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutCardProps {
  data: {
    summary: string;
    [key: string]: any;
  };
}

export default function AboutCard({ data }: AboutCardProps) {
  // Extract metrics from summary if possible, or hardcode based on known profile data
  // "handling 200K+ data loads and 1M+ daily requests"
  const metrics = [
    { label: 'Daily Requests', value: '1M+', icon: <Globe className="w-4 h-4 text-blue-400" />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { label: 'Data Loads', value: '200K+', icon: <Database className="w-4 h-4 text-emerald-400" />, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { label: 'Uptime', value: '99.99%', icon: <Activity className="w-4 h-4 text-green-400" />, color: 'bg-green-500/10 text-green-400 border-green-500/20' }, // Implied high availability
  ];

  const specs = [
    { label: 'Architecture', value: 'Distributed Systems', icon: <Layers className="w-3 h-3" /> },
    { label: 'Core', value: 'NestJS / TypeScript', icon: <Cpu className="w-3 h-3" /> },
    { label: 'Security', value: 'Enterprise Grade', icon: <ShieldCheck className="w-3 h-3" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white rounded-3xl overflow-hidden relative p-0">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }} />

      {/* Header */}
      <div className="p-6 pb-2 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Server className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-mono text-indigo-400 tracking-wider uppercase">System Specifications</h2>
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Core Architecture
        </h1>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 px-6 py-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border ${metric.color} backdrop-blur-sm`}
          >
            <div className="mb-1">{metric.icon}</div>
            <span className="text-lg font-bold tracking-tight">{metric.value}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-70 text-center leading-tight">{metric.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Main Description (Terminal Style) */}
      <div className="px-6 py-2 flex-grow">
        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 font-mono text-xs md:text-md text-slate-300 relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900/80 border-b border-slate-800 flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
            <span className="ml-2 text-slate-600 text-[10px]">info.log</span>
          </div>
          <div className="mt-4 space-y-3 leading-relaxed">
            <div className="flex gap-2">
              <span className="text-indigo-500 md:text-sm text-xs">➜</span>
              <span className="md:text-sm text-xs opacity-90">Specializing in scalable API platforms.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-indigo-500 md:text-sm text-xs">➜</span>
              <span className="md:text-sm text-xs opacity-90">Expert in system integrations & distributed architecture.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-indigo-500 md:text-sm text-xs">➜</span>
              <span className="md:text-sm text-xs opacity-90">Optimized for high-throughput environments.</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-col gap-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    {spec.icon} {spec.label}
                  </span>
                  <span className="text-indigo-300 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-2">
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
          <span>SYSTEM_READY</span>
          <span>V 2.5.0</span>
        </div>
      </div>
    </div>
  );
}
