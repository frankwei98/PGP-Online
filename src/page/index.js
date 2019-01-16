/**
 * This file is for `@loadable/component` ONLY!
 */

import loadable from '@loadable/component'

export const AboutUs = loadable(() => import('./About'))
export const Keygen = loadable(() => import('./Keygen'))
