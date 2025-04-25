const fs = require('fs')
const path = require('path')

const dirName = __dirname.replace('/sw', '')

const CACHE_VERSION = new Date().getTime()

const SW_GENERATED_PATH = path.join(dirName, 'public/sw.js')

const swContent = fs
	.readFileSync(path.join(__dirname, 'template-dev.js'), { encoding: 'utf-8' })
	.replace('__CACHE_NAME__', CACHE_VERSION)

fs.writeFileSync(SW_GENERATED_PATH, swContent, 'utf-8')
console.log('Service worker generated at public/sw.js.')
