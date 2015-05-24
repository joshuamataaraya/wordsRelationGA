var scene, camera, renderer, controls, stats;
var material, theText, text3d, newText, word;
var cameraFOV = 75;
var cameraViewDistance = 2000;
var cameraZPosition = 300;
var rendererClearColor = 0xffffff;
var sceneLength = 600;
var sceneHalfLength = 300;
var boxDepth = 500;
var halfBoxDepth = 250;
var boxColor = 0x123456;
var lightColor = 0x404040;
var lightZDistance = 100;
var lightIntensity = 10;
var currentWord = 0;
var colorList = [0x888888,0xff0000,0x880000,0xffff00,0x00ff00,0x008800,0x00ffff,0x0000ff,0x000088,0x000000];
var wordsList = [];
var avgWeight = (sceneLength-60)/9;
var avgDistance = (sceneLength-100)/10;
var avgTotalDistance = (500-12)/9;

function animate(){
	requestAnimationFrame(animate);
	controls.update();
}

//Crea la escena, camara y el renderizador que se usara para la demostración en 3D.
function prepare3D(){
	var container = document.getElementById("threejs");
	//Camera
	if (!Detector.webgl) Detector.addGetWebGLMessage();
	camera = new THREE.PerspectiveCamera(cameraFOV, sceneLength / sceneLength, 1, cameraViewDistance);
	camera.position.set(0,0,cameraZPosition);
	//Scene
	scene = new THREE.Scene();
	//Renderer
	renderer = new THREE.WebGLRenderer({antialias: false});
	renderer.setClearColor(rendererClearColor);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(sceneLength,sceneLength);
	container.appendChild(renderer.domElement);
	//Controls
	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);
	//Cube
	var geometry = new THREE.BoxGeometry(sceneLength, sceneLength, boxDepth);
	material = new THREE.MeshLambertMaterial( { color: boxColor, side: THREE.BackSide, vertexColors: THREE.VertexColors } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	//light
	var light = new THREE.PointLight(lightColor, lightIntensity, 0);
	light.position.set(0,0,lightZDistance);
	scene.add(light);
}

//Función que inserta una palabra, designandole la posición, tamaño y color.
function insertWord(pWord, pColor){
	word = pWord;
	theText = word.getWord();
	text3d = new THREE.TextGeometry(theText,{
		size: (5*word.getGrade())+15,
		height: word.getGrade()+2,
		curveSegments: 15,
		font: "helvetiker"	
	});
	material = new THREE.MeshBasicMaterial({color: pColor});
	newText = new THREE.Mesh(text3d, material);
	newText.position.x = word.getDistance()*avgDistance-sceneHalfLength;
	newText.position.y = word.getGrade()*avgWeight-sceneHalfLength;
	newText.position.z = word.getTotalDistance()*avgTotalDistance-halfBoxDepth;
	scene.add(newText);
}

//Ciclo que va agregando las 10 palabras a la escena.
function addWords(){
	for(currentWord=0; currentWord<wordList.length; currentWord++){
		insertWord(wordList[currentWord],colorList[currentWord]);
	}
}

//Por medio de un for para palabras en el array como listas.
function mapValues(){
	wordList.sort(function(a,b){return a.getGrade()-b.getGrade()});
	for(currentWord=0; currentWord<wordList.length; currentWord++){
		wordList[currentWord].setGrade(currentWord);
	}
	wordList.sort(function(a,b){return a.getDistance()-b.getDistance()});
	for(currentWord=0; currentWord<wordList.length; currentWord++){
		wordList[currentWord].setDistance(currentWord);
	}
	wordList.sort(function(a,b){return a.getTotalDistance()-b.getTotalDistance()});
	for(currentWord=0; currentWord<wordList.length; currentWord++){
		wordList[currentWord].setTotalDistance(currentWord);
	}
}

//Funcion que llama funciones para buscar los máximos de cada valor necesario y posteriormente inserta las palabras a la escena.
function prepareWords(){
	mapValues();
	addWords();
}

//Funcion que se llama para que se muestre el 3D.
function render() {
	renderer.render(scene, camera);
}

//Funcion que se llama para que se muestre el 3D, la entrada es la lista de las 10 palabras.
function create3d(wordArray){
	container = document.getElementById('textEntry');
	container.parentNode.removeChild(container);
	wordList = wordArray
	prepare3D();
	prepareWords();
	animate();
	render();
}

function arrayTest(){
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
