class Action {
	constructor(name) {
		this.name = name;
		if (name === 'A') {
			this.maxCredit = 20;
		} else if (name === 'B') {
			this.maxCredit = 20;
		} else if (name === 'C') {
			this.maxCredit = 30;
		}

		this.currentCredit = this.maxCredit;
	}

	displayAction() {
		return this;
	}

	// Methode qui permet de calculer la valeur par action
	calculateCredit(maxCredit) {
		const min = 0;
		const max = maxCredit * 0.2;
		const random = Math.floor(Math.random() * (max - min + 1)) + min;
		return random;
	}
}

class User {
	constructor(name, creditTotal = 100) {
		this.name = name;
		this.creditTotal = creditTotal;
		this.actions = [];
	}

	// Methode qui permet de calculer la valeur de toute la queue - Toutes les 24h
	calculateQueueCredit() {
		const array = [...this.actions];
		for (let i = 0; i < array.length; i++) {
			const val = array[i].calculateCredit(array[i].maxCredit);
			this.actions[i].currentCredit = this.actions[i].currentCredit - val;
		}
	}

	// Lorsqu'un utilisateur effectue une action, on réduit le compteur par le nombre d'action ajoutées
	decreaseCreditBy(decreaseBy) {
		return (this.creditTotal = this.creditTotal - decreaseBy);
	}

	// Ajouter une action à la queue
	addActions(actions) {
		actions.map((action) => {
			this.calculateQueueCredit();
			this.decreaseCreditBy(action.length);
			for (let i = 0; i < action[0]; i++) {
				this.actions.push(new Action(action[1]));
			}
		});
	}

	// Afficher la queue
	displayQueue() {
		console.log(`this =>`, this);
		return this.actions.map((action) => action.name);
	}
}

module.exports = { Action, User };
