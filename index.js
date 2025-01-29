import { spawn } from 'child_process';
import { input } from '@inquirer/prompts';

function spawnAsync(command, args, options) {
    return new Promise(function (resolve, reject) {
        const child = spawn(command, args, options);

        child.on('exit', function (code) {
            if (code === 0) {
                resolve();
            } else {
                reject(`Exited with code ${code}`);
            }
        });

    })
}

spawnAsync('npm', ['run', 'build'], { stdio: 'inherit' })
    .then(() => spawnAsync('git', ['add', '--all'], { stdio: 'inherit' }))
    .then(() => input({
        message: 'Commit message',
    }))
    .then((message) => spawnAsync('git', ['commit', '-m', `"${message}"`], { stdio: 'inherit' }))
    .then(() => spawnAsync('git', ['push', '-u', 'origin', 'main'], { stdio: 'inherit' }))
    .catch(console.error);