var WORDS_ZONE_PORCENTAGE = 5;	//this is the porcentage of the zone to analize,
								//it depends of the length of the file inserted.
var ELEMENTS_NUM = 0;
var BITS_TO_USE = 16;
var BIGGEST_NUMBER = Math.pow(2, BITS_TO_USE)-1;
var FIT_PORCENTAGE = 60;
var NUMBER_OF_GENERATIONS = 100;

var CAMERA_FOV = 75;
var CAMERA_VIEW_DISTANCE = 2000;
var CAMERA_Z_POSITION = 300;
var RENDERER_CLEAR_COLOR = 0xffffff;
var SCENE_LENGTH = 600;
var HALF_SCENE_LENGTH = 300;
var BOX_DEPTH = 500;
var HALF_BOX_DEPTH = 250;
var BOX_COLOR = 0x123456;
var LIGHT_COLOR = 0x404040;
var LIGHT_Z_POSITION = 100;
var LIGHT_INTENSITY = 10;
var COLOR_LIST = [0x888888,0xff0000,0x880000,0xffff00,0x00ff00,0x008800,0x00ffff,0x0000ff,0x000088,0x000000];
var AVG_WEIGHT = (SCENE_LENGTH)/9;
var AVG_DISTANCE = (SCENE_LENGTH)/9;
var AVG_TOTAL_DISTANCE = (500)/9;
var CURVE_SEGMENT = 15;
var FONT = "helvetiker";
var THREED_CONTAINER = "threejs";
var TEXT_ENTRY_CONTAINER = "textEntry";
var SIZE_MULTIPLIER = 5;
var BASE_SIZE = 15;
var BASE_HEIGHT = 2;

var equivalences=Class.extend({
	init:function(){
		this._WordsZonePorcentage=20; //this is the porcentage of the zone to analize,
							//it depends of the length of the file inserted.
		this._ElementsNum=0;
		this._bitsToUse=16;
		this._BiggestNumer=Math.pow(2,this._bitsToUse)-1;
		this._FitPorcentage=60;
		this._NumberOfGenerations=100;
	},
	getWordsZonePorcentage:function(){
		return this._WordsZonePorcentage;
	},
	getBiggestNumber:function(){
		return this._BiggestNumer;
	},
	getNumberOfGenerations:function(){
		return this._NumberOfGenerations;
	},
	
	getBitsToUse:function(){
		return this._bitsToUse;
	},
	getSizePerElement:function(){
		return Math.floor(this._BiggestNumer/this._ElementsNum);
	},
	setWordsNum:function(argNum){
		this._ElementsNum=argNum;
	},
	getWordsNum:function(){
		return this._ElementsNum;
	},
	getFitPorcentage:function(){
		return this._FitPorcentage;
	}
});
var equivalences=new equivalences();