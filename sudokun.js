const { format } = require('url')

// deoendencies
fs = require('fs')
u = require('./utils')



// prep variables
let s = []



// core
let sudokun = async function() {
	u.l('starting solve...')
	await load()
	await solve()
	await output(s, 0)
}
sudokun()



// load: read puzzle file (assumes .sdk format) and convert into workable format
function load() {

	return new Promise((resolve, reject) => {
		u.l('loading puzzle...')
		fs.readFile('s01.txt', 'utf8', handleread)

		function handleread(e, d) {
			if (e) return reject(e)
			convert(d)
		}
		
		function convert(d) {
			let lines = d.split('\n')
			for (let i = 0; i < lines.length; i++) {
				let line = []
				let places = lines[i].split('')
				for (let j = 0; j < places.length; j++) {
					let p = places[j]
					if (p === '.') {
						p = 0
					} else {
						p = parseInt(p)
					}
					line.push(p)
					
				}
				s.push(line)
			}
			resolve(s)
		}
	})
}



// solve
function solve() {
	return new Promise((resolve, reject) => {
		u.l('solving...')
		resolve() 
	})
}


// output: print formatted puzzle (0 for simple, 1 for nice)
function output(s, t) {
	return new Promise((resolve, reject) => {
		if (t === 0) resolve(outputsimple(s))
		if (t === 1) resolve(outputnice(s))
	})
}

function outputsimple(s) {
	u.l('puzzle is now:')
	u.l('')
	for (let i = 0; i < 9; i++) {
		let line = ''
		for (let j = 0; j < s[i].length; j++) {
			line += s[i][j] + ' '
			if ((j+1)%3 === 0) {
				line += '  '
			}
		}
		u.l(line)
		if ((i+1)%3 === 0) {
			u.l('')
		}
	}
}

function outputnice(s) {
	let puzzle = `

   - - -     - - -     - - -
|  ${s[0][0]} ${s[0][1]} ${s[0][2]}  |  ${s[0][3]} ${s[0][4]} ${s[0][5]}  |  ${s[0][6]} ${s[0][7]} ${s[0][8]}  |
|  ${s[1][0]} ${s[1][1]} ${s[1][2]}  |  ${s[1][3]} ${s[1][4]} ${s[1][5]}  |  ${s[1][6]} ${s[1][7]} ${s[1][8]}  |
|  ${s[2][0]} ${s[2][1]} ${s[2][2]}  |  ${s[2][3]} ${s[2][4]} ${s[2][5]}  |  ${s[2][6]} ${s[2][7]} ${s[2][8]}  |
   - - -     - - -     - - -
|  ${s[3][0]} ${s[3][1]} ${s[3][2]}  |  ${s[3][3]} ${s[3][4]} ${s[3][5]}  |  ${s[3][6]} ${s[3][7]} ${s[3][8]}  |
|  ${s[4][0]} ${s[4][1]} ${s[4][2]}  |  ${s[4][3]} ${s[4][4]} ${s[4][5]}  |  ${s[4][6]} ${s[4][7]} ${s[4][8]}  |
|  ${s[5][0]} ${s[5][1]} ${s[5][2]}  |  ${s[5][3]} ${s[5][4]} ${s[5][5]}  |  ${s[5][6]} ${s[5][7]} ${s[5][8]}  |
   - - -     - - -     - - -
|  ${s[6][0]} ${s[6][1]} ${s[6][2]}  |  ${s[6][3]} ${s[6][4]} ${s[6][5]}  |  ${s[6][6]} ${s[6][7]} ${s[6][8]}  |
|  ${s[7][0]} ${s[7][1]} ${s[7][2]}  |  ${s[7][3]} ${s[7][4]} ${s[7][5]}  |  ${s[7][6]} ${s[7][7]} ${s[7][8]}  |
|  ${s[8][0]} ${s[8][1]} ${s[8][2]}  |  ${s[8][3]} ${s[8][4]} ${s[8][5]}  |  ${s[8][6]} ${s[8][7]} ${s[8][8]}  |
   - - -     - - -     - - -

	`
	u.l(puzzle)
}