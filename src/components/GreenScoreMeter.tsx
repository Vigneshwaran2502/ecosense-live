import { Leaf } from 'lucide-react';
import type { EnergyData } from '@/types/energy';

interface GreenScoreMeterProps {
  data: EnergyData;
}

export function GreenScoreMeter({ data }: GreenScoreMeterProps) {
  // Calculate green score based on power efficiency
  // Lower power = higher score, status affects score
  const calculateScore = () => {
    let baseScore = 100 - (data.power / 10); // Lower power = higher score
    
    if (data.status === 'OVERLOAD') baseScore -= 30;
    if (data.status === 'WARNING') baseScore -= 15;
    
    return Math.max(0, Math.min(100, Math.round(baseScore)));
  };
  
  const score = calculateScore();
  
  const getScoreColor = () => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-secondary';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };
  
  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };
  
  const getBarColor = () => {
    if (score >= 80) return 'bg-primary';
    if (score >= 60) return 'bg-secondary';
    if (score >= 40) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Green Score</h3>
          <p className="text-xs text-muted-foreground">Energy Efficiency Rating</p>
        </div>
      </div>
      
      <div className="flex items-end gap-4">
        <div className={`text-5xl font-bold ${getScoreColor()}`}>
          {score}
        </div>
        <div className="mb-1">
          <span className={`text-sm font-medium ${getScoreColor()}`}>{getScoreLabel()}</span>
          <span className="text-xs text-muted-foreground block">/ 100</span>
        </div>
      </div>
      
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${getBarColor()} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${score}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
}
