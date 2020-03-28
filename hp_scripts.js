var newGameBtn = document.getElementById("restart");
var easyComplexityBtn = document.getElementById("easy");
var hardComplexityBtn = document.getElementById("hard");
var content = document.getElementById("content");
var choosenComplexity = "hard";
var correctColorIndex;

newGameBtn.addEventListener("mouseenter", function() {
	toggleHighlight(newGameBtn);
});
newGameBtn.addEventListener("mouseleave", function() {
	toggleHighlight(newGameBtn);
})

easyComplexityBtn.addEventListener("click", function() {
	onComplexityChosen("easy");
	populateCards();
	if(hardComplexityBtn.classList.contains("selected"))
		toggleHighlight(hardComplexityBtn);
})
hardComplexityBtn.addEventListener("click", function() {
	onComplexityChosen("hard");
	populateCards();
	if(easyComplexityBtn.classList.contains("selected"))
		toggleHighlight(easyComplexityBtn);
})
newGameBtn.addEventListener("click", function() {
	populateCards();
})

easyComplexityBtn.addEventListener("mouseenter", function() {
	if(choosenComplexity === "hard")
		toggleHighlight(easyComplexityBtn);
});
easyComplexityBtn.addEventListener("mouseleave", function() {
	if(choosenComplexity === "hard")
		toggleHighlight(easyComplexityBtn);
});

hardComplexityBtn.addEventListener("mouseenter", function() {
	if(choosenComplexity !== "hard")
		toggleHighlight(hardComplexityBtn);
});
hardComplexityBtn.addEventListener("mouseleave", function() {
	if(choosenComplexity !== "hard")
		toggleHighlight(hardComplexityBtn);
});

populateCards();


function toggleHighlight(element) {
	element.classList.toggle("selected");
}

function onComplexityChosen(complexity) {
	choosenComplexity = complexity;
}

function populateCards() {
	clearBlock(content);
	choosenComplexity === "hard" ? populate(6) : populate(3);
	chooseCorrectItem();
}

function clearBlock(block){
	var child = block.lastElementChild;  
    while (child) { 
    	block.removeChild(child); 
    	child = block.lastElementChild; 
    } 
}

function populate(count) {
	for(var i = 0; i < count; i ++){
		content.appendChild(createColorCard());
	}
}

function createColorCard() {
	var newElement = document.createElement("div");
	newElement.classList.add("color_item");
	newElement.style.backgroundColor = generateRGBcolor();
	newElement.addEventListener("click", function(){
		if(content.children[correctColorIndex] === this){
			alert("correct");
			populateCards();
		} else {
			newElement.classList.add("hide");
		}
	})
	return newElement;
}

function generateRGBcolor(){
	return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")"
}

function random(max){
	let rand = 1 - 0.5 + Math.random() * (max - 1 + 1);
	return Math.round(rand);
}

function chooseCorrectItem(){
	correctColorIndex = random(content.childElementCount-1);
	document.getElementById("selected_color").innerHTML = content.childNodes[correctColorIndex].style.backgroundColor;
}