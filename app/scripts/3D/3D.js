var sceneWidth = 600;
var sceneHeight = 600;
var scene, camera, renderer, controls, stats;
var material, theText, text3d, newText, word;
var maxWeight = 0;
var maxDistance = 0;
var maxTotalDistance = 0;
var currentWord = 0;
var colorList = [0x888888,0xff0000,0x880000,0xffff00,0x00ff00,0x008800,0x00ffff,0x0000ff,0x000088,0x000000];
var wordsList;
var avgWeight = (sceneHeight-60)/9;
var avgDistance = (sceneWidth-100)/10;
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
	camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 1, 1e7);
	camera.position.set(0,0,300);
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
	controls.addEventListener('change', render);
	//Cube
	var geometry = new THREE.BoxGeometry(sceneWidth, sceneHeight, 500);
	material = new THREE.MeshLambertMaterial( { color: 0x123456, side: THREE.BackSide, vertexColors: THREE.VertexColors } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set(0,0,0);
	scene.add( cube );
	//light
	var light = new THREE.PointLight( 0x404040, 10, 0);
	light.position.set(0,0,100);
	scene.add( light );
}

//Regla de 3 para los valores x, y, z de las palabras 3D.
/*function crossMultiplication(pNumber, type){
	switch(type){
		case 1:
			return ((sceneWidth/2)/maxDistance*pNumber);
		case 2:
			return (200/maxTotalDistance*pNumber);
		default:
			return ((sceneWidth/2)/maxWeight*pNumber);
	}
}*/

//Función que inserta una palabra, designandole la posición, tamaño y color.
function insertWord(pWord, pColor){
	word = pWord;
	console.log( word.getGrade() + " "+word.getDistance()+" "+word.getTotalDistance());
	console.log(((5*word.getGrade())+15)+" "+(word.getDistance()*avgDistance)+" "+(word.getTotalDistance()*avgTotalDistance-250));
	theText = word.getWord();
	text3d = new THREE.TextGeometry(theText,{
		size: (5*word.getGrade())+15,//crossMultiplication(word.getGrade(),0)/(sceneWidth/100),
		height: word.getGrade()+2,
		curveSegments: 15,
		font: "helvetiker"	
	});
	material = new THREE.MeshBasicMaterial({color: pColor});
	newText = new THREE.Mesh(text3d, material);
	newText.position.x = word.getDistance()*avgDistance-sceneWidth/2;//crossMultiplication(word.getDistance(),1)-sceneWidth/2;
	newText.position.y = word.getGrade()*avgWeight-sceneHeight/2; //crossMultiplication(word.getGrade(),0)-sceneHeight/2;
	newText.position.z = word.getTotalDistance()*avgTotalDistance-250; //crossMultiplication(word.getTotalDistance(),2);
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
	console.log(avgWeight+" "+avgDistance+" "+avgTotalDistance);
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
