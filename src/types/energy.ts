export interface EnergyData {
  voltage: number;
  current: number;
  power: number;
  device_type: 'Fan' | 'Motor' | 'LED' | 'Unknown';
  status: 'SAFE' | 'OVERLOAD' | 'WARNING';
  timestamp?: number;
}

export interface PowerHistoryPoint {
  time: string;
  power: number;
  timestamp: number;
}

export interface MQTTConfig {
  brokerUrl: string;
  topic: string;
  username?: string;
  password?: string;
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';
