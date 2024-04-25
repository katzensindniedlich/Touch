import { resolve, join } from 'node:path'
import { existsSync, readdirSync, copyFile, constants } from 'node:fs'


const { platform, env } = process


const dest = (() => {
    switch (platform) {
        case 'win32':
            return resolve(env.APPDATA, 'BetterDiscord', 'plugins')
        case 'darwin':
            return resolve(env.HOME, 'Library', 'Application Support', 'BetterDiscord', 'plugins')
    }

    return resolve(env.XDG_CONFIG_HOME || join(env.HOME, '.config'), 'BetterDiscord', 'plugins')
})()


if (existsSync(dest)) {
    let name
    const dist = resolve('.', 'dist')

    if (existsSync(dist)) {
        name = readdirSync(dist).find(n => n.endsWith('.plugin.js'))
    }

    if (name) {
        const finalize = error => {
            if (error) {
                console.error('\x1b[31mAn Error occurred during injection:\x1b[0m\n\n', error)
                process.exitCode = 1
            }
            else {
                console.log('\x1b[32mSuccessfully injected', name, 'into BetterDiscord!\x1b[0m')
            }
        }

        copyFile(join(dist, name), join(dest, name), constants.COPYFILE_FICLONE, finalize)
    }
    else {
        console.error('\x1b[31mPlugin file not found\x1b[0m')
        process.exitCode = 1
    }
}
else {
    console.error('\x1b[31mBetterDiscords plugins folder not found\x1b[0m')
    process.exitCode = 1
}