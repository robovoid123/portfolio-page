(function navbarToggle() {
  const navbarHam = document.getElementById("navbar-ham");
  const navbarCross = document.getElementById("navbar-cross");
  const navbar = document.getElementById("navbar");
  const navbarBackdrop = document.getElementById("navbar-backdrop");
  const navbarLinks = document.querySelectorAll(".navbar-link");

  const closingAction = () => {
    navbarCross.classList.add("navbar__button--close");
    navbarCross.classList.remove("navbar__button--open");
    navbarHam.classList.add("navbar__button--open");
    navbarHam.classList.remove("navbar__button--close");
    navbar.classList.remove("navbar--show");
    navbarBackdrop.classList.remove("navbar__backdrop--open");
  };

  const openingAction = () => {
    navbarHam.classList.add("navbar__button--close");
    navbarHam.classList.remove("navbar__button--open");
    navbarCross.classList.add("navbar__button--open");
    navbarCross.classList.remove("navbar__button--close");
    navbar.classList.add("navbar--show");
    navbarBackdrop.classList.add("navbar__backdrop--open");
  };

  navbarHam.addEventListener("click", openingAction);
  navbarCross.addEventListener("click", closingAction);
  navbarBackdrop.addEventListener("click", closingAction);

  navbarLinks.forEach((link) => {
    link.addEventListener("click", closingAction);
  });
})();

function reduceText(text, wordCount) {
  if (text.length > wordCount) {
    let idx = wordCount;
    for (let i = wordCount; i < text.length; i++) {
      if (text[i] === " ") break;
      idx++;
    }
    text = text.slice(0, idx);
  }
  return text + "...";
}

class Project {
  isFullDesc = false;
  WORD_COUNT = 60;

  constructor(domProject) {
    this.domProject = domProject;
    this.domProjectImage = this.domProject.children[0];
    this.domProjectText = this.domProject.children[1];
    this.domProjectDescription = this.domProject.children[1].children[1];
    this.domShowMoreBtn = this.domProject.children[1].children[2];
    this.descriptionFullText = this.domProjectDescription.innerHTML;

    this.domProjectDescription.innerHTML = reduceText(
      this.descriptionFullText,
      this.WORD_COUNT
    );

    this.domShowMoreBtn.addEventListener(
      "click",
      this.toggleShowMore.bind(this)
    );
  }

  toggleShowMore(event) {
    if (!this.isFullDesc) {
      this.domProjectDescription.innerHTML = this.descriptionFullText;
      this.isFullDesc = true;
      this.domProjectImage.style.display = "none";
      this.domProjectText.style.overflow = "scroll";
      this.domShowMoreBtn.innerHTML = "show less";

      console.log(this.domShowMoreBtn.innerHTML);
    } else {
      this.domProjectDescription.innerHTML = reduceText(
        this.descriptionFullText,
        this.WORD_COUNT
      );
      this.isFullDesc = false;
      this.domProjectImage.style.display = "block";
      this.domProjectText.style.overflow = "hidden";
      this.domShowMoreBtn.innerHTML = "show more";
    }
  }
}

const domProjects = document.querySelectorAll(".project");
const projectObjList = [];
domProjects.forEach((project) => {
  projectObjList.push(new Project(project));
});

// window in dom should be like this
// container should have height and width specified
// <div class="header-top-container">
//   <div class="window">
//     <div className="window-header">
//       <button className="close"></button>
//       <button className="minimize"></button>
//       <button className="fullscreen"></button>
//     </div>
//     <div className="window-content">
//       {content here}
//     </div>
//   </div>
// </div>

class CustomWindow {
  isResizing = false;
  isMinimized = false;
  isClosed = false;
  isFullScreen = false;

  constructor(domWindow) {
    this.domWindow = domWindow;
    this.domHeader = domWindow.children[0]; // first element always header
    this.domCloseBtn = this.domHeader.children[0].children[0];
    this.domMinimizeBtn = this.domHeader.children[0].children[1];
    this.domFullScreenBtn = this.domHeader.children[0].children[2];

    // adding eventListners
    this.domCloseBtn.addEventListener("click", this.close.bind(this));
    this.domMinimizeBtn.addEventListener("click", this.minimize.bind(this));
    this.domFullScreenBtn.addEventListener(
      "click",
      this.makeFullScreen.bind(this)
    );

    this.domHeader.addEventListener("mousedown", this.startDrag.bind(this));
  }

  startDrag(event) {
    this.domWindow.style.zIndex = 300;

    // get the mouse cursor position at startup:
    this.prevX = event.clientX;
    this.prevY = event.clientY;

    // this.domWindow.addEventListener("mouseup", this.finishDrag.bind(this));
    this.domWindow.onmouseup = this.finishDrag.bind(this);
    this.domWindow.onmousemove = this.drag.bind(this);
  }

  drag(event) {
    // calculate the new cursor position:
    let deltaX = this.prevX - event.clientX;
    let deltaY = this.prevY - event.clientY;
    this.prevX = event.clientX;
    this.prevY = event.clientY;

    // set the element's new position:
    this.domWindow.style.top = this.domWindow.offsetTop - deltaY + "px";
    this.domWindow.style.left = this.domWindow.offsetLeft - deltaX + "px";
  }

  finishDrag(event) {
    // stop moving when mouse button is released:
    this.domWindow.onmouseup = null;
    this.domWindow.onmousemove = null;

    // send not moving window to back
    this.domWindow.style.zIndex = 299;
  }

  close(event) {
    this.domWindow.style = "display: none";
  }

  minimize(event) {}
  resize(event) {}
  makeFullScreen(event) {}
}

let windowObjList = [];
const domWindows = document.querySelectorAll(".window");

domWindows.forEach((window) => {
  windowObjList.push(new CustomWindow(window));
});
