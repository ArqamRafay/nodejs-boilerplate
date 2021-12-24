var CronJob = require('cron').CronJob;
var job = new CronJob('* * * * * *', function () { CronCommand() }, null, false, 'America/Los_Angeles');
// job.start()
function CronCommand() {
    console.log('You will see this message every second');
}