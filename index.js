const { gitlogPromise } = require("gitlog");
const fs = require('fs');
const getEmail = require('git-user-email');
const moment = require('moment');
const { Command } = require('commander');
const htmlParser = require('./htmlParser.js')


let email = getEmail();
const program = new Command();
program.version('0.0.1');

program
  .option('-c, --cwd <path>', 'directory of your projects', process.cwd())
  .option('-s, --since <date>', '[DD/MM/YYYY] date of start seaching', moment().startOf('month').format('DD/MM/YYYY'))
  .option('-u, --until <date>', '[DD/MM/YYYY] date of end seaching', moment().endOf('day').format('DD/MM/YYYY'))
  .option('-n, --number <number>', 'number of commits per project to search', 100, parseInt)
  .option('-t, --type <json | console | html>', 'type of output', 'console')
  .option('-e, --email <email>', 'author email', email)
  .option('-o, --output <path>', 'path of output file if you not choose console', process.cwd() + '/out');


program.parse(process.argv);
const options = program.opts();
const folderRepos = options.cwd;
const dateStart = options.since;
const dateEnd = options.until;
const numberCommitsPerProject = options.number;
const output = options.output;
const type = options.type;
email = options.email

const directories = fs.readdirSync(folderRepos)



const proms = directories.map(async dir => {
  try{
    const logs = await gitlogPromise({
      since: moment(dateStart, 'DD/MM/YYYY').toDate(),
      until: moment(dateEnd, 'DD/MM/YYYY').toDate(),
      all: true,
      repo: `${folderRepos}/${dir}`,
      number: numberCommitsPerProject || 100,
      author: email
    })
    return logs.map(a => {
      a.project = dir
      return a
    })
  }catch(err){
    return [];
  }

})

Promise.all(proms)
.then(function(projectCommits) {
  return projectCommits
  .flat()
  .sort((a,b) => moment(a.authorDate.split(' ')[0]).isBefore(b.authorDate.split(' ')[0]) ? -1 : 1)
}).then( commits => {
  const dates = {};
  for(let commit of commits){
    const dateCommit = moment(commit.authorDate.split(' ')[0]).format('DD/MM/YYYY');
    if(!dates[dateCommit]){
      dates[dateCommit] = {}
    }
    if(!dates[dateCommit][commit.project]){
      dates[dateCommit][commit.project] = {
        numberCommits: 0,
        subjects: []
      }
    }
    dates[dateCommit][commit.project].numberCommits += 1;
    dates[dateCommit][commit.project].subjects.push(commit.subject);
  }
  return dates
})
.then(report => {
  if(type == 'console') console.log(report)
  if(type == 'json') fs.writeFileSync(output + '.json', JSON.stringify(report, null, 2));
  if(type == 'html') fs.writeFileSync(output + '.html', htmlParser(report));
})
