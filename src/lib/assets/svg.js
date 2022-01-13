import fs from 'fs';
const modules = fs.readdirSync('./svg')
const modulesFiles = modules.map(el => `'${el.split('.svg')[0]}',`)
fs.writeFileSync('./list.js', 'export const svgList = [' + [...modulesFiles].join('') + ']')
console.log('svg 导入已更新！')

