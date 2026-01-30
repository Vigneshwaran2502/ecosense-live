

# EcoSense – Edge AI Energy Auditor Dashboard

A sleek, professional IoT dashboard that will impress hackathon judges with real-time ESP8266 energy monitoring.

---

## Design Approach
- **Dark theme** with neon green (#00FF88) and electric blue (#00D4FF) accents
- **Glassmorphism cards** with subtle blur and glow effects
- **Minimal, clean animations** - smooth but not distracting
- **Responsive** for both desktop and mobile presentations
- **Modern typography** using Inter font

---

## Page Sections

### 1. Hero Section
- Bold title: "EcoSense – Smart Energy Intelligence"
- Subtitle with typing/fade-in effect
- Subtle animated particle network background (lightweight, not heavy 3D)
- "View Live Dashboard" button with glow effect
- Quick stats preview showing live connection status

### 2. Live Dashboard (Main Feature)
**Real-time data cards with MQTT integration:**
- **Voltage gauge** - Animated radial meter (0-250V range)
- **Current gauge** - Radial meter with color zones
- **Power display** - Large numeric with unit
- **Device Type** - Icon + label (Fan/Motor/LED)
- **Status indicator** - SAFE (green glow) / OVERLOAD (red pulse)
- **Green Score meter** - Energy efficiency rating
- **Power over time chart** - Live updating line graph (last 60 seconds)

### 3. Alert System
- Toast notifications for abnormal consumption
- Color-coded status changes
- Threshold indicators on gauges

### 4. Features Section
5 glassmorphism cards with icons:
- Edge AI Filtering
- Power Firewall Safety
- Vampire Power Detection
- Offline Logging
- Bandwidth Optimization

### 5. System Architecture Visualization
Simple animated flow diagram:
```
Sensor → ESP8266 → MQTT → Cloud Dashboard
```
With connection status indicators

### 6. Project Info Footer
- EcoSense branding
- Hackathon presentation-ready layout
- Team/innovation description

---

## Technical Implementation

### MQTT Integration
- Connect to your MQTT broker (you'll provide broker URL, topic, and credentials)
- Real-time subscription to energy data topics
- Fallback to simulated data if connection fails
- Connection status indicator in UI

### Data Structure Expected from ESP8266
```json
{
  "voltage": 220.5,
  "current": 2.3,
  "power": 507.15,
  "device_type": "Motor",
  "status": "SAFE"
}
```

### Charts & Gauges
- Custom radial gauge components with smooth animations
- Recharts for the power history line chart
- Color transitions based on values

---

## Timeline Priority (14 hours)

**Phase 1 - Core (Hours 1-6)**
- Dark theme + glassmorphism setup
- Hero section with subtle particle background
- Dashboard layout with gauge components
- MQTT connection and data flow

**Phase 2 - Polish (Hours 7-10)**
- Live charts and data visualization
- Features section with cards
- System diagram
- Alert notifications

**Phase 3 - Final (Hours 11-14)**
- Responsive testing
- Animation refinements
- Demo data fallback
- Project info section

---

## What You'll Need to Provide
1. **MQTT Broker URL** (e.g., `mqtt://broker.hivemq.com`)
2. **MQTT Topic** your ESP8266 publishes to
3. **Credentials** if your broker requires authentication
4. **Data format** from your ESP8266 (or confirm the structure above works)

