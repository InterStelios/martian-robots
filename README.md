[![Build Status](https://travis-ci.org/stelioskiayias/martian-robots.svg?branch=master)](https://travis-ci.org/stelioskiayias/martian-robots)

### Getting Started
**Dependencies:**

 - node: >=v7.7.2
 - npm: >=4.1.2

Checkout or download the source of this repository.

    cd martian-robots
    npm install

**Running the robots:**

	npm start

The above runs the `/resources/input.txt` as the initial input.

**Running the tests:**

    npm test
    
On windows you can do (from root dir): 

	node node_modules\mocha\bin\mocha

### Defining your own instructions:
Robots are by default simple; they don't know how to execute any actions. Thus, they need to be configured with an instruction set. Robots in this example use the instructions within `/src/core/instructions.js`.

Each instruction definition has a name and a function. When an instruction is executed within the robot, the name is matched within the instructions and the function retrieves the robot's properties object (position, orientation, speed) as a parameter. The result of the action (function execution) is a new properties object which indicates the robot's next move.

Here's how you can define a new 'B' action (back) which when executed, inverses the robot's orientation:

	  B: ({ orientation }) => ({
	    orientation: (orientation + 180) % 360
	  })

### Notes
* Some input data validation exists but it is very basic; i.e. malformed input files will not work.
* Testing covers many cases and the main functionality but it is in no way 100% complete.
* Mars is a strange planet... for instance our robots can pass through each other or can stack-up on the same tile indefinitely.

### Sample

**Input:**

	5 3
	1 1 E
	RFRFRFRF

	3 2 N
	FRRFLLFFRRFLL

	0 3 W
	LLFFFLFLFL

	1 1 W
	FFRFF

	1 1 W
	FFLFF

	1 1 W
	FFLFFRRFRF

	1 1 W
	FFLFFRRFRFLFFFLF

	1 1 W
	FFLFFRRFRFLFFFLF

**Output:**

	1 1 E
	3 3 N LOST
	2 3 S
	0 1 W LOST
	0 0 S LOST
	1 1 E
	1 3 N LOST
	0 3 W
