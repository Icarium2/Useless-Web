//Setting the canvas up as a 2d-environment
const canvas = document.querySelector("#paint");
const context = canvas.getContext("2d");

//Rounded lines, linewidth and colour-scheme
context.strokeStyle = "#000000";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 5;

//Storing variables for later use
let drawing = false;
let pathX = 0;
let pathY = 0;
let direction = true;

//The main drawing-function.
function draw(e) {
  if (!drawing) return;
  context.beginPath();
  context.moveTo(pathX, pathY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  pathX = e.offsetX; //Updates so that the line doesn't always start from 0 on its axis
  pathY = e.offsetY; //Updates so that the line doesn't always start from 0 on its axis
}
//Tells the canvas to update when I've let go of the line once, so it doesn't draw one continuous line
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  pathX = e.offsetX;
  pathY = e.offsetY;
});

//The event-listeners that I need to draw on the canvas(including the mousedown-one above)
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));

//Checks if the canvas element's drawable environment is properly sized, if not it updates it to match the current css settings
function resizeCanvas(canvas) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

resizeCanvas(canvas);
window.addEventListener("resize", () => resizeCanvas(canvas));
