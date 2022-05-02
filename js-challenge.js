
const MultipleParentsError = childKey => `Error! Child '${childKey}' has more than one parent established. Please submit only children with 1 parent.`

const GetNodeMetaData = linesStr => {
	const edges = linesStr.split("\n")
		.map(row => row.replace(/ +/g, " ").split(" "))
	let edgesPerParent = {};	
	let childKeys = []
	let parentKeys = []

	edges.forEach(([parentKey, childKey, value]) => {
		childKeys.push(childKey);
		parentKeys.push(parentKey);
		if(!Object.keys(edgesPerParent).includes(parentKey)) {
			edgesPerParent[parentKey] = [];
		}
		edgesPerParent[parentKey].push({ childKey, value });
	})
	const dupeChildKeys = childKeys.filter((item, index) => childKeys.indexOf(item) !== index)
	// console.log(dupeChildKeys)
	if (dupeChildKeys.length != 0) return MultipleParentsError(dupeChildKeys[0]);

	edgesPerParent['root'] = [ ... new Set(parentKeys.filter(parentKey => !childKeys.includes(parentKey))) ].map(childKey => ({ childKey, value: 1 })) 

	const nodes = genNodeRecursive(edgesPerParent, 'root');
	const nodes_flat = flattenNodes(nodes)

	const maxes = nodes_flat.reduce((acc, { key, value }) => {
		if (key == 'root') return acc;
		return { key: Math.max(acc.key, key.length), value: Math.max(acc.value, value.toString().length) }
	}, { key: 0, value: 0})


	return nodes_flat.filter(({key}) => key != 'root')
		.sort(({ key: key1 },{ key: key2 }) => {
			const k1 = parseInt(key1.replace("S",""))
			const k2 = parseInt(key2.replace("S",""))
			return k1 < k2 ? -1 : k1 > k2 ? 1 : 0;			
		})
		.map(({key, value, subDirCnt}) => 
		`${key}${spaces(maxes.key - key.length)}${value}${spaces(maxes.value - value.toString().length)}${subDirCnt}`
	).join("\n")

}

const spaces = n => " ".repeat(n+1);

const genNodeRecursive = (edgesPerParent, key, mult=1) => {
	const edges = edgesPerParent[key];
	if(edges == undefined) {
		return { key, value: mult, subDirCnt: 1, children: [] }
	} else {
		const childrenEdges = edges.map(({ childKey, value }) => 
			genNodeRecursive(edgesPerParent, childKey, value*mult)
		)
		return {
			key, value: mult 
			,subDirCnt: 1 + childrenEdges.reduce((acc,{subDirCnt})=>acc+subDirCnt,0)
			,children: childrenEdges
		}
	}
}
const flattenNodes = ({ key, value, subDirCnt, children }) => 
	children.reduce((acc, child) => {
		return [ ...acc, ...flattenNodes(child) ]
	}, ([ { key, value, subDirCnt } ]))


module.exports = { GetNodeMetaData, MultipleParentsError }