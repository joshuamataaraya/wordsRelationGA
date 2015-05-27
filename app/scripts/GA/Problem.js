Problem=Class.extend({
	init:function(argListOfWords,argArrayAllTheText){
		this._ListOfWords=argListOfWords;
		this._Representation=[];
		this._ListOfWords=argListOfWords;
		ELEMENTS_NUM = this._ListOfWords.length;
		this.setWordsRange();
		this._ListOfTheText=argArrayAllTheText;
		this._ListOfTheText.sort();
	},
	setWordsRange:function(){
		this.fillRepresentation();
		this.createSegmentsID();
	},
	setDistanceRange:function(){

	},
	setGradeRange:function(){

	},
	fillRepresentation:function(){
		//it fills the list of representation
		this._ListOfWords.sort();
		var wordIndex=this._ListOfWords.length-1;
		var previousWord=""; 
		for(;wordIndex>=0;--wordIndex){
			if(this._ListOfWords[wordIndex]!=previousWord){
				var DifferentWord=new Representation();
				DifferentWord.setWord(this._ListOfWords[wordIndex]);
				previousWord=this._ListOfWords[wordIndex];
				this._Representation.push(DifferentWord);
			}else{
				this._Representation[this._Representation.length-1].increaseAparitions();
			}
		}
	},
	createSegmentsID:function(){
		//it defines the size of the segments to the list of representations.
		var segmentNumber=0;
		var lastRangeNumber=0;
		var segmentIndex=0;
		for(;segmentIndex<this._Representation.length;++segmentIndex){
			lastRangeNumber=this._Representation[segmentIndex].setRangeAndGetLastNumberInRange(lastRangeNumber);
			this._Representation[segmentIndex].setNumberID(segmentIndex);
		}
		this._Representation[this._Representation.length-1].setLastRangeNumber(BIGGEST_NUMBER);
		hashRepresentation.setRepresentation(this._Representation);
	},
	getTopTen:function(){
		var ga=new GA(this._Representation);
		var elements=ga.start();
		var wordsByEvaluation=[];
		var words=[];
		var elementIndex=0;
		var wordTemp;
		var distance;
		var grade;
		var evaluation;
		var maxDistance=0;
		var maxGrade=0;
		var elementsBySegment=hashForElements.createHash(elements,"Segment");
		var topTen=[];
		for(elementIndex=0;elementIndex<=elementsBySegment.length-1;++elementIndex){
			if(elementsBySegment[elementIndex]!=undefined){
				wordTemp=new word(this._Representation[elementIndex].getWord());
				var wordsIndex=0;
				distance=elementsBySegment[elementIndex].length;
				grade=elementsBySegment[elementIndex][0].getGrade();
				//grade=0;
				for(;wordsIndex<=elementsBySegment[elementIndex].length-1;++wordsIndex){
					if(grade<elementsBySegment[elementIndex][wordsIndex].getGrade()){
						grade=elementsBySegment[elementIndex][wordsIndex].getGrade();
					}
					//grade+=elementsBySegment[elementIndex][wordsIndex].getGrade();
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
		words.sort(function(a,b){
			return b.getEvaluation(maxDistance,maxGrade)-a.getEvaluation(maxDistance,maxGrade);
		});
		var topTenCounter=10;
		var wordsIndex=0;
		for(;topTenCounter>0;--topTenCounter,++wordsIndex){
			topTen.push(words[wordsIndex])
		}
		topTen=this.setTotalDistance(topTen);
		return topTen;
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
});