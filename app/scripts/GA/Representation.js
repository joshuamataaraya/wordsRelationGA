var Representation=Class.extend({
	init:function(){
		this._Word="";
		this._Aparitions=1;
		this._NumberID=0;
		this._Range=[];
	},
	setWord:function(argWord){
		this._Word=argWord;
	},
	setAparitions:function(argAparitions){
		this._Aparitions=argAparitions;
	},
	setNumberID:function(argID){
		this._NumberID=argID;
	},
	setRangeAndGetLastNumberInRange:function(argLastNumerInRange){
		this._Range[0]=argLastNumerInRange;
		this._Range[1]=argLastNumerInRange+(this._Aparitions*(Math.floor(BIGGEST_NUMBER/ELEMENTS_NUM)))-1;
		return this._Range[1]+1;
	},
	setFirstRangeNumber:function(argLastNumberOfRange){
		this._Range[0]=argLastNumberOfRange;
	},
	setLastRangeNumber:function(argLastNumberOfRange){
		this._Range[1]=argLastNumberOfRange;
	},
	getRange:function(){
		return this._Range;
	},
	getWord:function(){
		return this._Word;
	},
	getAparitions:function(){
		return this._Aparitions;
	},
	getNumberID:function(){
		return this._NumberID;
	},
	getID:function(){
		return this._NumberID;
	},
	increaseAparitions:function(){
		this._Aparitions++;
	}
});