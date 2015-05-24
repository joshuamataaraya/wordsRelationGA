var _Controls, _Camera, _Renderer, _Scene;
var ThreeJS=Class.extend({
	init:function(){
		this._CameraFOV = 75;
		this._CameraViewDistance = 2000;
		this._CameraZPosition = 300;
		this._RendererClearColor = 0xffffff;
		this._SceneLength = 600;
		this._HalfSceneLength = 300;
		this._BoxDepth = 500;
		this._HalfBoxDepth = 250;
		this._BoxColor = 0x123456;
		this._LightColor = 0x404040;
		this._LightZDistance = 100;
		this._LightIntensity = 10;
		this._ColorList = [0x888888,0xff0000,0x880000,0xffff00,0x00ff00,0x008800,0x00ffff,0x0000ff,0x000088,0x000000];
		this._WordList = [];
		this._AvgWeight = (this._SceneLength)/9;
		this._AvgDistance = (this._SceneLength)/9;
		this._AvgTotalDistance = (500)/9;
		this._CurveSegment = 15;
		this._Font = "helvetiker";
		this._3dContainer = "threejs";
		this._TextEntry = "textEntry";
		this._SizeMultiplier = 5;
		this._BaseSize = 15;
		this._BaseHeight = 2;
	},
	animate: function(){
		requestAnimationFrame(this.animate);
		_Controls.update();
	},

	//Crea la escena, camara y el renderizador que se usara para la demostración en 3D.
	prepare3D: function(){
		this._Container = document.getElementById(this._3dContainer);
		if (!Detector.webgl) Detector.addGetWebGLMessage();
		_Camera = new THREE.PerspectiveCamera(this._CameraFOV, this._SceneLength / this._SceneLength, 1, this._CameraViewDistance);
		_Camera.position.set(0,0,this._CameraZPosition);
		_Scene = new THREE.Scene();
		_Renderer = new THREE.WebGLRenderer({antialias: false});
		_Renderer.setClearColor(this._RendererClearColor);
		_Renderer.setPixelRatio(window.devicePixelRatio);
		_Renderer.setSize(this._SceneLength,this._SceneLength);
		this._Container.appendChild(_Renderer.domElement);
		_Controls = new THREE.OrbitControls(_Camera);
		_Controls.addEventListener('change', this.render);
		var _geometry = new THREE.BoxGeometry(this._SceneLength, this._SceneLength, this._BoxDepth);
		var _material = new THREE.MeshLambertMaterial({color: this._BoxColor, side: THREE.BackSide, vertexColors: THREE.VertexColors});
		var _cube = new THREE.Mesh(_geometry, _material);
		_Scene.add(_cube);
		var _light = new THREE.PointLight(this._LightColor, this._LightIntensity, 0);
		_light.position.set(0,0,this._LightZDistance);
		_Scene.add(_light);
	},

	//Función que inserta una palabra, designandole la posición, tamaño y color.
	insertWord: function(pWord, pColor){
		var _word = pWord;
		var _theText = _word.getWord();
		var _text3d = new THREE.TextGeometry(_theText,{
			size: (this._SizeMultiplier*_word.getGrade())+this._BaseSize,
			height: _word.getGrade()+this._BaseHeight,
			curveSegments: this._CurveSegment,
			font: this._Font	
		});
		var _material = new THREE.MeshBasicMaterial({color: pColor});
		var _newText = new THREE.Mesh(_text3d, _material);
		_newText.position.x = _word.getDistance()*this._AvgDistance-this._HalfSceneLength;
		_newText.position.y = _word.getGrade()*this._AvgWeight-this._HalfSceneLength;
		_newText.position.z = _word.getTotalDistance()*this._AvgTotalDistance-this._HalfBoxDepth;
		var _boundingVector = new THREE.Box3().setFromObject(_newText);
		var _boundingArray = _boundingVector.max.toArray();
		if(_boundingArray[0]>this._HalfSceneLength){
			_newText.position.x-= (_boundingArray[0]-this._HalfSceneLength);
		}
		if(_boundingArray[1]>this._HalfSceneLength){
			_newText.position.y -= (_boundingArray[1]-this._HalfSceneLength);
		}
		if(_boundingArray[2]>this._HalfBoxDepth){
			_newText.position.z -= (_boundingArray[2]-this._HalfBoxDepth);
		}
		_Scene.add(_newText);
	},

	//Ciclo que va agregando las palabras de la lista a la escena.
	addWords: function(){
		for(var _currentWord=0; _currentWord<this._WordList.length; _currentWord++){
			this.insertWord(this._WordList[_currentWord],this._ColorList[_currentWord]);
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
	start3D: function(pWordArray){
		this._Container = document.getElementById(this._TextEntry);
		this._Container.parentNode.removeChild(this._Container);
		this._WordList = pWordArray;
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


