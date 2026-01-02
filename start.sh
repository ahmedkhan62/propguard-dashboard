#!/bin/bash

# Function to kill processes on exit
cleanup() {
  echo "Stopping RiskLock..."
  kill $(jobs -p) 2>/dev/null
}
trap cleanup EXIT

# Get absolute path to the project root
PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$PROJECT_ROOT/backend"
VENV_PYTHON="$BACKEND_DIR/venv/bin/python"
VENV_UVICORN="$BACKEND_DIR/venv/bin/uvicorn"

echo "Starting RiskLock Engine (Backend)..."

# Check if venv exists
if [ ! -f "$VENV_PYTHON" ]; then
    echo "Error: Virtual environment not found at $BACKEND_DIR/venv"
    echo "Please run: cd backend && python3 -m venv venv && venv/bin/pip install -r requirements.txt"
    exit 1
fi

cd "$BACKEND_DIR"

# explicit execution using venv binary
"$VENV_UVICORN" main:app --reload --port 8000 --host 0.0.0.0 &
BACKEND_PID=$!

echo "Waiting for Backend to initialize..."
# Wait for port 8000 to be ready
count=0
while ! nc -z localhost 8000; do   
  sleep 1
  count=$((count+1))
  if [ $count -ge 30 ]; then
      echo "Backend failed to start in 30 seconds."
      exit 1
  fi
  echo -n "."
done
echo ""
echo "Backend is READY!"

echo "Starting RiskLock Dashboard (Frontend)..."
cd "$PROJECT_ROOT"
npm run dev &
FRONTEND_PID=$!

echo "RiskLock is running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"

wait $BACKEND_PID $FRONTEND_PID
