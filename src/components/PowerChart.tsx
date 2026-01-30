import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { PowerHistoryPoint } from '@/types/energy';

interface PowerChartProps {
  data: PowerHistoryPoint[];
}

export function PowerChart({ data }: PowerChartProps) {
  const formatTooltip = (value: number) => [`${value.toFixed(1)} W`, 'Power'];
  
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Power Consumption</h3>
          <p className="text-sm text-muted-foreground">Real-time power over last 60 seconds</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(156, 100%, 50%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(156, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(220, 15%, 20%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              stroke="hsl(220, 10%, 60%)"
              tick={{ fill: 'hsl(220, 10%, 60%)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(220, 10%, 60%)"
              tick={{ fill: 'hsl(220, 10%, 60%)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}W`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 20%, 10%)',
                border: '1px solid hsl(220, 15%, 20%)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(180, 100%, 95%)' }}
              formatter={formatTooltip}
            />
            <Area
              type="monotone"
              dataKey="power"
              stroke="hsl(156, 100%, 50%)"
              strokeWidth={2}
              fill="url(#powerGradient)"
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(156, 100%, 50%)' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
