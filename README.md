## Getting started

### Authentication

If you are reading issues from a public repo, you can probably skip this, but you will face a lower rate limit if you authenticate

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
node index.js
```

This will grab all the pages of the issues, and will continue to grab pages until there are no more issues. By default, it will export to issues.json

## Configuring

Check out index.js between lines 10 and 29 for some configuration options. You will need to tweak those specifically githubRepository and earliestCreatedIssue.
