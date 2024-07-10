class Personaje {
    #nombre;
    #fuerza;
    #messageElement;

    constructor(nombre, fuerza, messageElement) {
        this.#nombre = nombre;
        this.#fuerza = fuerza;
        this.#messageElement = messageElement;
    }

    presentarse() {
        this.#messageElement.innerHTML += `<p>${this.#nombre} se ha presentado.</p>`;
    }

    getNombre() {
        return this.#nombre;
    }

    getFuerza() {
        return this.#fuerza;
    }

    setFuerza(nuevaFuerza) {
        this.#fuerza = nuevaFuerza;
    }

    addMessage(message) {
        this.#messageElement.innerHTML += `<p>${message}</p>`;
    }
}

class Jedi extends Personaje {
    usarFuerza() {
        this.addMessage(`${this.getNombre()} está utilizando la Fuerza para proteger la galaxia.`);
    }

    entrenar() {
        this.setFuerza(this.getFuerza() + 10);
        this.addMessage(`${this.getNombre()} ha entrenado y ahora tiene un nivel de fuerza de ${this.getFuerza()}.`);
    }
}

class Sith extends Personaje {
    usarFuerza() {
        this.addMessage(`${this.getNombre()} está utilizando la Fuerza para conquistar la galaxia.`);
    }

    corromper() {
        this.setFuerza(this.getFuerza() - 5);
        this.addMessage(`${this.getNombre()} ha sido corrompido y ahora tiene un nivel de fuerza de ${this.getFuerza()}.`);
    }
}

class MaestroJedi extends Jedi {
    enseñar() {
        this.setFuerza(this.getFuerza() + 20);
        this.addMessage(`${this.getNombre()} ha enseñado y ahora tiene un nivel de fuerza de ${this.getFuerza()}.`);
    }
}

const yoda = new MaestroJedi('Yoda', 100, document.getElementById('yoda-messages'));
const darthVader = new Sith('Darth Vader', 150, document.getElementById('darth-vader-messages'));

document.getElementById('yoda-presentarse').addEventListener('click', () => {
    yoda.presentarse();
});

document.getElementById('yoda-usar-fuerza').addEventListener('click', () => {
    yoda.usarFuerza();
});

document.getElementById('yoda-entrenar').addEventListener('click', () => {
    yoda.entrenar();
});

document.getElementById('yoda-ensenar').addEventListener('click', () => {
    yoda.enseñar();
});

document.getElementById('darth-vader-presentarse').addEventListener('click', () => {
    darthVader.presentarse();
});

document.getElementById('darth-vader-usar-fuerza').addEventListener('click', () => {
    darthVader.usarFuerza();
});

document.getElementById('darth-vader-corromper').addEventListener('click', () => {
    darthVader.corromper();
});

document.getElementById('batalla').addEventListener('click', () => {
    batalla(yoda, darthVader);
});

function batalla(personaje1, personaje2) {
    const battleMessages = document.getElementById('battle-messages');
    battleMessages.innerHTML += `<p>La batalla entre ${personaje1.getNombre()} y ${personaje2.getNombre()} ha comenzado.</p>`;

    let logs = [];

    while (personaje1.getFuerza() > 0 && personaje2.getFuerza() > 0) {
        logs.push(`${personaje1.getNombre()} está utilizando la Fuerza.`);
        logs.push(`${personaje2.getNombre()} está utilizando la Fuerza.`);

        if (personaje1.getFuerza() > personaje2.getFuerza()) {
            personaje2.setFuerza(personaje2.getFuerza() - 10);
            logs.push(`${personaje1.getNombre()} ha atacado a ${personaje2.getNombre()} y le ha quitado 10 puntos de fuerza.`);
        } else {
            personaje1.setFuerza(personaje1.getFuerza() - 10);
            logs.push(`${personaje2.getNombre()} ha atacado a ${personaje1.getNombre()} y le ha quitado 10 puntos de fuerza.`);
        }
    }

    if (personaje1.getFuerza() > 0) {
        logs.push(`${personaje1.getNombre()} ha ganado la batalla.`);
    } else {
        logs.push(`${personaje2.getNombre()} ha ganado la batalla.`);
    }

    // Mostrar todos los logs de la batalla de una vez
    logs.forEach(log => {
        battleMessages.innerHTML += `<p>${log}</p>`;
    });
}
