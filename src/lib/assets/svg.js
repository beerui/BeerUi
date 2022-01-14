import fs from 'fs';

const path = './svg'
const modules = fs.readdirSync(path)
let filesCtx = []
let svgNameList = []
modules.forEach(el => {
	const _name = `'${el.split('.svg')[0]}'`
	svgNameList.push(_name)
	const res = fs.readFileSync(`${path}/${el}`, 'utf-8')
	const _file = res.replace(/^(<svg.*)|(<\/svg>)|\n/gi, '').trim()
	filesCtx.push(`${_name}: \`${_file}\``)
})
const fileCtx = `
export const svgNameList = [${svgNameList}]
export const svgList = {
	${filesCtx.join(',')}
}
`
fs.writeFileSync('./list.js', fileCtx)
console.log('svg 导入已更新！')

