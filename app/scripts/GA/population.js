var population=Class.extend({
	init:function(){
		this._Elements=[]; //type element
		this._Representation;
		this._InitialElementsLenght=0;
	},
	addElements:function(argElement){
		this._Elements.push(argElement);
	},
	initializePopulation:function(argRepresentation){
		var segmentNumber=0;
		var lastRangeNumber=0;
		var segmentIndex=0;
		for(;segmentIndex<argRepresentation.length;++segmentIndex){
			var range=argRepresentation[segmentIndex].getRange();
			var min=range[0];
			var max=range[1];
			var aparitions=argRepresentation[segmentIndex].getAparitions();
			for(;aparitions>0;--aparitions){
				var id=Math.floor(Math.random() * (max - min)) + min;
				var elementA=new element(id);
				this.addElements(elementA);
			}
		}
		this._InitialElementsLenght=this._Elements.length;
		//set Distance-->also the highest distance of the population
		this.setDistance();
		//set grade-->also the highest grade of the population
		this.setGrade();
	},
	getInitialElementsLenght:function(){
		return this._InitialElementsLenght;
	},
	setDistance:function(){
		var elementsBySegment=hashForElements.createHash(this._Elements,"Segment");
		var segmentIndex=0;
		var distanceTemp;
		/*
			for every element in the same segments, it sets the distance, that is 
			the size of the list in the hash table for the segment.
		*/
		for (;segmentIndex<=elementsBySegment.length-1;++segmentIndex){
			if(elementsBySegment[segmentIndex]!=undefined){
				distanceTemp=elementsBySegment[segmentIndex].length;
				for(elementIndex=0;
					elementIndex<=elementsBySegment[segmentIndex].length-1;
					++elementIndex){
					elementsBySegment[segmentIndex][elementIndex].setDistance(distanceTemp);
				}
			}
		}
	},
	setGrade:function(){
		var elementsByDistance=hashForElements.createHash(this._Elements,"Distance");;
		var distanceIndex=0;
		var gradeTemp;
		for (;distanceIndex<=elementsByDistance.length-1;++distanceIndex){
			if(elementsByDistance[distanceIndex]!=undefined){
				gradeTemp=elementsByDistance[distanceIndex].length
				if(elementsByDistance[distanceIndex-1]!=undefined){
					gradeTemp+=elementsByDistance[distanceIndex-1].length;
				}
				if(elementsByDistance[distanceIndex+1]!=undefined){
					gradeTemp+=elementsByDistance[distanceIndex+1].length;
				}
				if(elementsByDistance[distanceIndex-2]!=undefined){
					gradeTemp+=elementsByDistance[distanceIndex-2].length;
				}
				if(elementsByDistance[distanceIndex+2]!=undefined){
					gradeTemp+=elementsByDistance[distanceIndex+2].length;
				}
				for(elementIndex=0;
					elementIndex<=elementsByDistance[distanceIndex].length-1;
					++elementIndex){
					elementsByDistance[distanceIndex][elementIndex].setGrade(gradeTemp);
				}
			}
		}
	},
	getRandomElement:function(){
		var min=0;
		var max=this._Elements.length-1;
		return this._Elements[Math.floor(Math.random() * (max - min)) + min];
	},
	getActualGeneration:function(){
		return this._Elements;
	},
	setActualGeneration:function(argElements){
		this._Elements=argElements;
	},
});