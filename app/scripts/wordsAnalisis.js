var analize=function(argText,argPhrase){
	var wordsList=changeToArray(argText);
	wordsList=cleanTwoLettersWords(wordsList);
	
	var phraseList=changeToArray(argPhrase);
	phraseList=cleanTwoLettersWords(phraseList);
	
	var phraseInitialPos=searchPhrasePos(wordsList,phraseList)
	console.log(phraseList)
	if(phraseInitialPos>=0){
		console.log(phraseInitialPos)
	}else{
		alert("Phrase not found!")
	}
}
var changeToArray=function(argText){
	return argText.split(/[\s,,,.,\n,?,¿,:,...,-,(,),;,�,-]+/);
}
var cleanTwoLettersWords=function(argWordsArray){
	var indexWordsArray=0;
	for (;indexWordsArray<=argWordsArray.length-1;++indexWordsArray){
		if(argWordsArray[indexWordsArray].length<3){
			argWordsArray.splice(indexWordsArray, 1);
			indexWordsArray--;
		}
	}
	return argWordsArray;
}
var searchPhrasePos=function(wordsList,phraseList){
	var wordsIndex;
	var phrasePosition;
	var phraseIndex;

	for(wordsIndex=0,phrasePosition=0;
		wordsIndex<=wordsList.length-1;
		++wordsIndex){
		if(wordsList[wordsIndex]==phraseList[0]){
			phrasePosition=wordsIndex;
			for(phraseIndex=0;phraseIndex<=phraseList.length-1;
				++phraseIndex,++wordsIndex){
				if(phraseList[phraseIndex]!=wordsList[wordsIndex]){
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
}