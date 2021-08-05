var master = gsap.timeline({ repeat: -1, repeatDelay: 0.1 });

const circle = document.querySelector("#circle"),
  topSquare = document.querySelector("#rectTop"),
  bottomSquare = document.querySelector("#rectBottom"),
  leftSquare = document.querySelector("#rectLeft"),
  rightSquare = document.querySelector("#rectRight"),
  ghost = document.querySelector("#ghost"),
  line = document.querySelector("#insideLine"),
  leftLine = document.querySelector("#leftLine"),
  rightLine = document.querySelector("#rightLine");

console.log(rightLine.getTotalLength());
gsap.set(circle, { transformOrigin: "center center" });

function expandCircle() {
  var tl = gsap.timeline();
  tl.from(circle, {
    duration: 0.3,
    rotation: 0.01,
    scale: 0.65,
    ease: "easeOut",
  });
  return tl;
}

function rotateCircle() {
  var tl = gsap.timeline();
  tl.to(circle, {
    duration: 0.5,
    rotation: 90,
    opacity: 0.6,
    ease: "easeInOut",
  });
  return tl;
}

function shrinkCircle() {
  var tl = gsap.timeline();
  tl.to(circle, {
    duration: 0.6,
    scale: 0.6,
    ease: "none",
  });
  return tl;
}

function animateSquares() {
  var squaresTl = gsap.timeline();

  const squaresDuration = 0.125;
  const squaresScale = 0.8;

  gsap.set([topSquare, bottomSquare, leftSquare, rightSquare], {
    transformOrigin: "center",
    rotation: 45,
    scale: 0,
  });

  topTl = gsap.timeline();
  topTl
    .to(topSquare, { duration: squaresDuration, scale: squaresScale })
    .to(
      topSquare,
      { duration: squaresDuration, y: "-= 5", ease: "easeInOut" },
      "<0.1"
    )
    .to(topSquare, { duration: squaresDuration, scale: 0 });

  bottomTl = gsap.timeline();
  bottomTl
    .to(bottomSquare, { duration: squaresDuration, scale: squaresScale })
    .to(
      bottomSquare,
      { duration: squaresDuration, y: "+= 5", ease: "easeInOut" },
      "<0.1"
    )
    .to(bottomSquare, { duration: squaresDuration, scale: 0 });

  rightTl = gsap.timeline();
  rightTl
    .to(rightSquare, { duration: squaresDuration, scale: squaresScale })
    .to(
      rightSquare,
      { duration: squaresDuration, x: "+= 5", ease: "easeInOut" },
      "<0.1"
    )
    .to(rightSquare, { duration: squaresDuration, scale: 0 });

  leftTl = gsap.timeline();
  leftTl
    .to(leftSquare, { duration: squaresDuration, scale: squaresScale })
    .to(
      leftSquare,
      { duration: squaresDuration, x: "-= 5", ease: "easeInOut" },
      "<0.1"
    )
    .to(leftSquare, { duration: squaresDuration, scale: 0 });

  squaresTl.add(topTl);
  squaresTl.add(bottomTl, "<");
  squaresTl.add(rightTl, "<");
  squaresTl.add(leftTl, "<");

  return squaresTl;
}

function animateGhost() {
  var tl = gsap.timeline();

  //   scale ghost
  tl.to(ghost, {
    duration: 0.07,
    scaleX: 0.8,
    scaleY: 1.1,
    transformOrigin: "center",
    ease: "easeInOut",
    ease: "none",
  })
    // move ghost up
    .to(
      ghost,
      {
        duration: 0.2,
        y: "-=10",
        ease: "easeInOut",
        ease: "none",
      },
      "<0.1"
    )
    // move ghost down
    .to(ghost, {
      duration: 0.4,
      scaleX: 1,
      scaleY: 1,
      y: "+=10",
      //   ease: "power2.in",
      ease: "none",
    });

  return tl;
}
function animateLines() {
  var tl = gsap.timeline();
  gsap.set(leftLine, { strokeDasharray: "1 123", strokeDashoffset: "0" });
  gsap.set(rightLine, { strokeDasharray: "1 123", strokeDashoffset: "0" });

  tl.to(leftLine, {
    duration: 0.3,
    strokeDasharray: "50 74",
    ease: "none"
  }).to(
    rightLine,
    {
      duration: 0.3,
      strokeDasharray: "50 74",
      ease: "none"
    },
    "<"
  );

  tl.to(
    leftLine,
    {
      duration: 0.8,
      strokeDashoffset: "-198 ",
      ease: "none"
    },
    "<0.1"
  )
  .to(
    rightLine,
    {
      duration: 0.8,
      strokeDashoffset: "-198 ",
      ease: "none"
    },
    "<"
  );

  tl.to(
    leftLine,
    {
      duration: 0.3,
      strokeDasharray: "0 123",
      strokeDashoffset: "-248",
      ease: "none"
    },
    "-=0.25"
  );

  tl.to(
    rightLine,
    {
      duration: 0.3,
      strokeDasharray: "0 123",
      strokeDashoffset: "-248",
      ease: "none"
    },
    "<"
  );

  return tl;
}

master.add(expandCircle());
master.add(animateSquares());
master.add(rotateCircle(), "<0.125");
master.add(shrinkCircle(), "<");
master.add(animateGhost(), 0);
master.add(animateLines(), 0);
