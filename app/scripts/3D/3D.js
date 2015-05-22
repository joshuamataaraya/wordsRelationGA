var sceneWidth = 600;
var sceneHeight = 500;
var scene, camera, renderer, controls, stats;
var material, theText, text3d, newText, word;
var maxWeight = 0;
var maxDistance = 0;
var maxTotalDistance = 0;
var currentWord = 0;
var colorList = [0xffffff,0xff0000,0x880000,0xffff00,0x00ff00,0x008800,0x00ffff,0x0000ff,0x000088,0x000000];


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
	camera.position.set(sceneWidth/2,sceneHeight/2,800);
	//Scene
	scene = new THREE.Scene();
	//Renderer
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(sceneWidth,sceneHeight);
	container.appendChild( renderer.domElement );
	//Controls
	controls = new THREE.OrbitControls(camera);
	controls.damping = 0.2;
	controls.addEventListener('change', render);
	//Cube
	var geometry = new THREE.BoxGeometry(sceneWidth+200, sceneHeight+200, 1000);
	material = new THREE.MeshLambertMaterial( { color: 0x123456, side: THREE.DoubleSide, vertexColors: THREE.VertexColors } );
	var cube = new THREE.Mesh( geometry, material );
	cube.position.set(sceneWidth/2,sceneHeight/2,500);
	scene.add( cube );
	//light
	var light = new THREE.PointLight( 0x404040, 10, 0);
	light.position.set(sceneWidth/2,sceneHeight/2,500);
	scene.add( light );	
}

//Regla de 3 para los valores x, y, z de las palabras 3D.
function crossMultiplication(pNumber, type){
	switch(type){
		case 1:
			return ((sceneWidth/2)/maxDistance*pNumber);
		case 2:
			return (400/maxTotalDistance*pNumber);
		default:
			return ((sceneWidth/2)/maxWeight*pNumber);
	}
}

//Función que inserta una palabra, designandole la posición, tamaño y color.
function insertWord(pWord, pColor){
	word = pWord;
	theText = word[0];
	text3d = new THREE.TextGeometry(theText,{
		size: crossMultiplication(word[1],0)/5,
		height: 15,
		curveSegments: 15,
		font: "helvetiker"	
	});
	material = new THREE.MeshBasicMaterial({color: pColor});
	newText = new THREE.Mesh(text3d, material);
	newText.position.x = crossMultiplication(word[2],1);
	newText.position.y = crossMultiplication(word[1],0);
	newText.position.z = crossMultiplication(word[3],2);
	scene.add(newText);
}
//Funcion para insertar palabras si estas se dan desde una clase.
///////Cambiar
function insertWordbyClass(pWord, pColor){
	word = pWord;
	console.log(word.getGrade() + " "+ word.getDistance() + " "+ word.getTotalDistance());
	theText = word.Word;
	text3d = new THREE.TextGeometry(theText,{
		size: crossMultiplication(word.getGrade(),0)/200,
		height: 5,
		curveSegments: 15,
		font: "helvetiker"	
	});
	material = new THREE.MeshBasicMaterial({color: pColor});
	newText = new THREE.Mesh(text3d, material);
	newText.position.x = crossMultiplication(word.getDistance(),1);
	newText.position.y = crossMultiplication(word.getGrade(),0);
	newText.position.z = crossMultiplication(word.getTotalDistance(),2);
	scene.add(newText);
}

//Ciclo que va agregando las 10 palabras a la escena.
function addWords(wordArray){
	for(currentWord=0; currentWord<wordArray.length; currentWord++){
		insertWordbyClass(wordArray[currentWord],colorList[currentWord]);
	}
}

//Funcion para sacar los valores máximos de las variables 3D.
//Por medio de Math.max para 10 palabras en el array como listas.
function getMaxValuesV2(wordArray){
	maxWeight = Math.max(wordArray[0][1],wordArray[1][1],wordArray[2][1],wordArray[3][1],wordArray[4][1],wordArray[5][1],wordArray[6][1],wordArray[7][1],wordArray[8][1],wordArray[9][1]);
	maxDistance = Math.max(wordArray[0][2],wordArray[1][2],wordArray[2][2],wordArray[3][2],wordArray[4][2],wordArray[5][2],wordArray[6][2],wordArray[7][2],wordArray[8][2],wordArray[9][2]);
	maxTotalDistance = Math.max(wordArray[0][3],wordArray[1][3],wordArray[2][3],wordArray[3][3],wordArray[4][3],wordArray[5][3],wordArray[6][3],wordArray[7][3],wordArray[8][3],wordArray[9][3]);
	console.log(maxWeight +" "+ maxDistance+" "+ maxTotalDistance);
}
//Por medio de un for para palabras en el array como listas.
function getMaxValues(wordArray){
	for(currentWord=0; currentWord<wordArray.length; currentWord++){
		var tempWord = wordArray[currentWord];
		if(tempWord[1]>maxWeight){
			maxWeight = tempWord[1];
		}
		if(tempWord[2]>maxDistance){
			maxDistance = tempWord[2];
		}
		if(tempWord[3]>maxTotalDistance){
			maxTotalDistance = tempWord[3];
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
	prepare3D();
	prepareWords(wordArray);
	animate();
	render();
}

function test3(){
	wArray = [
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
	create3d(wArray);
}
