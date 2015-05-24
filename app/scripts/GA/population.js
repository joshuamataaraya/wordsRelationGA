var population=Class.extend({
	init:function(){
		this._Elements=[]; //type element
		this._Representation;
		this._MaxDistance=0;
		this._MaxGrade=0;
		this._InitialElementsLenght=0;
	},
	addElements:function(argElement){
		this._InitialElementsLenght++;
		this._Elements.push(argElement);
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
				if(this._MaxDistance<distanceTemp){ //this check the max distance
					this._MaxDistance=distanceTemp;
				}
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
				if(this._MaxGrade<gradeTemp){ //this check the max distance
					this._MaxGrade=gradeTemp;
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
	cross:function(NumA,NumB,crossoverPoint){
		NumA <<= 64-crossoverPoint; //this 64 is the bits size of an int in javascript
		NumA >>>=64-crossoverPoint; 
		NumB >>>=crossoverPoint;
		NumB <<=crossoverPoint;
		return Math.floor(Math.abs(NumA|=NumB));
	},
	crossover:function(){
		var elementA;
		var elementB;
		var elementAID;
		var elementBID;
		var elementADistance;
		var elementBDistance;
		var elementAGrade;
		var elementBGrade;
		var min=0;
		var max=this._Elements.length;
		var newElementsCounter=this._InitialElementsLenght-max-1;
		min=0;
		max=equivalences.getBitsToUse();
		var crossoverPoint;
		for(;newElementsCounter>0;--newElementsCounter){
			crossoverPoint=Math.floor(Math.random() * (max - min)) + min
			elementA=this.getRandomElement();
			elementB=this.getRandomElement();
			
			elementAID=elementA.getID();
			elementBID=elementB.getID();

			elementADistance=elementA.getDistance();
			elementBDistance=elementB.getDistance();

			elementAGrade=elementA.getGrade();
			elementBGrade=elementB.getGrade();

			var NewElement=new element(this.cross(elementAID,elementBID,crossoverPoint));
			NewElement.setGrade(this.cross(elementAGrade,elementBGrade,crossoverPoint));
			NewElement.setDistance(this.cross(elementADistance,elementBDistance,crossoverPoint));
			this._Elements.push(NewElement); 
		}
	},
	getNextGeneration:function(){
		//filter with fitness to reduce the population
		// this.setDistance();
		// this.setGrade();
		this.fitness();
		this.crossover();
	},
	getActualGeneration:function(){
		return this._Elements;
	},
	Mutation:function(){
		//change the ID to string, and change a random bit of it
		//toMutate is the 5% of the population.
		var toMutate = this._Elements.length/100*95;
		for(;toMutate>=0;toMutate--){
			var temporalElementIndex = Math.floor(Math.random() * ((this._Elements.length-1)-0)) + 0;
			var temporalID = this._Elements[temporalElementIndex].getID();
			var mutationPoint = 1;
			mutationPoint <<= Math.floor(Math.random() * ((equivalences.getBitsToUse()-1)-1)) + 1;
			temporalID = Math.floor(Math.abs(temporalID|=mutationPoint));
			this._Elements[temporalElementIndex].setID(temporalID);
		}
	},
	setMaxDistanceAndMaxGrade:function(){
		var elementIndex=0;
		for(;elementIndex<=this._Elements.length-1;++elementIndex){
			var elementDistance=this._Elements[elementIndex].getDistance();
			var elementGrade=this._Elements[elementIndex].getGrade();
			if(elementDistance>this._MaxDistance){
				this._MaxDistance=elementDistance;
			}
			if(elementGrade>this._MaxGrade){
				this._MaxGrade=elementGrade;
			}
		}
	},
	fitness:function(){
		this.setMaxDistanceAndMaxGrade();

		var elementsByEvaluation=[];
		var elementIndex=0;
		for(;elementIndex<=this._Elements.length-1;++elementIndex){
			var element=this._Elements[elementIndex];
			var evaluation=Math.floor(element.getDistance()*50/this._MaxDistance);
			evaluation=evaluation+Math.floor(element.getGrade()*50/this._MaxGrade);
			if(elementsByEvaluation[evaluation]!=undefined){
				elementsByEvaluation[evaluation].push(element);
			}else{
				elementsByEvaluation[evaluation]=[element];
			}
		}
		var elementsFitNumber=equivalences.getFitPorcentage()*this._Elements.length;
		elementsFitNumber=Math.floor(elementsFitNumber/100);
		evaluationIndex=elementsByEvaluation.length-1;
		var fitPopulation=[];
		for(;evaluationIndex>=0 && elementsFitNumber>0;--evaluationIndex){
			if(elementsByEvaluation[evaluationIndex]!=undefined){
				for(elementIndex=elementsByEvaluation[evaluationIndex].length-1;
					elementIndex>=0  && elementsFitNumber>0;--elementIndex){
					fitPopulation.push(elementsByEvaluation[evaluationIndex][elementIndex]);
					elementsFitNumber--;
				}
			}
		}
		this._Elements=fitPopulation;
	},
});