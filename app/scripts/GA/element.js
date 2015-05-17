var element=Class.extend({
	init:function(){
		this._ID=0;
		this._Distance=0;
		this._Grade=0;
	},
	setID:function(argID){
		this._ID=argWordNum;
	},
	setDistance:function(argDistance){
		this._Distance=argDistance;
	},
	setGrade:function(argGrade){
		this._Grade=argGrade;
	},
	getID:function(){
		return this._ID;
	},
	getDistance:function(){
		return this._Distance;
	},
	getGrade:function(){
		return this._Grade;
	}
});