cd ui
echo "Installing vue app npm packages..."
npm install
echo "Generating vue app static files..."
npm run build-ssr
echo "Copying vue app static files to server assets folder..."
cp -rf dist/** ../server/public
echo "Copying vue app server side bundle to server assets folder..."
cp -rf ssr/** ../server/public
cd ../server
echo "Installing server npm packages..."
npm install
echo "Starting nodejs server..."
npm start
