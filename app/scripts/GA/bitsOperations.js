bitsOperations=Class.extend({
	//pasar a bits
	cross:function(NumA,NumB,crossoverPoint){ 
		NumA <<= 64-crossoverPoint; //this 64 is the bits size of an int in javascript
		NumA >>>=64-crossoverPoint; 
		NumB >>>=crossoverPoint;
		NumB <<=crossoverPoint;
		return Math.floor(Math.abs(NumA|=NumB));
	},
	mutate:function(pTemporalID){
		var mutationPoint = 1;
		mutationPoint <<= Math.floor(Math.random() * ((BITS_TO_USE-1)-1)) + 1;
		return Math.floor(Math.abs(pTemporalID|=mutationPoint));
	}
});
BitsOperations=new bitsOperations();