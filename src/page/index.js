/**
 * This file is for `@loadable/component` ONLY!
 */

import loadable from '@loadable/component'

const AboutUs = loadable(() => import('./About'))
const Keygen = loadable(() => import('./Keygen'))
const Encrypt = loadable(() => import('./encrypt'))
const Decrypt = loadable(() => import('./decrypt'))

export { Encrypt, Decrypt, AboutUs, Keygen }