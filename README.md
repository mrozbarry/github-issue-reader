## Getting started

### Prerequisites

 - Install [nvm](https://github.com/creationix/nvm) for node version management. You might be able to alternatively use [nvm-windows](https://github.com/coreybutler/nvm-windows) on Windows systems.

### Installing dependencies

```bash
nvm install
nvm use
npm install
```

 - `nvm install` will download/install the correct version of node if it has not been installed previously. You probably only need to do this once.
 - `nvm use` will set up your environment to use the correct node and npm versions. You will only need to do this when you navigate to this directory in your terminal.
 - `npm install` will install all the application dependencies. You will need to do this when updating this repository on your system.


### Authentication

If you are reading issues from a public repo, you can probably skip this, but you will get a better rate limit if you authenticate.

To authenticate, create a new file in this directory `account.json` - you can copy `account.json.example` as a starter.

There are two ways to fill this in. You can add information on your username and password (like the example), or you can use a personal access token.

If you're using username/password, your account.json file should look like:

```json
{
  "username": "your github user name here",
  "password": "your github password here"
}
```

#### Personal access tokens

Github lets you use personal access tokens to authenticate. To create a new one:

 1. Log into github
 2. Open the url `https://github.com/settings/tokens`
 3. Click "Generate new token"
 4. Leave all checkboxes unchecked
 5. Name the token something reasonable (like github issue reader)
 6. Copy that token hash

Your account.json file should look like:

```json
{
  "token": "your github personal token here"
}
```

## Run it

```
nvm use
node index.js
```

This will grab all the pages of the issues, and will continue to grab pages until there are no more issues. By default, it will export to issues.json

## Configuring

Check out index.js between lines 10 and 29 for some configuration options. You will need to tweak those specifically githubRepository and earliestCreatedIssue.
