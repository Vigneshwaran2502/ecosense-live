import { useState, useEffect, useCallback, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import type { EnergyData, PowerHistoryPoint, ConnectionStatus, MQTTConfig } from '@/types/energy';

const DEFAULT_DATA: EnergyData = {
  voltage: 220,
  current: 0,
  power: 0,
  device_type: 'Unknown',
  status: 'SAFE',
  timestamp: Date.now(),
};

// Simulated data generator for demo/fallback
const generateSimulatedData = (): EnergyData => {
  const deviceTypes: EnergyData['device_type'][] = ['Fan', 'Motor', 'LED'];
  const voltage = 215 + Math.random() * 15; // 215-230V
  const current = 0.5 + Math.random() * 4; // 0.5-4.5A
  const power = voltage * current;
  const status: EnergyData['status'] = power > 800 ? 'OVERLOAD' : power > 600 ? 'WARNING' : 'SAFE';
  
  return {
    voltage: Math.round(voltage * 10) / 10,
    current: Math.round(current * 100) / 100,
    power: Math.round(power * 10) / 10,
    device_type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
    status,
    timestamp: Date.now(),
  };
};

interface UseMQTTOptions {
  config?: MQTTConfig;
  simulateData?: boolean;
  simulationInterval?: number;
}

export function useMQTT(options: UseMQTTOptions = {}) {
  const { 
    config, 
    simulateData = true, 
    simulationInterval = 2000 
  } = options;

  const [data, setData] = useState<EnergyData>(DEFAULT_DATA);
  const [powerHistory, setPowerHistory] = useState<PowerHistoryPoint[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  
  const clientRef = useRef<MqttClient | null>(null);
  const simulationRef = useRef<NodeJS.Timeout | null>(null);

  // Add data point to history
  const addToHistory = useCallback((power: number) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    setPowerHistory(prev => {
      const newHistory = [...prev, { time: timeStr, power, timestamp: now.getTime() }];
      // Keep last 30 data points (60 seconds at 2s interval)
      return newHistory.slice(-30);
    });
  }, []);

  // Handle incoming MQTT message
  const handleMessage = useCallback((topic: string, message: Buffer) => {
    try {
      const parsed = JSON.parse(message.toString()) as EnergyData;
      parsed.timestamp = Date.now();
      setData(parsed);
      addToHistory(parsed.power);
      setError(null);
    } catch (err) {
      console.error('Failed to parse MQTT message:', err);
      setError('Failed to parse data');
    }
  }, [addToHistory]);

  // Connect to MQTT broker
  const connect = useCallback(() => {
    if (!config?.brokerUrl || !config?.topic) {
      console.log('No MQTT config provided, using simulation mode');
      return;
    }

    setConnectionStatus('connecting');
    
    try {
      const client = mqtt.connect(config.brokerUrl, {
        username: config.username,
        password: config.password,
        reconnectPeriod: 5000,
        connectTimeout: 10000,
      });

      client.on('connect', () => {
        setConnectionStatus('connected');
        setError(null);
        client.subscribe(config.topic, (err) => {
          if (err) {
            console.error('Subscribe error:', err);
            setError('Failed to subscribe to topic');
          }
        });
      });

      client.on('message', handleMessage);

      client.on('error', (err) => {
        console.error('MQTT error:', err);
        setConnectionStatus('error');
        setError(err.message);
      });

      client.on('offline', () => {
        setConnectionStatus('disconnected');
      });

      client.on('reconnect', () => {
        setConnectionStatus('connecting');
      });

      clientRef.current = client;
    } catch (err) {
      console.error('MQTT connection failed:', err);
      setConnectionStatus('error');
      setError('Connection failed');
    }
  }, [config, handleMessage]);

  // Disconnect from MQTT
  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.end();
      clientRef.current = null;
      setConnectionStatus('disconnected');
    }
  }, []);

  // Start simulation
  const startSimulation = useCallback(() => {
    if (simulationRef.current) return;
    
    simulationRef.current = setInterval(() => {
      const simData = generateSimulatedData();
      setData(simData);
      addToHistory(simData.power);
    }, simulationInterval);
    
    setConnectionStatus('connected');
  }, [simulationInterval, addToHistory]);

  // Stop simulation
  const stopSimulation = useCallback(() => {
    if (simulationRef.current) {
      clearInterval(simulationRef.current);
      simulationRef.current = null;
    }
  }, []);

  // Effect: Auto-connect or simulate
  useEffect(() => {
    if (config?.brokerUrl && config?.topic) {
      connect();
    } else if (simulateData) {
      // Initial data point
      const initialData = generateSimulatedData();
      setData(initialData);
      addToHistory(initialData.power);
      startSimulation();
    }

    return () => {
      disconnect();
      stopSimulation();
    };
  }, [config, simulateData, connect, disconnect, startSimulation, stopSimulation, addToHistory]);

  return {
    data,
    powerHistory,
    connectionStatus,
    error,
    connect,
    disconnect,
    isSimulating: simulationRef.current !== null,
  };
}
