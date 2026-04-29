#!/bin/bash

# Control plane script for 24-hour monitoring
# This script ensures the application is always running

APP_DIR="/Users/xuguanming/.openclaw/agents/1/workspace/psych-test-app"
LOG_FILE="$APP_DIR/logs/control-plane.log"
PID_FILE="$APP_DIR/logs/app.pid"

# Create logs directory if it doesn't exist
mkdir -p "$APP_DIR/logs"

# Function to check if app is running
is_app_running() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null; then
            return 0
        fi
    fi
    return 1
}

# Function to start the app
start_app() {
    echo "$(date): Starting application..." >> "$LOG_FILE"
    cd "$APP_DIR/deploy"
    nohup ./run-local.sh > "$APP_DIR/logs/app.log" 2>&1 &
    echo $! > "$PID_FILE"
    echo "$(date): Application started with PID $(cat $PID_FILE)" >> "$LOG_FILE"
}

# Function to stop the app
stop_app() {
    if is_app_running; then
        echo "$(date): Stopping application..." >> "$LOG_FILE"
        kill $(cat "$PID_FILE")
        rm -f "$PID_FILE"
        echo "$(date): Application stopped" >> "$LOG_FILE"
    fi
}

# Main control loop
echo "$(date): Control plane started" >> "$LOG_FILE"

# Initial start
if ! is_app_running; then
    start_app
fi

# Continuous monitoring loop (runs for 24 hours)
END_TIME=$(($(date +%s) + 86400))  # 24 hours from now

while [ $(date +%s) -lt $END_TIME ]; do
    if ! is_app_running; then
        echo "$(date): Application not running, restarting..." >> "$LOG_FILE"
        start_app
    fi
    sleep 30  # Check every 30 seconds
done

# Clean shutdown after 24 hours
echo "$(date): 24-hour period complete, shutting down..." >> "$LOG_FILE"
stop_app
echo "$(date): Control plane stopped" >> "$LOG_FILE"