var equivalences=Class.extend({
	init:function(){
		this._WordsZonePorcentage=20; //this is the porcentage of the zone to analize,
							//it depends of the length of the file inserted.
		this._ElementsNum=0;
		this._bitsToUse=16;
		this._BiggestNumer=Math.pow(2,this._bitsToUse)-1;
	},
	getWordsZonePorcentage:function(){
		return this._WordsZonePorcentage;
	},
	getBiggestNumber:function(){
		return this._BiggestNumer;
	},
	getSizePerElement:function(){
		return Math.floor(this._BiggestNumer/this._ElementsNum);
	},
	setWordsNum:function(argNum){
		this._ElementsNum=argNum;
	},
	getWordsNum:function(){
		return this._ElementsNum;
	}
});
var equivalences=new equivalences();