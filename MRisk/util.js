// These are some utility functions to make life easier
	// The game doesn't depend upon them

	clog = console.log;

    // Usefule Type Checking Function

	// assert(door, NotEmpty); or assert(NotEmpty, door);
	//		Fails for null, '', undefined
	//		Success for any non empty object
	// assert(door instanceof Door, true);
	//		Checks for objects that were made using new keyword
	// assert(typeof name, 'string')
	//		Checks of type of built in objects
	// assert(typeof foo, 'function')
	// 		Also works

    assert = function(obj1, obj2, msg) {
    	if(obj1 === NotEmpty && !obj2)
    		throw Error(msg);
    	if(obj2 === NotEmpty && !obj1)
    		throw Error(msg);
    	if(obj1 !== obj2 && obj1 !== NotEmpty && obj2 != NotEmpty) 
    		throw Error(msg);
    }

    // A special long unique string to ensure non empty objects using assrt()
    NotEmpty = 'ODH@<)UD@D(@#>DJIJEIDKLADJ<@UD(UD>KLDM:LEDJ';

    // Define constant object members

    final = (obj, key, value) => {
    	assert(obj, NotEmpty, 'Object cannot be empty');
    	assert(key, NotEmpty, 'Key cannot be empty');
		Object.defineProperty( obj, key, {
			value: value,
			writable: false,
			enumerable: true,
			configurable: true
		}); // Makes obj.<key> unwritable and final
    }
