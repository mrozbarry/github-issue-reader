const GitHub = require("github-api")
const process = require("process")
const path = require("path")
const fs = require("fs")

// -------------------------------------
// Things you may need to configure here
// -------------------------------------

const githubRepository = {
  owner: "mrozbarry",         // Username of the repository owner
  name: "mrbarry.com"         // Name of the repository
}

const filters = {
  labels: [
    "bug",
  ]
}

const earliestCreatedIssue = {
  year: 2017,
  month: 1,
  day: 1
}

const issuesPerPage = 30 // If there is a lot, you may want to bump this number up so you don't get rate limited

const exportFileName = "./issues.json"

// -----------------------------------------------
// Stuff you should probably leave alone down here
// -----------------------------------------------


const gh = getGithubInstance()
const issueController = gh.getIssues(githubRepository.owner, githubRepository.name)
console.log("Loading issues (this could take a while)")
requestIssues(issueController, 1, [])
  .then(function (issues) {
    const exportTo = path.resolve(exportFileName)
    console.log("Dumping issues into ", exportTo) 
    return new Promise(function (resolve, reject) {
      fs.writeFile(exportTo, JSON.stringify(issues, null, 2), function (err) {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  })
  .then(function () {
    console.log("All good")
    process.exitCode = 0
  })
  .catch(function (err) {
    console.error("Something went wrong")
    console.error(err)
    process.exitCode = 1
  })



function getGithubInstance () {
  try {
    const account = require("./account.json")

    if (account.token) {
      return new GitHub({ token: account.token })

    } else if (account.username && account.password) {
      return new GitHub({ username: account.username, password: account.password })

    } else {
      throw new Error("Missing username/password or oauth token from account.json")

    }
  } catch (err) {
    console.log(err)
    console.log("-------------\nFalling back to anonymous api calls, which will not work for private repos")
  }

  return new GitHub()
}

function requestIssues (issueController, page, previousIssues) {
  return issueController.listIssues({
    labels: filters.labels.join(","),
    since: (new Date(earliestCreatedIssue.year, earliestCreatedIssue.month, earliestCreatedIssue.day)).toISOString(),
    page: page,
    per_page: issuesPerPage
  })
    .then(function (response) {
      console.log(response)
      if (response.status !== 200) {
        throw new Error("Github error" + response.data.message)
      }
      const newIssues = response.data
      console.dir(newIssues)
      if (newIssues.length === 0) {
        console.log("No more pages")
        return previousIssues
      } else if (newIssues.length < issuesPerPage) {
        console.log("Looks like the last page")
        return previousIssues.concat(newIssues)
      }
      console.log("Attempting to request the next page (%d)...", page + 1)
      return requestIssues(issueController, page + 1, previousIssues.concat(newIssues))
    })
    .catch(function (err) {
      console.error("Unable to get next page")
      throw err
    })
}
