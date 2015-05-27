var _Controls, _Camera, _Renderer, _Scene;
var ThreeJS=Class.extend({
	init:function(pWordArray){
		this._WordList = pWordArray;
		this._Container = document.getElementById(TEXT_ENTRY_CONTAINER);
	},
	animate: function(){
		_Controls.update();
	},

	//Crea la escena, camara y el renderizador que se usara para la demostración en 3D.
	prepare3D: function(){
		this._Container = document.getElementById(THREED_CONTAINER);
		if (!Detector.webgl) Detector.addGetWebGLMessage();
		_Camera = new THREE.PerspectiveCamera(CAMERA_FOV, SCENE_LENGTH / SCENE_LENGTH, 1, CAMERA_VIEW_DISTANCE);
		_Camera.position.set(0,0,CAMERA_Z_POSITION);
		_Scene = new THREE.Scene();
		_Renderer = new THREE.WebGLRenderer({antialias: false});
		_Renderer.setClearColor(RENDERER_CLEAR_COLOR);
		_Renderer.setPixelRatio(window.devicePixelRatio);
		_Renderer.setSize(SCENE_LENGTH,SCENE_LENGTH);
		this._Container.appendChild(_Renderer.domElement);
		_Controls = new THREE.OrbitControls(_Camera);
		_Controls.addEventListener('change', this.render);
		var _geometry = new THREE.BoxGeometry(SCENE_LENGTH, SCENE_LENGTH, BOX_DEPTH);
		var _material = new THREE.MeshLambertMaterial({color: BOX_COLOR, side: THREE.BackSide, vertexColors: THREE.VertexColors});
		var _cube = new THREE.Mesh(_geometry, _material);
		_Scene.add(_cube);
		var _light = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY, 0);
		_light.position.set(0,0,LIGHT_Z_POSITION);
		_Scene.add(_light);
	},

	//Función que inserta una palabra, designandole la posición, tamaño y color.
	insertWord: function(pWord, pColor){
		var _word = pWord;
		var _theText = _word.getWord();
		var _text3d = new THREE.TextGeometry(_theText,{
			size: (SIZE_MULTIPLIER*_word.getGrade())+BASE_SIZE,
			height: _word.getGrade()+BASE_HEIGHT,
			curveSegments: CURVE_SEGMENT,
			font: FONT
		});
		var _material = new THREE.MeshBasicMaterial({color: pColor});
		var _newText = new THREE.Mesh(_text3d, _material);
		_newText.position.x = _word.getDistance()*AVG_DISTANCE-HALF_SCENE_LENGTH;
		_newText.position.y = _word.getGrade()*AVG_WEIGHT-HALF_SCENE_LENGTH;
		_newText.position.z = _word.getTotalDistance()*AVG_TOTAL_DISTANCE-HALF_BOX_DEPTH;
		var _boundingVector = new THREE.Box3().setFromObject(_newText);
		var _boundingArray = _boundingVector.max.toArray();
		if(_boundingArray[0]>HALF_SCENE_LENGTH){
			_newText.position.x-= (_boundingArray[0]-HALF_SCENE_LENGTH);
		}
		if(_boundingArray[1]>HALF_SCENE_LENGTH){
			_newText.position.y -= (_boundingArray[1]-HALF_SCENE_LENGTH);
		}
		if(_boundingArray[2]>HALF_SCENE_LENGTH){
			_newText.position.z -= (_boundingArray[2]-HALF_SCENE_LENGTH);
		}
		_Scene.add(_newText);
	},

	//Ciclo que va agregando las palabras de la lista a la escena.
	addWords: function(){
		for(var _currentWord=0; _currentWord<this._WordList.length; _currentWord++){
			this.insertWord(this._WordList[_currentWord],COLOR_LIST[_currentWord]);
		}
	},

	//Funcion para sacar los valores máximos de las variables 3D.
	//Por medio de un for para palabras en el array como listas.
	mapValues: function(){
		var _currentWord;
		this._WordList.sort(function(a,b){return a.getDistance()-b.getDistance()});
		for(_currentWord=0; _currentWord<this._WordList.length; _currentWord++){
			this._WordList[_currentWord].setDistance(_currentWord);
		}
		this._WordList.sort(function(a,b){return a.getTotalDistance()-b.getTotalDistance()});
		for(_currentWord=0; _currentWord<this._WordList.length; _currentWord++){
			this._WordList[_currentWord].setTotalDistance(_currentWord);
		}
		this._WordList.sort(function(a,b){return a.getGrade()-b.getGrade()});
		for(_currentWord=0; _currentWord<this._WordList.length; _currentWord++){
			this._WordList[_currentWord].setGrade(_currentWord);
		}
	},

	//Funcion que llama funciones para buscar los máximos de cada valor necesario y posteriormente inserta las palabras a la escena.
	prepareWords: function(){
		this.mapValues();
		this.addWords();
	},

	//Funcion que se llama para que se muestre el 3D.
	render: function(){
		_Renderer.render(_Scene, _Camera);
	},

	//Funcion que se llama para que se muestre el 3D, la entrada es la lista de las 10 palabras.
	start3D: function(){
		this._Container.parentNode.removeChild(this._Container);
		this.prepare3D();
		this.prepareWords();
		this.animate();
		this.render();
	},

	test: function(){
		var wArray = [
		['casa',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['perro',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['verde',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['canto',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['Josefina',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['prueba',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['nota',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['palabra',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['persona',Math.random(1,500),Math.random(1,500),Math.random(1,500)],
		['vecino',Math.random(1,500),Math.random(1,500),Math.random(1,500)]];
		this.start3D(wArray);
	}
});


