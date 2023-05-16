//Riley Rice
//CS 290 Section#: 001
//5/15/2023

//This is the parent class which will be inherited
class SuperHuman {
	constructor(name, powerLevel) {
		this.name = name;
		this.powerLevel = powerLevel;
	}
}

// Define SuperHero and SuperVillain classes here
class SuperHero extends SuperHuman {
	//constructor which uses SuperHuman Constructor
	constructor(name, alias, powerlevel){
		//super calls the parent constructor
		super(name, powerlevel);
		this.alias = alias;
	}

	//battle method which returns true if the hero has a higher 
	//powerLevel than the villian and false otherwise
	battle(superVillan){
		if(this.powerLevel >= superVillan.powerLevel){
			return true;
		}else{
			return false;
		}
	}
}

//This is the supervillian class which inherits the superhuman
//class
class SuperVillain extends SuperHuman{
	constructor(name, alias, powerlevel){
		//uses super to call SuperHuman's constructor
		super(name, powerlevel);
		this.alias = alias;
	}

	//getEvilChuckle method which prints out ha ha ha
	getEvilChuckle(){
		return "Ha ha ha!";
	}
}

const heroes = {
	"Super Bacon": new SuperHero("Jack Oinker", "Super Bacon", 2),
	"Flat-Man": new SuperHero("Peter Pranker", "Flat-Man", 5),
	"Mighty Woman": new SuperHero("Diana Dense", "Mighty Woman", 8),
	"Captain Marvelous": new SuperHero("Carol Hangers", "Captain Marvelous", 9)
};

const villains = {
	"The Jokester": new SuperVillain("Jack Nastier", "The Jokester", 3),
	"Magnet Man": new SuperVillain("Max Eisenhardt", "Magnet Man", 6),
	"Lex Loner": new SuperVillain("Lex Loner", "Lex Loner", 2),
	"Thankos": new SuperVillain("Thankos", "Thankos", 9)
};

registerHandlers();

function registerHandlers() {
	// Detect selection of hero and villain
	document.querySelector("#heroSelect").addEventListener("change", selectionChanged);
	document.querySelector("#villainSelect").addEventListener("change", selectionChanged);

	selectionChanged();
}

function selectionChanged() {
	const selectedHeroValue = document.querySelector("#heroSelect").value;
	const selectedVillainValue = document.querySelector("#villainSelect").value;

	// Get hero and villain selected
	const selectedHero = heroes[selectedHeroValue];
	const selectedVillain = villains[selectedVillainValue];

	let winnerParagraph = document.getElementById('winner');

	// if the battle method returns true then hero
	// won so output it's alias otherwise output the 
	//villian's alias
	if(selectedHero.battle(selectedVillain)){
		winnerParagraph.innerHTML = `Winner: ${selectedHero.alias}!`;
	}else{
		winnerParagraph.innerHTML = `Winner: ${selectedVillain.alias}!`;
	}
}
