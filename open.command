#!/bin/bash
cd "$(dirname "$0")"
npm run dev &
sleep 4
open http://localhost:3000
wait
