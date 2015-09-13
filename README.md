# Aurelia form wizard with validation

Do the usual node/gulp/jspm installation stuff.

Run:

1.  npm install
2.  jspm install -y
3.  gulp watch

With thanks to https://github.com/PWKad/aurelia-samples/tree/master/src/routes/modal

## Some notes...

1.  this sample app does not follow the structure from the Aurelia Skeleton Navigation project
2.  the app source code (including jspm_packages, styles, etc) lies under the /app directory
3.  the bundle process (gulp bundle) uses a tmp directory to prevent the bundler touching code under source control - the bundle output goes into /deploy
4.  there is configuration for a loopback server in /server - run file /server/server.js (after bundling) and the bundled code will get served from http://localhost:3000






