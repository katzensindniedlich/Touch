import { resolve, join } from 'node:path'
import { copyFile } from 'node:fs/promises'
import { existsSync, readdirSync } from 'node:fs'


const inRed = '\x1b[31m%s\x1b[0m'
const inGreen = '\x1b[32m%s\x1b[0m'


const plugins = (() => {
    const { platform, env } = process

    switch (platform) {
        case 'win32':
            return resolve(env.APPDATA || '/', 'BetterDiscord', 'plugins')
        case 'darwin':
            return resolve(env.HOME || '/', 'Library', 'Application Support', 'BetterDiscord', 'plugins')
    }

    return resolve(env.XDG_CONFIG_HOME || join(env.HOME || '/', '.config'), 'BetterDiscord', 'plugins')
})()


if (existsSync(plugins)) {
    let name
    const dist = resolve('.', 'dist')

    if (existsSync(dist)) {
        name = readdirSync(dist).find(n => n.endsWith('.plugin.js'))
    }

    if (name) {
        const plugin = join(dist, name)
        const dest = join(plugins, name)

        await copyFile(plugin, dest)

        console.log(inGreen, `Successfully injected ${name} into Betterdiscord!`)
    }
    else {
        console.error(inRed, 'Plugin file not found')
        process.exitCode = 1
    }
}
else {
    console.error(inRed, 'Betterdiscords plugin folder not found')
    process.exitCode = 1
}