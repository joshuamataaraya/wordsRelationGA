var readFile=function(argFileInputId,argTextAreaId){
	var control = document.getElementById(argFileInputId);
	control.addEventListener("change",
		function(event) {
			reader.readAsText(control.files[0]);
		},false);
	var reader = new FileReader();
	reader.onload = function(event){
	    var contents = event.target.result;
	    var textArea=document.getElementById(argTextAreaId);
	    textArea.innerHTML = contents;
	};
	reader.onerror = function(event){
	    console.error("File could not be read! Code " + event.target.error.code);
	};
}
