var easyCam;
var gui = new dat.GUI();
var params = {
    Colonnes: 20,
    Lignes: 20,
    Echelle: 20,
    Inclinaison: 0.1,
    hauteurMin: -50,
    hauteurMax: 50,
    Download_Image: function () { return save(); },
};
gui.add(params, "Colonnes", 1, 100, 1),
    gui.add(params, "Lignes", 1, 100, 1),
    gui.add(params, "Echelle", 10, 100, 1),
    gui.add(params, "Inclinaison", 0, 1, 0.1),
    gui.add(params, "hauteurMin", -100, 0, 1),
    gui.add(params, "hauteurMax", 0, 100, 1),
    gui.add(params, "Download_Image");
var W = 500, H = 600;
var Zdecal = 0;
var Zinclinaison = 0.02;
var start = 0;
var StartInclinaison = 0;
function draw() {
    background("#f7f1e3");
    strokeWeight(0.7);
    stroke("#2d3436");
    noFill();
    rotateX(PI / 2);
    translate(-W / 2, -H / 2);
    var Ydecal = start;
    for (var y = 0; y < params.Lignes; y++) {
        var Xdecal = 0;
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < params.Colonnes; x++) {
            vertex(x * params.Echelle, y * params.Echelle, map(noise(Xdecal, Ydecal, Zdecal), 0, 1, params.hauteurMin, params.hauteurMax));
            vertex(x * params.Echelle, (y + 1) * params.Echelle, map(noise(Xdecal, Ydecal, Zdecal), 0, 1, params.hauteurMin, params.hauteurMax));
            Xdecal += params.Inclinaison;
        }
        Ydecal += params.Inclinaison;
        endShape();
    }
    Zdecal += Zinclinaison;
    start += StartInclinaison;
}
function setup() {
    createCanvas(W, H, WEBGL);
    easyCam = createEasyCam();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight(), WEBGL);
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map