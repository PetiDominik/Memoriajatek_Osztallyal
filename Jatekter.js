import Kartya from "./Kartya.js";
class Jatekter {
    #kepek = [];
    #kivalasztottKepekLista = [];
    #felforditott;
    #lehetEForditani;

    constructor(kepek) {
        this.#felforditott = null;
        this.#lehetEForditani = true;
        this.#kepek = this.#kartyakRandomizalasa(kepek);
        const SZULO = $("#gameContainer");
        SZULO.html("");
        this.#kepek.forEach(kep => {
            new Kartya(kep, SZULO);
        });
        this.#kartyakFigyelese();
    }

    #kartyakFigyelese() {
        $(window).on("kartyaFordit", (t) => {
            if (!this.#lehetEForditani) {return;}
            
            const UJ_FELFORDITOTT = t.detail;
            UJ_FELFORDITOTT.setKep(false);

            if (this.#felforditott === null) {
                this.#felforditott = UJ_FELFORDITOTT;
                return;
            }
            this.#lehetEForditani = false;

            if (this.#felforditott.egyezikE(UJ_FELFORDITOTT)) {
                console.log("ügyes vagy! csak így tovább");
                this.#kivalasztottKepekLista.push(this.#felforditott.getKepEleres());
                
                if (this.#kivalasztottKepekLista.length === this.#kepek.length / 2) {
                    console.log($("#ujJatek"));
                    $("#ujJatek").css("display", "flex");
                }
            } else {
                console.log("Ez most nem jött össze :/");
                setTimeout(() => {
                    this.#felforditott.setKep(true);
                    UJ_FELFORDITOTT.setKep(true);
                }, 1000);
            }
            setTimeout(() => {
                this.#lehetEForditani = true;
                this.#felforditott = null;
            }, 1000);

        });
    }
    
    #kartyakRandomizalasa(kepek) {
        kepek = kepek.concat(kepek)
        for (let i = 0; i < kepek.length; i++) {
            let id  = this.#randomSzam(0, kepek.length);
            let cs = kepek[i];
            kepek[i] = kepek[id];
            kepek[id] = cs;
        }
        return kepek;
    }
    #randomSzam(min, max) {
        return Math.floor((Math.random() * max) + min);
    }
}

export default Jatekter