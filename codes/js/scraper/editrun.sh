inotifywait -q -m -e close_write index.js |
while read -r filename event; do
  node index.js
done
