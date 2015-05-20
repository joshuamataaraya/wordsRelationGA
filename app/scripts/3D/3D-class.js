var 3D=Class.extend({
	init:function(){
		this.sceneWidth = window.innerWidth;
		this.sceneHeight = window.innerHeight;
		this.maxWeight = 0;
		this.maxDistance = 0;
		this.maxTotalDistance = 0;
		this.currentWord = 0;
		this.colorList = [0xffffff,0xff0000,0x880000,0xffff00,0x00ff00,0x008800,0x00ffff,0x0000ff,0x000088,0x000000];

	},
	animate: function(){
		requestAnimationFrame(animate);
		this.controls.update();
	},

	//Crea la escena, camara y el renderizador que se usara para la demostración en 3D.
	prepare3D: function(){
		this.container = document.createElement("div");
		document.body.appendChild(this.container);

		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
		this.camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 1, 1e7);
		this.camera.position.set(sceneWidth/2,sceneHeight/2,800);
		
		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer( { antialias: false } );
		this.renderer.setClearColor(0x888888);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(sceneWidth,sceneHeight);
		this.container.appendChild( renderer.domElement );

		this.controls = new THREE.OrbitControls(camera);
		this.controls.damping = 0.2;
		this.controls.addEventListener('change', render);
	},

	//Regla de 3 para los valores x, y, z de las palabras 3D.
	crossMultiplication: function(pNumber, type){
		switch(type){
			case 1:
				return ((this.sceneWidth/2)/this.maxDistance*pNumber);
			case 2:
				return (400/this.maxTotalDistance*pNumber);
			default:
				return ((this.sceneWidth/2)/this.maxWeight*pNumber);
		}
	},

	//Función que inserta una palabra, designandole la posición, tamaño y color.
	insertWord: function(pWord, pColor){
		this.word = pWord;
		this.theText = word[0];
		this.text3d = new THREE.TextGeometry(theText,{
			size: crossMultiplication(word[1],0)/5,
			height: 15,
			curveSegments: 15,
			font: "helvetiker"	
		});
		this.material = new THREE.MeshBasicMaterial({color: pColor});
		this.newText = new THREE.Mesh(text3d, material);
		this.newText.position.x = crossMultiplication(word[2],1);
		this.newText.position.y = crossMultiplication(word[1],0);
		this.newText.position.z = crossMultiplication(word[3],2);
		this.scene.add(newText);
	},

	//Ciclo que va agregando las palabras de la lista a la escena.
	addWords: function(wordArray){
		for(this.currentWord=0; this.currentWord<wordArray.length; this.currentWord++){
			this.insertWord(wordArray[this.currentWord],this.colorList[this.currentWord]);
		}
	},

	//Funcion para sacar los valores máximos de las variables 3D.
	//Por medio de un for para palabras en el array como listas.
	getMaxValues: function(wordArray){
		for(this.currentWord=0; this.currentWord<wordArray.length; this.currentWord++){
			var tempWord = wordArray[this.currentWord];
			if(tempWord[1]>this.maxWeight){
				this.maxWeight = tempWord[1];
			}
			if(tempWord[2]>this.maxDistance){
				this.maxDistance = tempWord[2];
			}
			if(tempWord[3]>this.maxTotalDistance){
				this.maxTotalDistance = tempWord[3];
			}
		}
	},

	//Funcion que llama funciones para buscar los máximos de cada valor necesario y posteriormente inserta las palabras a la escena.
	prepareWords: function(wordArray){
		this.getMaxValues(wordArray);
		this.addWords(wordArray);
	},

	//Funcion que se llama para que se muestre el 3D.
	render: function(){
		this.renderer.render(this.scene, this.camera);
	},

	//Funcion que se llama para que se muestre el 3D, la entrada es la lista de las 10 palabras.
	start3D: function(wordArray){
		this.prepare3D();
		this.prepareWords(wordArray);
		this.animate();
		this.render();
	}
});


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
var 3JS = new 3D();
3JS.create3d(wArray);