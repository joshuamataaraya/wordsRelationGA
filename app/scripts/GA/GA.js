var GA=Class.extend({
	init:function(argPopulation){
		this._Population=argPopulation;
		this._MaxDistance=0;
		this._MaxGrade=0;
		//set genetic representation
	},
	start:function(){
		//generate n generations
		var generations=NUMBER_OF_GENERATIONS;
		while(generations>0){
			this.getNextGeneration();
			generations--;
			//this._Population.Mutation();
		}	
		this._Population.setDistance();
		this._Population.setGrade();
		return this._Population.getActualGeneration();
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
		var elements=this._Population.getActualGeneration();
		var min=0;
		var max=elements.length;
		var newElementsCounter=this._Population.getInitialElementsLenght()-max-1;
		min=0;
		max=BITS_TO_USE;
		var crossoverPoint;
		for(;newElementsCounter>0;--newElementsCounter){
			crossoverPoint=Math.floor(Math.random() * (max - min)) + min
			elementA=this._Population.getRandomElement();
			elementB=this._Population.getRandomElement();
			
			elementAID=elementA.getID();
			elementBID=elementB.getID();

			elementADistance=elementA.getDistanceID();
			elementBDistance=elementB.getDistanceID();

			elementAGrade=elementA.getGradeID();
			elementBGrade=elementB.getGradeID();

			var NewElement=new element(BitsOperations.cross(elementAID,elementBID,crossoverPoint));
			NewElement.setGrade(BitsOperations.cross(elementAGrade,elementBGrade,crossoverPoint));
			NewElement.setDistance(BitsOperations.cross(elementADistance,elementBDistance,crossoverPoint));
			this._Population.addElements(NewElement); 
		}
	},
	Mutation:function(){
		//change the ID to string, and change a random bit of it
		//toMutate is the 5% of the population.
		var toMutate = this._Elements.length/100*95;
		for(;toMutate>=0;toMutate--){
			var temporalElementIndex = Math.floor(Math.random() * ((this._Elements.length-1)-0)) + 0;
			var temporalID = this._Elements[temporalElementIndex].getID();
			temporalID = BitsOperations.mutate(temporalID);
			this._Elements[temporalElementIndex].setID(temporalID);
		}
	},
	fitness:function(){
		this._Population.setDistanceAndGrade();
		this.setMaxDistanceAndMaxGrade();
		var elements=this._Population.getActualGeneration();
		var elementsByEvaluation=[];
		var elementIndex=0;
		for(;elementIndex<=elements.length-1;++elementIndex){
			var element=elements[elementIndex];
			var evaluation=Math.floor(element.getDistance()*50/this._MaxDistance);
			evaluation=evaluation+Math.floor(element.getGrade()*50/this._MaxGrade);
			if(elementsByEvaluation[evaluation]!=undefined){
				elementsByEvaluation[evaluation].push(element);
			}else{
				elementsByEvaluation[evaluation]=[element];
			}
		}
		var elementsFitNumber=FIT_PORCENTAGE*elements.length;
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
		this._Population.setActualGeneration(fitPopulation);
	},
	getNextGeneration:function(){
		//filter with fitness to reduce the population
		this.fitness();
		this.crossover();
	},
	setMaxDistanceAndMaxGrade:function(){
		var elementIndex=0;
		elements=this._Population.getActualGeneration();
		for(;elementIndex<=elements.length-1;++elementIndex){
			var elementDistance=elements[elementIndex].getDistance();
			var elementGrade=elements[elementIndex].getGrade();
			if(elementDistance>this._MaxDistance){
				this._MaxDistance=elementDistance;
			}
			if(elementGrade>this._MaxGrade){
				this._MaxGrade=elementGrade;
			}
		}
	},
	getPopulation:function(){
		return this._Population.getActualGeneration();
	}
});