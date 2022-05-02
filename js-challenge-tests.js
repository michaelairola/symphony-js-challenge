
const { GetNodeMetaData, MultipleParentsError } = require('./js-challenge.js');

let tests = 0
let tests_fail = 0
let lines_fail = 0

const validate = (name, input, output) => {
	tests ++;
	const r = GetNodeMetaData(input)
	if(r != output) {
		tests_fail ++;
		const o = output.split("\n")
		r.split("\n").forEach((l,i) => {
			if( l != o[i]) {
				lines_fail ++;
				console.log(`for test '${name}', line ${i}: '${l}' != '${o[i]}'`)
			}  else {
			}
		})
	}
}


console.log('running tests...');

validate(
'example test', 
`S10 S12 11
S9  S13 2
S1  S10 3
S1  S3  2.1
S1  S2  1
S10 S11 13
S5  S6  7
S3  S4  1
S3  S5  5
S7  S8  13
S7  S9  2`, 
`S1  1    9
S2  1    1
S3  2.1  4
S4  2.1  1
S5  10.5 2
S6  73.5 1
S7  1    4
S8  13   1
S9  2    2
S10 3    3
S11 39   1
S12 33   1
S13 4    1`
)

validate(
'multiple parents', 
`S1 S2 10
S3 S2 12`,
MultipleParentsError('S2')
)

// validate('new test who this',
// 	``,
// 	``
// )
console.log('tests complete!');
console.log(
`Summary:
	total tests: ${tests}
	total fails: ${tests_fail}
	nodes failed: ${lines_fail}
`)
