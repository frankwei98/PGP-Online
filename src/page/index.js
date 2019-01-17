/**
 * This file is for `@loadable/component` ONLY!
 */

import loadable from '@loadable/component'

const AboutUs = loadable(() => import(/* webpackChunkName: "about" */'./About'))
const Keygen = loadable(() => import(/* webpackChunkName: "keygen" */'./Keygen'))
const Encrypt = loadable(() => import(/* webpackChunkName: "encrypt" */'./encrypt'))
const Decrypt = loadable(() => import(/* webpackChunkName: "decrypt" */'./decrypt'))

export { Encrypt, Decrypt, AboutUs, Keygen }