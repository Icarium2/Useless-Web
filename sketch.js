//Storing variables for later use and setting the canvas up as a 2d-environment
const header = document.querySelector("header");
const canvWrap = document.querySelector(".canvas-wrapper");
const canvas = document.querySelector("#sketch");
const btnSubmit = document.querySelector(".submit");
const critiqueDiv = document.querySelector(".critique");
const critImg = document.querySelector(".critImg");
const critName = document.querySelector(".critName");
const critComment = document.querySelector(".critComment");
const reloadBtn = document.querySelector(".reload");
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
//Sets mousedown to drawing and tells the canvas to update when I've let go of the line once, so it doesn't draw one continuous line
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  pathX = e.offsetX;
  pathY = e.offsetY;
});

//The event-listeners that I need to draw(-and stop drawing) on the canvas(including the mousedown-one above)
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseout", () => (drawing = false));

//My billionth attempt at touch-functionality

canvas.addEventListener("touchstart", (e) => {
  drawing = true;
  pathX = e.offsetX;
  pathY = e.offsetY;
});
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", () => (drawing = false));

//Checks if the canvas element's drawable environment is properly sized, if not it updates it to match the current css settings rather than the default canvas w/h of 300px
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

//Runs the re-size function when entering different screen resolutions, and also on load.
resizeCanvas(canvas);
window.addEventListener("resize", () => resizeCanvas(canvas));

//An array of images and snarky artsy comments to loop through when the submit-button is pressed //
const critiqueArray = [
  {
    critic: "Ang Gablogian says",
    comment: "A bit derivative, don't you think?",
    image: "./images/ang.jpg",
  },
  {
    critic: "Andy says",
    comment: "If Van Gogh saw this he would gouge his eyes out too",
    image: "./images/warhol.jpg",
  },
  {
    critic: "Some old dude says",
    comment:
      "Drop your pencil and step as far away from the canvas as possible. I beg you.",
    image: "./images/oldguy.jpg",
  },
  {
    critic: "Jake says",
    comment:
      "How inspirational. To struggle with Parkinson's disease and still be able to hold a pencil.",
    image: "./images/gyll.png",
  },
  {
    critic: "Frida says",
    comment:
      "Good thing art is subjective, because this is objectively terrible.",
    image: "./images/kahlo.jpg",
  },
  {
    critic: "Kanye says",
    comment:
      "This really makes me think of society today and how everything is shit, just like this drawing.",
    image: "./images/kanye.jpeg",
  },
  {
    critic: "Bob says",
    comment:
      "There are no mistakes, just happy accidents. Except for this, this is full of mistakes.",
    image: "./images/ross.jpg",
  },
  {
    critic: "A Very Stable Genius says",
    comment:
      "Bad art, very bad art. I'm one of the best artists in the world, many people say it, so I know. Sad!",
    image: "./images/trump.jpg",
  },
];

//Hides elements - and shows two new elements, when button is clicked
btnSubmit.addEventListener("click", () => {
  canvas.style.display = "none";
  header.style.display = "none";
  btnSubmit.style.display = "none";
  critiqueDiv.style.display = "flex";
  reloadBtn.style.display = "flex";

  //Loops through the array and picks out an object at random to print to the given HTML elements/css classes
  critiqueArray.forEach(() => {
    const randomItem =
      critiqueArray[Math.floor(Math.random() * critiqueArray.length)];
    const { critic, comment, image } = randomItem;
    critImg.src = image;
    critComment.textContent = comment;
    critName.textContent = critic;
  });
});

//Reloads the page when the user clicks "try again"
reloadBtn.addEventListener("click", () => {
  location.reload();
});
