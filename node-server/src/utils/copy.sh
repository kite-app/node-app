#!/bin/sh
cd /Users/kite/workspace/node/app-native/node-server/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log