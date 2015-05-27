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
		if(ID<0){
			segment=this._RepresentationList[0].getNumberID();
			solution=true; 
		}
		while(!solution){
			if(this._RepresentationList[index].getRange()[0]>ID){
				max=index;
				index=min+Math.floor((max-min)/2);
			}else if(this._RepresentationList[index].getRange()[1]<ID){
				min=index;
				index=min+Math.floor((max-min)/2);
			}else{
				segment=this._RepresentationList[index].getNumberID();
				solution=true;
			}

		}
		return segment;
	}
});
var hashRepresentation=new hashForRepresentation(); //its a global hash table.
var hashGradeRepresentation=new hashForRepresentation();
var hashDistanceRepresentation=new hashForRepresentation();