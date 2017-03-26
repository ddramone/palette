import arrow_base64 from './arrow.png';


Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

let defaults = {
    target: "canvas"
};

let options;

let canvas;
let ctx;
let rotateBy = 0;
let startingAngle = 0;
let currentAngle = 0;
let mousePressed = false;


let interval;

export function ColorPicker(config) {

    options = Object.assign(defaults, config);

    let radius = 100;
    let canvas = document.getElementById(options.target);
    let ctx = canvas.getContext("2d");

    var img = new Image(90, 10);

    let mousePressed = false;

    let facing = 0;
    let startingAngle = 0;

    img.onload = function () {

        drawBoth(startingAngle);

        canvas.onclick = function (e) {


            facing = getDestAngle(e);
            triggerChangeEvent(facing);

            console.log(facing, startingAngle);

        };

        canvas.onmousedown = function (e) {
            mousePressed = true;
        };

        canvas.onmouseup = function (e) {
            mousePressed = false;
        };

        canvas.onmousemove = function (e) {

            if (!mousePressed) return;
            facing = getDestAngle(e);
            triggerChangeEvent(facing);

        };

        function triggerChangeEvent(angle) {


            let hue = angle;
            let saturation = 1.0;
            let value = 1.0;

            let [red, green, blue] = hsv2rgb(hue, saturation, value);
            let alpha = 255;

            options.onchange(red, green, blue, alpha);

        }






        interval = setInterval(function () {


            let rotateBy = (facing - startingAngle) % 360;

            if (rotateBy >= 180) {
                rotateBy = rotateBy - 360;
            } else if (rotateBy <= -180) {
                rotateBy = rotateBy + 360;
            }



            startingAngle = (startingAngle + Math.round(rotateBy / 5, 3)) % 360;
            rotateBy -= Math.round(rotateBy / 5, 3);

            currentAngle = Math.easeInOutQuad(1, startingAngle, rotateBy, 10);

            let [red, green, blue] = hsv2rgb(startingAngle, 1.0, 1.0);
            let alpha = 255;

            drawBoth(currentAngle);

        }, 33);



    };

    img.src = arrow_base64;

    /**
     * Get destination angle by mouse event
     * @param e event
     */
    function getDestAngle(e) {

        var x = e.pageX - canvas.offsetLeft - canvas.width / 2,
            y = e.pageY - canvas.offsetTop - canvas.height / 2;

        let [r, phi] = xy2polar(x, y);

        return rad2deg(phi);

    }

    /**
     * Draw circle
     */
    function drawCircle() {

        let image = ctx.createImageData(2 * radius, 2 * radius);
        let data = image.data;

        for (let x = -radius; x < radius; x++) {
            for (let y = -radius; y < radius; y++) {

                let [r, phi] = xy2polar(x, y);

                if (r > radius || r < radius - 30) {
                    // skip all (x,y) coordinates that are outside of the circle
                    continue;
                }

                let deg = rad2deg(phi);

                // Figure out the starting index of this pixel in the image data array.
                let rowLength = 2 * radius;
                let adjustedX = x + radius; // convert x from [-50, 50] to [0, 100] (the coordinates of the image data array)
                let adjustedY = y + radius; // convert y from [-50, 50] to [0, 100] (the coordinates of the image data array)
                let pixelWidth = 4; // each pixel requires 4 slots in the data array
                let index = (adjustedX + (adjustedY * rowLength)) * pixelWidth;

                let hue = deg;
                let saturation = 1.0;
                let value = 1.0;

                let [red, green, blue] = hsv2rgb(hue, saturation, value);
                let alpha = 255;

                data[index] = red;
                data[index + 1] = green;
                data[index + 2] = blue;
                data[index + 3] = alpha;

            }
        }

        ctx.putImageData(image, 0, 0);


    }

    /**
     * 
     * @param {*} img 
     * @param {*} angle 
     */
    function drawArrow(angle) {

        function rotateAndPaintImage(image, angle, positionX, positionY, axisX, axisY) {

            const angleInRad = Math.PI / 180 * angle;

            ctx.save();
            ctx.translate(positionX, positionY);
            ctx.rotate(angleInRad);
            ctx.translate(-axisX, -axisY);
            ctx.drawImage(img, 0, 0);
            ctx.restore();

        }

        const offsetX = canvas.height / 2;
        const offsetY = radius;

        rotateAndPaintImage(img, angle, radius, offsetY, 90, 4.5);

    }

    /**
     * Draw both arrow and circle
     * @param angle 
     */
    function drawBoth(angle) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawCircle();
        drawArrow(angle);

    }

    function xy2polar(x, y) {
        let r = Math.sqrt(x * x + y * y);
        let phi = Math.atan2(y, x);
        return [r, phi];
    }

    // rad in [-π, π] range
    // return degree in [0, 360] range
    function rad2deg(rad) {
        return ((rad + Math.PI) / (2 * Math.PI)) * 360;
    }

    // hue in range [0, 360]
    // saturation, value in range [0,1]
    // return [r,g,b] each in range [0,255]
    // See: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
    function hsv2rgb(hue, saturation, value) {
        let chroma = value * saturation;
        let hue1 = hue / 60;
        let x = chroma * (1 - Math.abs((hue1 % 2) - 1));
        let r1, g1, b1;
        if (hue1 >= 0 && hue1 <= 1) {
            ([r1, g1, b1] = [chroma, x, 0]);
        } else if (hue1 >= 1 && hue1 <= 2) {
            ([r1, g1, b1] = [x, chroma, 0]);
        } else if (hue1 >= 2 && hue1 <= 3) {
            ([r1, g1, b1] = [0, chroma, x]);
        } else if (hue1 >= 3 && hue1 <= 4) {
            ([r1, g1, b1] = [0, x, chroma]);
        } else if (hue1 >= 4 && hue1 <= 5) {
            ([r1, g1, b1] = [x, 0, chroma]);
        } else if (hue1 >= 5 && hue1 <= 6) {
            ([r1, g1, b1] = [chroma, 0, x]);
        }

        let m = value - chroma;
        let [r, g, b] = [r1 + m, g1 + m, b1 + m];

        return [255 * r, 255 * g, 255 * b];

    }


}