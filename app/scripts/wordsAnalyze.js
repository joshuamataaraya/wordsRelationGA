var Analizer =Class.extend({
	init: function(argText,argPhrase){
		this.text=argText;
		this.phrase=argPhrase;
		this.phraseInitialPos=0;

	},
	getTextArray:function(){
		return this.text;
	},
	selectZoneToAnalize:function(agrPhraseInitialPos){
		this.cleanTextAndPhrase();
		this.setInitialPhrasePos();
		var zoneToAnalize=[]; //store the words to analize
		var largeFromThePhrase=(this.text.length*equivalences.getWordsZonePorcentage())/100;
		var insertedCounter=largeFromThePhrase
		var wordIndex=this.phraseInitialPos;
		for(;insertedCounter>0 && wordIndex>=0;--insertedCounter,--wordIndex){
			zoneToAnalize.push(this.text[wordIndex]);
		}
		insertedCounter=largeFromThePhrase;
		wordIndex=this.phraseInitialPos+1;
		for(;insertedCounter>0 && wordIndex<=this.text.length-1;--insertedCounter,++wordIndex){
			zoneToAnalize.push(this.text[wordIndex]);
		}
		return zoneToAnalize;
	},
	cleanTextAndPhrase:function(){
	//this also change the phrase and the text into a list 
		this.text=this.changeToArray(this.text);
		this.text=this.cleanTwoLettersWords(this.text);

		this.phrase=this.changeToArray(this.phrase);
		this.phrase=this.cleanTwoLettersWords(this.phrase);
	},
	setInitialPhrasePos:function(){
		this.phraseInitialPos=this.searchPhrasePos()
		if(this.phraseInitialPos<0){
			alert("Phrase not found!")
		}
	},
	changeToArray:function(argText){
		return argText.split(/[\s,,,.,\n,?,¿,:,...,-,(,),;,�,","]+/);
	},
	cleanTwoLettersWords:function(argWordsArray){
		var indexWordsArray=0;
		for (;indexWordsArray<=argWordsArray.length-1;++indexWordsArray){
			if(argWordsArray[indexWordsArray].length<=3){
				argWordsArray.splice(indexWordsArray, 1);
				indexWordsArray--;
			}
		}
		return argWordsArray;
	},
	searchPhrasePos:function(){
		var wordsIndex;
		var phrasePosition;
		var phraseIndex;

		for(wordsIndex=0,phrasePosition=0;
			wordsIndex<=this.text.length-1;
			++wordsIndex){
			if(this.text[wordsIndex]==this.phrase[0]){
				phrasePosition=wordsIndex;
				for(phraseIndex=0;phraseIndex<=this.phrase.length-1;
					++phraseIndex,++wordsIndex){
					if(this.phrase[phraseIndex]!=this.text[wordsIndex]){
						phrasePosition=0
						break;
					}
				}
				if(phrasePosition!=0){
					return phrasePosition;
				}
			}
		}
		return -1; //not found indication
	},
	

});