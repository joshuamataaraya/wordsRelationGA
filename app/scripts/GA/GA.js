var population=Class.extend({
	init:function(){
		this._Elements=[]; //type element
		this._Representation;
		this._MaxDistance=0;
		this._MaxGrade=0;
	},
	addElements:function(argElement){
		this._Elements.push(argElement);
	},
	setDistance:function(){
		//sort the elements by segment
		var elementsBySegment=[];
		var elementIndex=0;
		for(;elementIndex<=this._Elements.length-1;++elementIndex){
			var elementSegment=hashRepresentation.getSegment(
				this._Elements[elementIndex].getID())
			if(elementsBySegment[elementSegment]!=undefined){
				elementsBySegment[elementSegment].push(this._Elements[elementIndex]);
			}else{
				elementsBySegment[elementSegment]=[this._Elements[elementIndex]];
			}
		}
		var segmentIndex=0;
		var distanceTemp;
		for (;segmentIndex<=elementsBySegment.length-1;++segmentIndex){
			if(elementsBySegment[segmentIndex]!=undefined){
				distanceTemp=elementsBySegment[segmentIndex].length
				if(this._MaxDistance<distanceTemp){ //this check the max distance
					this._MaxDistance=distanceTemp;
				}
				for(elementIndex=0;
					elementIndex<=elementsBySegment[segmentIndex].length-1;
					++elementIndex){
					elementsBySegment[segmentIndex][elementIndex].
					setDistance(distanceTemp);
				}
			}
		}
		//count the similar ones
	},
	sortPopulationByAparitions:function(){
		
		//sort the elements by segment
	},

	setGrade:function(){
		//sort the elements by segment
		var elementsByDistance=[];
		var elementIndex=0;
		for(;elementIndex<=this._Elements.length-1;++elementIndex){
			var elementDistance=this._Elements[elementIndex].getDistance()
			if(elementsByDistance[elementDistance]!=undefined){
				elementsByDistance[elementDistance].push(this._Elements[elementIndex]);
			}else{
				elementsByDistance[elementDistance]=[this._Elements[elementIndex]];
			}
		}
		var distanceIndex=0;
		var gradeTemp;
		for (;distanceIndex<=elementsByDistance.length-1;++distanceIndex){
			if(elementsByDistance[distanceIndex]!=undefined){
				gradeTemp=elementsByDistance[distanceIndex].length
				if(this._MaxGrade<gradeTemp){ //this check the max distance
					this._MaxGrade=gradeTemp;
				}
				for(elementIndex=0;
					elementIndex<=elementsByDistance[distanceIndex].length-1;
					++elementIndex){
					elementsByDistance[distanceIndex][elementIndex].
					setGrade(gradeTemp);
				}
			}
		}
		//count the similar ones
	},
	recombination:function(){
		//change the element to string and mix the id
		//acording to the id set the element segment, 
			//using the 
	},
	getNextGeneration:function(){
		//set Distance-->also the highest distance of the population
		this.setDistance();
		//set grade-->also the highest grade of the population
		this.setGrade();
		//filter with fitness to reduce the population
	},
	getActualGeneration:function(){
		return this._Elements;
	},
	Mutation:function(){
		//change the ID to string, and change a random bit of it
	},
	fitness:function(){
		// if(the grade of the element is higher than 70){
		// 	return true;
		// }else{
		// 	return false;
		// }
	},
});
var GA=Class.extend({
	init:function(argListOfWords){
		this._ListOfWords=argListOfWords;
		this._Population=new population();
		this._Representation=[];
		this._DifferentWords=0;
		//set genetic representation
	},
	start:function(){
		//generate n generations
		equivalences.setWordsNum(this._ListOfWords.length);
		this.countDifferentsWordAndFillRepresentation();
		this.createSegmentsIDAndInitialPopulation();	
		this._Population.getNextGeneration();
		return this._Population
	},
	reviewEnd:function(){
	},
	createSegmentsIDAndInitialPopulation:function(){
		//it defines the size of the segments
		var segmentNumber=0;
		var lastRangeNumber=0;
		var segmentIndex=0;
		for(;segmentIndex<this._Representation.length;++segmentIndex){
			var min=lastRangeNumber;
			lastRangeNumber=this._Representation[segmentIndex].
			setRangeAndGetLastNumberInRange(lastRangeNumber);
			var max=lastRangeNumber+1;
			this._Representation[segmentIndex].setNumberID(segmentIndex);

			//this part add new elements to the population
			var aparitions=this._Representation[segmentIndex].getAparitions();
			for(;aparitions>0;--aparitions){
				var id=Math.floor(Math.random() * (max - min)) + min;
				var elementA=new element(id,segmentIndex);
				this._Population.addElements(elementA);
			}
		}
		hashRepresentation.setRepresentation(this._Representation);
	},
	countDifferentsWordAndFillRepresentation:function(){
		//it counts how many different words are there in the text
		//but also it fills the list of representation
		this._ListOfWords.sort();
		var wordIndex=this._ListOfWords.length-1;
		var previousWord=""; 
		for(;wordIndex>=0;--wordIndex){
			if(this._ListOfWords[wordIndex]!=previousWord){
				var DifferentWord=new representation(this._ListOfWords[wordIndex]);
				previousWord=this._ListOfWords[wordIndex];
				this._Representation.push(DifferentWord);
				this._DifferentWords++;
			}else{
				this._Representation[this._Representation.length-1].increaseAparitions();
			}
		}
	},
	notIn:function(word,words){
	  for(wordIndex=0;wordIndex<words.length;wordIndex++){
	    if(words[wordsIndex]==word){
	      return false;
	    }
	  }
	  return true;
	},
});
var hashForRepresentation=Class.extend({
	/*every element has a number id, and also a segment
	this is a hash function that if you give to it the 
	number, it returns the segment.
	It depends of the segment an their ranges defined
	on the chromosomal representation.
	*/
	init:function(){
		this._RepresentationList=[];
	},
	setRepresentation:function(argRepresentation){
		this._RepresentationList=argRepresentation;
	},
	getSegment:function(ID){
		var solution=false;
		var max=this._RepresentationList.length-1;
		var min=0;
		var index=max-min;
		var segment=0;
		while(!solution){
			if(this._RepresentationList[index].getRange()[0]>ID){
				max=index;
				index=Math.floor(Math.random() * (max - min)) + min;
			}else if(this._RepresentationList[index].getRange()[1]<ID){
				min=index;
				index=Math.floor(Math.random() * (max - min)) + min;
			}else{
				segment=this._RepresentationList[index].getNumberID();
				solution=true;
			}
		}
		return segment;
	}
});
var hashRepresentation=new hashForRepresentation(); //its a global hash table.