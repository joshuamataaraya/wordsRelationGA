var GA=Class.extend({
	init:function(argListOfWords,argArrayAllTheText){
		this._ListOfWords=argListOfWords;
		this._Population=new population();
		this._Representation=[];
		this._DifferentWords=0;
		this._ListOfTheText=argArrayAllTheText;
		this._ListOfTheText.sort();
		//set genetic representation
	},
	start:function(){
		//generate n generations
		equivalences.setWordsNum(this._ListOfWords.length);
		this.countDifferentsWordAndFillRepresentation();
		this.createSegmentsIDAndInitialPopulation();
		var n=50;
		while(n>0){
			this._Population.getNextGeneration();
			n--;
		}	
		var topTen=this.getTopTen();
		topTen=this.setTotalDistance(topTen);
		return topTen;
	},
	reviewEnd:function(){
		if(true){
			return true;
		}else{
			return false;
		}
	},
	setTotalDistance:function(topTen){
		var topTenIndex=0;
		var wordsIndex; 
		for(;topTenIndex<=topTen.length-1;++topTenIndex){
			wordsIndex=0;
			for(;wordsIndex<=this._ListOfTheText.length-1;++wordsIndex){
				if(topTen[topTenIndex].getWord()==this._ListOfTheText[wordsIndex]){
					topTen[topTenIndex].incTotalDistance();
				}
			}
		}
		return topTen;
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
				var elementA=new element(id);
				this._Population.addElements(elementA);
			}
		}
		hashRepresentation.setRepresentation(this._Representation);
		//set Distance-->also the highest distance of the population
		this._Population.setDistance();
		//set grade-->also the highest grade of the population
		this._Population.setGrade();
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
	getTopTen:function(){
		//words = [['word', height,distance, totalDistance]];
		this._Population.setDistance();
		this._Population.setGrade();
		var elements=this._Population.getActualGeneration();
		var wordsByEvaluation=[];
		var elementsBySegment=[]; //it will store the elements by word Or by distance
		var words=[];
		var elementIndex=0;
		var wordTemp;
		var distance;
		var grade;
		var evaluation;
		var maxDistance=0;
		var maxGrade=0;
		//sort the elements by segment
		for(;elementIndex<=elements.length-1;++elementIndex){
			var elementSegment=hashRepresentation.getSegment(
				elements[elementIndex].getID())
			if(elementsBySegment[elementSegment]!=undefined){
				elementsBySegment[elementSegment].push(elements[elementIndex]);
			}else{
				elementsBySegment[elementSegment]=[elements[elementIndex]];
			}
		}
		//create a word for each segment and find the highest distance and grade
		var topTen=[];
		for(elementIndex=0;elementIndex<=elementsBySegment.length-1;++elementIndex){
			if(elementsBySegment[elementIndex]!=undefined){
				wordTemp=new word(this._Representation[elementIndex].getWord());
				var wordsIndex=0;
				distance=elementsBySegment[elementIndex].length;
				grade=0;
				for(;wordsIndex<=elementsBySegment[elementIndex].length-1;++wordsIndex){
					grade+=elementsBySegment[elementIndex][wordsIndex].getGrade();
				}
				wordTemp.setDistance(distance);
				wordTemp.setGrade(grade);
				//have to fix the total of aparitions
				words.push(wordTemp);	
				if(maxDistance<distance){
					maxDistance=distance;
				}
				if(maxGrade<grade){
					maxGrade=grade;
				}
			}
		}
		//order the words by evaluation
		for(wordsIndex=0;wordsIndex<=words.length-1;++wordsIndex){
			var evaluation=words[wordsIndex].getEvaluation(maxDistance,maxGrade);
			if(wordsByEvaluation[evaluation]!=undefined){
				wordsByEvaluation[evaluation].push(words[wordsIndex]);
			}else{
				wordsByEvaluation[evaluation]=[words[wordsIndex]];
			}
		}
		var topTenCounter=10;
		var evaluationIndex=wordsByEvaluation.length-1;
		//get the top ten acording to the evaluations
		for(;topTenCounter>0 && evaluationIndex>=0;--evaluationIndex){
			if(wordsByEvaluation[evaluationIndex]!=undefined){
				wordsIndex=wordsByEvaluation[evaluationIndex].length-1;
				for(;wordsIndex>=0 && topTenCounter>0;--wordsIndex){
					topTen.push(wordsByEvaluation[evaluationIndex][wordsIndex]);
					topTenCounter--;	
				}
			}
		}
		return topTen;
	},
});