bitsOperations=Class.extend({
	//pasar a bits
	cross:function(NumA,NumB,crossoverPoint){ 
		NumA <<= 64-crossoverPoint; //this 64 is the bits size of an int in javascript
		NumA >>>=64-crossoverPoint; 
		NumB >>>=crossoverPoint;
		NumB <<=crossoverPoint;
		return Math.floor(Math.abs(NumA|=NumB));
	},
});
BitsOperations=new bitsOperations();