# Pega DX Angular fast start

## Deploy in minutes with Firebase and Gitpod

Prerequisites:
- Running pega node with DX enabled application
- Google account
- A ready to go Firebase project with Hosting enabled -> https://console.firebase.google.com/

Get started by starting a Gitpod environment here -> https://gitpod.io/#https://github.com/jeroengeerdink/PegaDXAngularStarterPack
You may be asked to identify yourself if a first time gitpod user.

After setup (can take a few mins the first time) you will be asked to login to your google account and *copy the token back into the commandline* (make sure to allow the copy action in your browser).

Make sure you update the URLs in `src/app/_services/endpoints.ts`

## Testing

Run `ng serve` for a dev server. Use the link in the command line to opem and

## Firebase setup

Use `firebase init` to enable hosting and select the project you want to use. 

## Deploying

Run the following
- `ng build` to compile the code for deployment
- `firebase deploy` to deploy the app
