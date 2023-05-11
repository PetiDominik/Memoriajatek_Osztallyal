import Jatekter from "./Jatekter.js";
import { IMGS } from "./adat.js";
$(() => {
    let jatekter = new Jatekter(IMGS);
    $("#jatekStart").on("click", () => {
        $("#ujJatek").css("display", "none");
        jatekter = new Jatekter(IMGS);
    })
});