#!/bin/sh
# Runs at nginx container startup (via /docker-entrypoint.d/).
# Regenerates env.js from the container environment so VITE_ADMIN_PASSWORD
# can be changed with a container restart, without rebuilding the image.
escaped=$(printf '%s' "${VITE_ADMIN_PASSWORD}" | sed 's/\\/\\\\/g; s/"/\\"/g')
printf 'window.__ENV__ = { VITE_ADMIN_PASSWORD: "%s" };\n' "$escaped" > /usr/share/nginx/html/env.js
