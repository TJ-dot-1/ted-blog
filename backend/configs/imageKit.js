import ImageKit from 'imagekit'

// Support multiple env variable names and normalize values
const normalize = (v) => {
    if (!v) return v
    return v.toString().trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')
}

const publicKey = normalize(process.env.IMAGE_KIT_PUBLIC_KEY || process.env.IMAGEKIT_PUBLIC_KEY)
const privateKey = normalize(process.env.IMAGE_KIT_PRIVATE_KEY || process.env.IMAGEKIT_PRIVATE_KEY || process.env.IMAGE_KIT_PRIVATE_SECRET)
const urlEndpoint = normalize(process.env.IMAGE_KIT_URL_ENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT)

// Validate presence of required config
if (!publicKey || !privateKey || !urlEndpoint) {
    console.error('\n[ImageKit] Missing configuration. Please set the following environment variables:')
    if (!publicKey) console.error('  - IMAGE_KIT_PUBLIC_KEY or IMAGEKIT_PUBLIC_KEY')
    if (!privateKey) console.error('  - IMAGE_KIT_PRIVATE_KEY or IMAGEKIT_PRIVATE_KEY')
    if (!urlEndpoint) console.error('  - IMAGE_KIT_URL_ENDPOINT or IMAGEKIT_URL_ENDPOINT')
    throw new Error('ImageKit configuration is incomplete. See server logs for details.')
}

const imageKit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint
})

export default imageKit