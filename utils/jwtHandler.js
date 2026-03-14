const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const KEY_DIR = path.join(__dirname, '..', 'keys')
const PRIVATE_KEY_PATH = path.join(KEY_DIR, 'private.key')
const PUBLIC_KEY_PATH = path.join(KEY_DIR, 'public.key')

function ensureKeys() {
    if (!fs.existsSync(KEY_DIR)) {
        fs.mkdirSync(KEY_DIR, { recursive: true })
    }

    const hasPrivateKey = fs.existsSync(PRIVATE_KEY_PATH)
    const hasPublicKey = fs.existsSync(PUBLIC_KEY_PATH)

    if (!hasPrivateKey || !hasPublicKey) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        })

        fs.writeFileSync(PRIVATE_KEY_PATH, privateKey)
        fs.writeFileSync(PUBLIC_KEY_PATH, publicKey)
    }
}

function getPrivateKey() {
    ensureKeys()
    return fs.readFileSync(PRIVATE_KEY_PATH, 'utf8')
}

function getPublicKey() {
    ensureKeys()
    return fs.readFileSync(PUBLIC_KEY_PATH, 'utf8')
}

function signToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, getPrivateKey(), {
        algorithm: 'RS256',
        expiresIn
    })
}

function verifyToken(token) {
    return jwt.verify(token, getPublicKey(), {
        algorithms: ['RS256']
    })
}

module.exports = {
    signToken,
    verifyToken,
    PRIVATE_KEY_PATH,
    PUBLIC_KEY_PATH
}
