import { join } from 'lodash-es'

const text = join(['symbol', 'lee'], '^^')

const $root =  document.getElementById('root')

const child  = document.createElement('div')

child.innerText = text

$root.appendChild(child)

