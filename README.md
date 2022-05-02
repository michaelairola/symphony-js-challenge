# Challenge Javascript 

Write a small JavaScript function that takes as input (of string type):

	S10 S12 11
	S9  S13 2
	S1  S10 3
	S1  S3  2.1
	S1  S2  1
	S10 S11 13
	S5  S6  7
	S3  S4  1
	S3  S5  5
	S7  S8  13
	S7  S9  2


And returns as output (of string type):
	
	S1  1    9
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
	S13 4    1


Hint: think tree structure.

Make sure:

- That it generalizes to many similar inputs, including with a large data set
- To use only VanillaJS and Lodash
- To follow [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)
- To avoid `for` or `foreach` loops (and favor `map`, `reduce`, `filter`, …)
- Not to approach a O(N²) complexity — where N is the number of input lines

# Requirements 
Given a list of edges in a tree graph, return a list of nodes with:
	
1) The product of all edge values from the root node (the root node is connected to all nodes that do not have a parent node by an edge with value 1).
2) The sum of all children nodes underneath it, including itself. 

This must be in O(N) complexity.

# Implementation:
In the input, each line represents an edge in graph theory. Since edges in this graph have a 1 parent to multiple children relationship, we can first group the edges by parents and then use a recursive function to generate the graph tree from this parent key mapping. The recursive function is helpful because:
	
1) We only run the function once per node, with O(N) complexity
2) We are able to propagate the edge multipliers down to the children nodes while also summing the count of directories underneath the parent nodes. 

From here, all it takes is a simple flattening of the node tree and string formatting to output the desired result. 
	
# Validations/Testing

Running `node js-challenge-tests.js` will run all the tests. Things I wanted to make sure held up under scrutiny: 

1) The first example case should go through correctly.
2) No children should have more than 1 parent. If this occurs an error is thrown that indicates as such.

Given more examples of how this function would be used and what type of inputs we would expect to receive, more tests should be added to the suite. 

