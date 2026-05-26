const urlParams = new URLSearchParams(window.location.search);
const year = document.querySelector('#year');
let oldYear = hydrate((parseInt(urlParams.get('newYear')) - 1) + '' );
let newYear = hydrate(urlParams.get('newYear'));

// Helper :string -> array[numbers]
function hydrate(str){
    let tab = [];
    for (let i = 0; i < str.length; i++) {
        tab.push(parseFloat(str[i]));
    }
    return tab;
}
class Letter {
    block = document.createElement('div');
    contentElt = document.createElement('div');
    contentVal = document.createElement('div');
    constructor (elt, value) {
        this.contentElt.appendChild(elt);
        this.contentVal.innerText = value;
        this.block.className = 'letter'
        this.block.append(this.contentVal, this.contentElt)
    }

    insererDans(elt) {
        elt.appendChild(this.block);
    }
}


class Ballon {
    props = {
        boule : {
            h : '75px',
            w : '70px',
            bgColor : 'aqua',
        },
        fil : {
            h : '90px',
            w : '2px',
            bgColor : 'gray',
        }
    };

    boule = document.createElement('div');
    fil = document.createElement('div');
    ballon = document.createElement('div');
    constructor (props=this.props) {
        this.props = props;
        this.boule.className = 'boule';
        this.boule.style.height = props.boule.h;
        this.boule.style.width = props.boule.w;
        this.boule.style.background = props.boule.bgColor;

        this.fil.className = 'fil'
        this.fil.style.height = props.fil.h;
        this.fil.style.width = props.fil.w;
        this.fil.style.background = props.fil.bgColor;
        this.ballon.className ='ballon';
        this.ballon.append(this.boule, this.fil)
    }

    insererDans(elt) {
        elt.appendChild(this.ballon);
    }

    getBall () {
        return this.ballon;
    }

    static deplacer (elt, x=0, y=0) {
        elt.style.transform = `translate(${x}px, ${y}px)`;
    }
}

// Determiner lindice du chiffre de difference
const difference = (ar1, ar2) => {
    let dif = [];
    for (let i = 0; i < ar1.length; i++)
        if (ar1[i] !== ar2[i]) dif += [i]; 
    
    return dif;
}

const DIF = difference(oldYear, newYear);

oldYear.forEach((y, i) => {
    if (DIF.includes(i)) {
        let ballon = new Ballon();
        let letter = new Letter(ballon.getBall(), y);
        letter.insererDans(year);
    } else {
        let letter = new Letter(document.createElement('div'), y);
        letter.insererDans(year);
    }
});

const ballon = document.querySelector('.ballon');
const boule = document.querySelector('.boule');
const letter = document.querySelectorAll('.letter');
const posi = {x:1000, y:-30}
// initialisation de la position du ballon
Ballon.deplacer(ballon, posi.x, posi.y);

// afficher le message
function displayMessage() {
    const message = document.querySelector('.message');
    let mesParam = urlParams.get('message')
    if (mesParam) document.querySelector('#message').innerText = urlParams.get('message');
    message.classList.add('active');
    document.querySelector('#nom').innerText = urlParams.get('name');
}

// Lancement des animations
setTimeout(() => {
    ballon.style.animation = 'fixer 5s ease-in-out forwards';
    setTimeout(() => {
        letter[DIF].style.animation = 'retirer 3s ease-in-out forwards';
        setTimeout(() => {
            letter[DIF].firstChild.innerText = newYear[DIF];
            boule.style.background = '#ff69b4';
            // boule.style.background = 'aqua';
            letter[DIF].style.animation = 'fixer 5s ease-in-out forwards';
            setTimeout(() => {
                ballon.style.animation = 'retirer 3s ease-in-out forwards';
                displayMessage();
            }, 5000);
        }, 3000);
    },5000)
}, 500)




