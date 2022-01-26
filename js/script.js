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

(function reduceDescriptionText() {
  const projectDesc = document.querySelectorAll(".project__desc p");
  const MAX_TEXT = 90;
  projectDesc.forEach((desc) => {
    let text = desc.innerHTML;
    if (text.length > MAX_TEXT) {
      let idx = MAX_TEXT;
      for (let i = MAX_TEXT; i < text.length; i++) {
        if (text[i] === " ") break;
        idx++;
      }
      text = text.slice(0, idx);
    }
    desc.innerHTML = text + "...";
  });
})();

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

class Window {
  isResizing = false;
  isMinimized = false;
  isClosed = false;
  isFullScreen = false;
  domWindow = null;

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
  windowObjList.push(new Window(window));
});
