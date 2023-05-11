class Kartya {
    #kepEleres;
    #div;
    #kep;
    #felforditott;
    constructor(kep, szuloElem) {
        this.#felforditott = false;

        this.#kepEleres = kep;
        this.#divBeagyazas(szuloElem);
        this.#div = szuloElem.children("div:last-child");
        this.#kep = this.#div.children("img");

        this.#div.on("click", () => {
            this.#kartyaKattintas();
        });
    }

    #divBeagyazas(szuloElem) {
        /* ${this.#kepEleres} */
        szuloElem.append(`<div id="gameCard"><img src="imgs/hatter.jpg"></div>`);
    }

    #kartyaKattintas() {
        if (this.#felforditott) {return;}

        const EVENT = new CustomEvent("kartyaFordit", {
            detail: this,
        });
        window.dispatchEvent(EVENT);
    }

    getKepEleres() {
        return this.#kepEleres
    }

    egyezikE(masik) {
        return this.#kepEleres === masik.#kepEleres;
    }

    setKep(eleje) {
        if (eleje) {
            this.#felforditott = true;
            this.#kep.attr("src", "imgs/hatter.jpg");
            
        } else {
            this.#felforditott = false;
            this.#kep.attr("src", this.#kepEleres);
        }
    }
}

export default Kartya;