import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import type { EnergyData } from '@/types/energy';

interface AlertToastProps {
  data: EnergyData;
}

export function AlertToast({ data }: AlertToastProps) {
  const lastStatusRef = useRef<EnergyData['status']>(data.status);

  useEffect(() => {
    // Only show toast when status changes
    if (data.status !== lastStatusRef.current) {
      if (data.status === 'OVERLOAD') {
        toast.error('⚠️ OVERLOAD DETECTED!', {
          description: `Power consumption at ${data.power.toFixed(1)}W exceeds safe limits.`,
          duration: 5000,
        });
      } else if (data.status === 'WARNING') {
        toast.warning('⚡ High Power Warning', {
          description: `Power consumption at ${data.power.toFixed(1)}W is elevated.`,
          duration: 4000,
        });
      } else if (data.status === 'SAFE' && lastStatusRef.current !== 'SAFE') {
        toast.success('✅ System Normalized', {
          description: 'Power consumption returned to safe levels.',
          duration: 3000,
        });
      }
      
      lastStatusRef.current = data.status;
    }
  }, [data.status, data.power]);

  return null;
}
