# Git Report

This is a CLI that generates a report of your git repositories. Its based in your it commits in all branchs. It will look into your directory searching for git repositories and will search for logs of an author's e-mail (default your git global configuration) and export in console, JSON file or HTML table report.

## Usage

```bash
$ npx git-report -h
```

## Instalation

```bash
$ npm install -g git-report
```

## CLI Arguments

```
$ node index.js -h
Usage: index [options]

Options:
  -V, --version                       output the version number
  -c, --cwd <path>                    directory of your projects (default: "process.cwd()")
  -s, --since <date>                  [DD/MM/YYYY] date of start seaching (default: "month start date")
  -u, --until <date>                  [DD/MM/YYYY] date of end seaching (default: "today date")
  -n, --number <number>               number of commits per project to search (default: 100)
  -t, --type <json | console | html>  type of output (default: "console")
  -e, --email <email>                 author email (default: "GLOBAL_EMAIL")
  -o, --output <path>                 path of output file if you not choose console (default: "process.cwd()/out")
  -h, --help                          display help for command

```

## Exemple

If you run something like that:
```bash
$ npx git-report
```

Will produce a report like that:
```javascript
{
  '01/04/2021': {
    'your-project-name-1': { numberCommits: 4, subjects: [Array] },
    RedeCelcoinWeb: { numberCommits: 2, subjects: [Array] },
    touli: { numberCommits: 4, subjects: [Array] },
    'your-project-name-2': { numberCommits: 3, subjects: [Array] }
  },
  '05/04/2021': {
    'your-project-name-1': { numberCommits: 2, subjects: [Array] },
    'your-project-name-5': { numberCommits: 1, subjects: [Array] }
  },
  '06/04/2021': {
    'your-project-name-5': { numberCommits: 6, subjects: [Array] }
  },
  '07/04/2021': {
    'your-project-name-1': { numberCommits: 10, subjects: [Array] }
  }
}

```
