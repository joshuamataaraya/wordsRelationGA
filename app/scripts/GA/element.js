var element=Class.extend({
	init:function(argID){
		this._ID=argID;
		this._DistanceID=0;
		this._GradeID=0;
		this._Distance=0;
		this._Grade=0;
	},
	setID:function(argID){
		this._ID=argID;
	},
	setDistanceID:function(argDistance){
		this._DistanceID=argDistance;
	},
	setGradeID:function(argGrade){
		this._GradeID=argGrade;
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
	},
	getDistanceID:function(){
		return this._DistanceID;
	},
	getGradeID:function(){
		return this._GradeID;
	}
});