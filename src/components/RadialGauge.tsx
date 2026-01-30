import { useEffect, useState } from 'react';

interface RadialGaugeProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  thresholds?: {
    warning: number;
    danger: number;
  };
  size?: 'sm' | 'md' | 'lg';
}

export function RadialGauge({ 
  value, 
  min, 
  max, 
  unit, 
  label,
  thresholds = { warning: 70, danger: 90 },
  size = 'md'
}: RadialGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const sizeConfig = {
    sm: { width: 120, strokeWidth: 8, fontSize: 'text-xl', labelSize: 'text-xs' },
    md: { width: 160, strokeWidth: 10, fontSize: 'text-3xl', labelSize: 'text-sm' },
    lg: { width: 200, strokeWidth: 12, fontSize: 'text-4xl', labelSize: 'text-base' },
  };
  
  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * Math.PI * 1.5; // 270 degrees arc
  
  // Animate value changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedValue(value);
    }, 50);
    return () => clearTimeout(timeout);
  }, [value]);
  
  const percentage = Math.min(Math.max((animatedValue - min) / (max - min) * 100, 0), 100);
  const offset = circumference - (percentage / 100) * circumference;
  
  // Determine color based on thresholds
  const getColor = () => {
    if (percentage >= thresholds.danger) return 'stroke-destructive';
    if (percentage >= thresholds.warning) return 'stroke-warning';
    return 'stroke-primary';
  };
  
  const getGlowColor = () => {
    if (percentage >= thresholds.danger) return 'drop-shadow-[0_0_10px_hsl(var(--destructive))]';
    if (percentage >= thresholds.warning) return 'drop-shadow-[0_0_10px_hsl(var(--warning))]';
    return 'drop-shadow-[0_0_10px_hsl(var(--primary))]';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.width, height: config.width }}>
        <svg
          width={config.width}
          height={config.width}
          className="transform -rotate-[135deg]"
        >
          {/* Background arc */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          
          {/* Value arc */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            className={`${getColor()} ${getGlowColor()} transition-all duration-500 ease-out`}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset + circumference * 0.25}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${config.fontSize} font-bold text-foreground`}>
            {animatedValue.toFixed(1)}
          </span>
          <span className="text-muted-foreground text-sm">{unit}</span>
        </div>
      </div>
      
      <span className={`${config.labelSize} text-muted-foreground mt-2 font-medium`}>
        {label}
      </span>
    </div>
  );
}
