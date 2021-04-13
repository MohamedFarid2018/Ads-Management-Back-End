const cron = require('node-cron');
const JobService = require('../services/core/JobService');


class CronJobs {
  static async closeOldJobs() {
    // cron.schedule('00 55 23 * * 0-6', async () => {
    cron.schedule('00 12 12 * * 0-6', async () => {
        console.log('pppppppppppppppppppppppppppppppppppp');
        console.log('pppppppppppppppppppppppppppppppppppp');
        await JobService.changeOldJobsStatus('closed');
    });

    // cron.schedule('00 00 12 * * 0-6', async () => {
    cron.schedule('00 13 12 * * 0-6', async () => {
        console.log('lllllllllllllllllllllllllllllllllllll');
        console.log('lllllllllllllllllllllllllllllllllllll');
        await JobService.changeOldJobsStatus('closed');
    });
  }

}

module.exports = CronJobs;
