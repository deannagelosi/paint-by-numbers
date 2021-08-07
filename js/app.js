
// Make the paper scope global by injecting it into window:
paper.install(window);
// Setup the paper canvas
// Get a reference to the canvas object
let canvas = document.getElementById('myCanvas');
paper.setup(canvas);

// Define global variables
let raster = new Raster('mona'); // mona lisa image raster
raster.visible = false;
let gridSize = 12; // The size of the grid cells
let spacing = 1.2; // Space the cells by 120%
let cells = []; // array to hold the cells

// Setup event listeners
raster.on('load', paintCells); // wait for the raster to load
// addEventListener("resize", resizeCanvas); // auto-resize canvas

// Create the drawing
function paintCells() {
    raster.size = new Size(40, 30); // reduce number of pixels to loop through

    for (let y = 0; y < raster.height; y++) {
        for (let x = 0; x < raster.width; x++) {
            // Get the color of the pixel:
            let color = raster.getPixel(x, y);

            // Create a circle shaped path:
            let path = new Path.Circle({
                center: new Point(x, y).multiply(gridSize),
                radius: gridSize / 2 / spacing
            });
            path.fillColor = color;

            cells.push(path); // save the cell references
        }
    }
    view.draw();

    // Move the active layer to the center of the view, so all 
    // the created paths in it appear centered.
    project.activeLayer.position = view.center;
}

// function resizeCanvas() {
//     canvas.width = innerWidth; // Set the canvas resolution to fill the page
//     canvas.height = innerHeight;
// }

