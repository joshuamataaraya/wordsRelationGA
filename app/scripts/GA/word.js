var word=Class.extend({
	init:function(argWord){
		this._Word=argWord;
		this._Distance=0;
		this._Grade=0;
		this._TotalDistance=0;
	},
	incTotalDistance:function(){
		this._TotalDistance=this._TotalDistance+1;
	},
	getTotalDistance:function(){
		return this._TotalDistance;
	},
	getWord:function(){
		return this._Word;
	},
	getDistance:function(){
		return this._Distance;
	},
	setDistance:function(argDistance){
		this._Distance=argDistance;
	},
	getGrade:function(){
		return this._Grade;
	},
	setGrade:function(argGrade){
		this._Grade=argGrade;
	},
	getEvaluation:function(argMaxDistance,argMaxGrade){
		var evaluation=Math.floor(this._Distance*50/argMaxDistance);
		evaluation=evaluation+Math.floor(this._Grade*50/argMaxGrade);
		return evaluation;
	}
});