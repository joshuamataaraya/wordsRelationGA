var population=Class.extend({
	init:function(){
		var elements=[];
	},
	recombination:function(){
	},
	getNextGeneration:function(){
	},
	getActualGeneration:function(){
	},
	Mutation:function(){
	},
	fitness:function(){
		// if(){
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
		this.createSegmentsOnID();	
	},
	reviewEnd:function(){
	},
	createSegmentsOnID:function(){
		//it defines the size of the segments
		var segmentNumber=0;
		var lastRangeNumber=0;
		var segmentIndex=0;
		for(;segmentIndex<this._Representation.length;++segmentIndex){
			lastRangeNumber=this._Representation[segmentIndex].
			setRangeAndGetLastNumberInRange(lastRangeNumber);
		}
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
