// -------------------
//  Parameters and UI
// -------------------
let easyCam

const gui = new dat.GUI()
const params = {
    Colonnes: 20,
    Lignes: 20,
    Echelle: 20,
    Inclinaison: 0.1,
    hauteurMin: -50,
    hauteurMax: 50,

    Download_Image: () => save(),
}
    gui.add(params, "Colonnes", 1, 100, 1),
    gui.add(params, "Lignes", 1, 100, 1),
    gui.add(params, "Echelle", 10, 100, 1),
    gui.add(params, "Inclinaison", 0, 1, 0.1),
    gui.add(params, "hauteurMin", -100, 0, 1),
    gui.add(params, "hauteurMax", 0, 100, 1),
    gui.add(params, "Download_Image")



const W = 500, H = 600

var Zdecal = 0
var Zinclinaison = 0.02
var start = 0;
var StartInclinaison = 0;
// -------------------
//       Drawing
// -------------------
function draw() {

    background("#f7f1e3");
    strokeWeight(0.7);
    stroke("#2d3436");
    noFill();

    //remise dans l'axe 3d
    rotateX(PI/2)
    //mise au centre du dessin dans le canvas
    translate(-W / 2, -H / 2);

    let Ydecal = start;
    //creation de la grille en demis triangles
    for (let y = 0; y < params.Lignes; y++) {
        let Xdecal = 0;
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < params.Colonnes; x++) {
            //on cree chaque triangle dans chaque ligne et chaque colonne a chaque tour de boucle
            //vertex vient poser les points en x, y et en z on vient generer aleatoirement une valeur avec map et le noise de perlin afin de creer la "vague" celle ci est dailleurs modifiable avec les parametres hauteur min et max
            vertex(x * params.Echelle, y * params.Echelle, map(noise(Xdecal, Ydecal, Zdecal), 0, 1, params.hauteurMin, params.hauteurMax));

            //creation du triangle dans l'autre sens ce qui forme un carré 
            vertex(x * params.Echelle, (y + 1) * params.Echelle, map(noise(Xdecal, Ydecal, Zdecal), 0, 1, params.hauteurMin, params.hauteurMax));

            Xdecal += params.Inclinaison;
        }
        Ydecal += params.Inclinaison;
        endShape();
    }
    Zdecal += Zinclinaison;
    start += StartInclinaison;




}

// -------------------
//    Initialization
// -------------------

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    easyCam = createEasyCam();


}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }