import { spawn } from 'child_process';
import { input } from '@inquirer/prompts';

function spawnAsync(command, args) {
    return new Promise(function (resolve, reject) {
        const child = spawn(command, args, { stdio: 'inherit' });

        child.on('exit', function (code) {
            if (code === 0) {
                resolve();
            } else {
                reject(`Exited with code ${code}`);
            }
        });

    })
}

spawnAsync('npm', ['run', 'build'])
    .then(() => spawnAsync('git', ['add', '--all']))
    .then(() => input({
        message: 'Commit message',
    }))
    .then((message) => spawnAsync('git', ['commit', '-m', `"${message}"`]))
    .then(() => spawnAsync('git', ['push', '-u', 'origin', 'main']))
    .catch(console.error);