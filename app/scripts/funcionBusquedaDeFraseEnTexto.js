//Función vieja. Trabaja el texto y la frase como arrays de palabras.
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

//Función nueva, trabaja el texto y la frase como strings.
//Si la mandamos a llamar antes de transformar los textos a arrays me parece que esto funciona.
//Como todas son funciones de javascript me parece que es un O(c)
searchPhrasePosV2(){
	if(this.text.search(this.phrase)>=0){
		return this.text.slice(0,this.text.search(this.phrase)).match(/ /g).length;
	}else{
		return -1;
	}
}
//Versión más limpia
searchPhrasePosClean(){
	var search = this.text.search(this.phrase);
	if(search>=0){
		var slice = this.text.slice(0,search);
		var match = slice.match(/ /g);
		return match.length;
	}else{
		return search;
	}
}