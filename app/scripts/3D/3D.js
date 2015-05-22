var sceneWidth = 600;
var sceneHeight = 500;
var scene, camera, renderer, controls, stats;
var material, theText, text3d, newText, word;
var maxWeight = 0;
var maxDistance = 0;
var maxTotalDistance = 0;
var currentWord = 0;
var colorList = [0x888888,0xff0000,0x880000,0xffff00,0x00ff00,0x008800,0x00ffff,0x0000ff,0x000088,0x000000];
//var container = document.getElementById("threejs");

function animate(){
	requestAnimationFrame(animate);
	controls.update();
}

//Crea la escena, camara y el renderizador que se usara para la demostración en 3D.
function prepare3D(){
	var container = document.getElementById("threejs");
	//Camera
	if (!Detector.webgl) Detector.addGetWebGLMessage();
	camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 1, 1e7);
	camera.position.set(0,0,800);
	//Scene
	scene = new THREE.Scene();
	//Renderer
	renderer = new THREE.WebGLRenderer({antialias: false } );
	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(sceneWidth,sceneHeight);
	container.appendChild( renderer.domElement );
	//Controls
	controls = new THREE.OrbitControls(camera);
	controls.damping = 0.2;
	controls.addEventListener('change', render);
	controls.maxPolarAngle=(Math.PI/2);
	controls.noPan=true;
	controls.maxDistance=500;
	//Cube
	var geometry = new THREE.BoxGeometry(sceneWidth*2, sceneHeight*2, 1000);
	material = new THREE.MeshLambertMaterial( { color: 0x123456, side: THREE.DoubleSide, vertexColors: THREE.VertexColors } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set(0,0,0);
	scene.add( cube );
	//light
	var light = new THREE.PointLight( 0x404040, 10, 0);
	light.position.set(0,0,200);
	scene.add( light );
}

//Regla de 3 para los valores x, y, z de las palabras 3D.
function crossMultiplication(pNumber, type){
	switch(type){
		case 1:
			return ((sceneWidth/2)/maxDistance*pNumber);
		case 2:
			return (200/maxTotalDistance*pNumber);
		default:
			return ((sceneWidth/2)/maxWeight*pNumber);
	}
}

//Función que inserta una palabra, designandole la posición, tamaño y color.
function insertWord(pWord, pColor){
	word = pWord;
	theText = word.getWord();
	text3d = new THREE.TextGeometry(theText,{
		size: crossMultiplication(word.getGrade(),0)/(sceneWidth/100),
		height: 2,
		curveSegments: 15,
		font: "helvetiker"	
	});
	material = new THREE.MeshBasicMaterial({color: pColor});
	newText = new THREE.Mesh(text3d, material);
	newText.position.x = crossMultiplication(word.getDistance(),1)-sceneWidth/2;
	newText.position.y = crossMultiplication(word.getGrade(),0)-sceneHeight/2;
	newText.position.z = crossMultiplication(word.getTotalDistance(),2);
	scene.add(newText);
}

//Ciclo que va agregando las 10 palabras a la escena.
function addWords(wordArray){
	for(currentWord=0; currentWord<wordArray.length; currentWord++){
		insertWord(wordArray[currentWord],colorList[currentWord]);
	}
}

//Por medio de un for para palabras en el array como listas.
function getMaxValues(wordArray){
	for(currentWord=0; currentWord<wordArray.length; currentWord++){
		var tempWord = wordArray[currentWord];
		if(tempWord.getGrade()>maxWeight){
			maxWeight = tempWord.getGrade();
		}
		if(tempWord.getDistance()>maxDistance){
			maxDistance = tempWord.getDistance();
		}
		if(tempWord.getTotalDistance()>maxTotalDistance){
			maxTotalDistance = tempWord.getTotalDistance();
		}
	}
}

//Funcion que llama funciones para buscar los máximos de cada valor necesario y posteriormente inserta las palabras a la escena.
function prepareWords(wordArray){
	getMaxValues(wordArray);
	addWords(wordArray);
}

//Funcion que se llama para que se muestre el 3D.
function render() {
	renderer.render(scene, camera);
}

//Funcion que se llama para que se muestre el 3D, la entrada es la lista de las 10 palabras.
function create3d(wordArray){	
	container = document.getElementById('textEntry');
	container.parentNode.removeChild(container);
	prepare3D();
	prepareWords(wordArray);
	animate();
	render();
}

function test3(){
	wArray = [
	['casa',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['perro',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['verde',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['canto',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['Josefina',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['prueba',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['nota',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['palabra',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['persona',Math.random(200,500),Math.random(1,500),Math.random(1,500)],
	['vecino',Math.random(200,500),Math.random(1,500),Math.random(1,500)]];
	create3d(wArray);
}
