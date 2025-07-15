#!/usr/bin/env bash

# bin/nginx-utils.sh
# Shared utility functions for starting, stopping, and waiting for nginx in test scripts.
# Usage: source this file in your script, then call start_nginx, stop_nginx, etc.

wait_for_nginx_pid_file() {
    local operation=$1  # "start" or "stop"
    local count=0

    while ( [ "$operation" = "start" ] && [ ! -f /tmp/nginx.pid ] ) || \
          ( [ "$operation" = "stop" ] && [ -f /tmp/nginx.pid ] ); do
        sleep 0.1
        count=$((count + 1))
        if [ $count -ge 100 ]; then  # 0.1s * 100 = 10s
            echo "Error: Timeout waiting for nginx to $operation" >&2
            return 1
        fi
    done
    return 0
}

start_nginx() {
    mkdir -p logs/nginx
    ./bin/start-nginx &
    if ! wait_for_nginx_pid_file "start"; then
        echo "Error: nginx did not start" >&2
        return 1
    fi
    NGINX_PID=$(cat /tmp/nginx.pid)
    if ! kill -0 $NGINX_PID 2>/dev/null; then
        echo "Error: Failed to start nginx (PID $NGINX_PID not running)" >&2
        return 1
    fi
    return 0
}

stop_nginx() {
    if [ -f /tmp/nginx.pid ]; then
        NGINX_PID=$(cat /tmp/nginx.pid)
        if kill -0 $NGINX_PID 2>/dev/null; then
            kill $NGINX_PID
        fi
        if ! wait_for_nginx_pid_file "stop"; then
            echo "Error: nginx did not stop" >&2
            return 1
        fi
    fi
    return 0
}
