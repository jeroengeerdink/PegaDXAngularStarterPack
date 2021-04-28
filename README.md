# Pega DX based on Angular for Firebase as a Gitpod project

Quickly get a DX interpreter up and running

Prerequisites:
- Running pega node with DX enabled application
- Google account
- A ready to go Firebase project with Hosting enabled

Get started by starting a Gitpod environment here -> https://gitpod.io/#https://github.com/jeroengeerdink/PegaDXAngularStarterPack

After setup (can take a few mins the first time) you will be asked to login to your google account and copy the token back into the commandline.

Make sure you update the URLs in `src/app/_services/endpoints.ts`

## Testing

Run `ng serve` for a dev server. Use the link in teh command line to opem

## Firebase setup

Use `firebase init` to enable hosting and select the project you want to use. 

## Deploying

Run the following
- `ng build` to compile the code for deployment
- `firebase deploy` to deploy the app
