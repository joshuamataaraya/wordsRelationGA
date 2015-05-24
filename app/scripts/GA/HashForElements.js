HashForElements=Class.extend({
	createHash:function(argElements,argCriteria){
		switch(argCriteria){
			case "Segment":
				var criteriaFunction=function(element){
					return hashRepresentation.getSegment(
						element.getID());
				};
				break;
			case "Distance":
				var criteriaFunction=function(element){
					return element.getDistance();
				};
				break;
		}
		var elementsByCriteria=[];
		var elementIndex=0;
		for(;elementIndex<=argElements.length-1;++elementIndex){
			var criteria=criteriaFunction(argElements[elementIndex]);
			if(elementsByCriteria[criteria]!=undefined){
				elementsByCriteria[criteria].push(argElements[elementIndex]);
			}else{
				elementsByCriteria[criteria]=[argElements[elementIndex]];
			}
		}
		return elementsByCriteria;
	}
});
hashForElements=new HashForElements();