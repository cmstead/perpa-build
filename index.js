import { exec } from 'child_process';
import { promisify } from 'util';

import { input } from '@inquirer/prompts';

const execAsync = promisify(exec);

execAsync('npm run build')
    .then(() => execAsync('git add --all'))
    .then(input({
        message: 'Commit message',
    }))
    .then((message) => execAsync(`git commit -m "${message}"`))
    .then(() => execAsync('git push -u origin main'))
    .catch(console.error);