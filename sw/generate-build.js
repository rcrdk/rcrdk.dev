const fs = require('fs')
const path = require('path')

const dirName = __dirname.replace('/sw', '')

const CACHE_DYNAMIC_VERSION = new Date().getTime()

const NEXT_STATIC_DIR = path.join(dirName, '.next/static')
const NEXT_ASSETS_DIR = path.join(dirName, 'public')

const SW_GENERATED_PATH = path.join(dirName, 'public/sw.js')

const findFiles = (dir, fileList = []) => {
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file)
		if (fs.statSync(fullPath).isDirectory()) {
			findFiles(fullPath, fileList)
		} else {
			const relativePath = fullPath.replace(dirName, '')
			const publicPath = relativePath.replace('/.next', '/_next').replace('/public/', '/')
			fileList.push(publicPath)
		}
	})
	return fileList
}

const filesTypes = /\.(woff2?|ttf|eot|otf|ico|png|webp|gif|jpe?g|svg|webmanifest|js|css|html|mp3)$/
const nextFiles = findFiles(NEXT_STATIC_DIR).filter((file) => filesTypes.test(file))
const publicFiles = findFiles(NEXT_ASSETS_DIR)
	.filter((file) => filesTypes.test(file))
	.filter((file) => file !== '/sw.js')
const urlsToCache = JSON.stringify([...nextFiles, ...publicFiles], null, 2)

const swContent = fs
	.readFileSync(path.join(__dirname, 'template-build.js'), { encoding: 'utf-8' })
	.replaceAll('__CACHE_NAME__', CACHE_DYNAMIC_VERSION)
	.replace("'__CACHE_DYNAMIC_URLS__'", urlsToCache)

fs.writeFileSync(SW_GENERATED_PATH, swContent, 'utf-8')
console.log(`Service worker generated at public/sw.js containing ${nextFiles.length + publicFiles.length} assets.`)
