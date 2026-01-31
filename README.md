
# EcoSense - Edge AI Energy Auditor

EcoSense is a modern, real-time Smart Home Energy Monitor dashboard designed to help users track and optimize their energy consumption. It provides live updates on electrical parameters, cost estimations, and safety alerts through a clean and responsive user interface.

## 🚀 Features

-   **Real-Time Monitoring**: Live display of Voltage, Current, Power, and Energy consumption.
-   **Interactive Dashboard**: Visual gauges and charts for instant status overview.
-   **Cost Estimator**: Estimate daily and monthly energy costs based on consumption.
-   **Live Graphs**: Real-time power consumption trends visualization using Recharts.
-   **Safety Alerts**: Visual indicators for system status and safety warnings.
-   **Bandwidth Saver**: tailored modes for optimized data transmission.
-   **MQTT Integration**: Connects to MQTT brokers for real-time data ingestion from IoT devices (ESP8266).
-   **Responsive Design**: Fully responsive layout built with Tailwind CSS.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS, Shadcn UI
-   **Visualization**: Recharts
-   **State Management**: React Query
-   **IoT Protocol**: MQTT (via `mqtt` library)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Vigneshwaran2502/ecosense-live.git
    cd ecosense-live
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 🔧 Configuration

The application is configured to connect to a public MQTT broker by default. You can modify the MQTT settings in the source code to point to your own broker or change topics.

-   **Data Topic**: `ecosense/data`
-   **Alerts Topic**: `ecosense/alerts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
