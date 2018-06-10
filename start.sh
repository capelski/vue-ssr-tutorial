cd server
echo "Installing server npm packages..."
npm install
echo "Launching server to make web api available for prerendering..."
npm start &
server_pid=$!
cd ../ui
echo "Installing vue app npm packages..."
npm install
echo "Generating vue app static files..."
npm run build
echo "Copying vue app static files to server assets folder..."
cp -rf dist/** ../server/public
echo "Copying prerendered vue app files to server assets folder..."
cp -rf prerendered/** ../server/public
echo "Server ready..."
