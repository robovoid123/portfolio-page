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
  const MAX_TEXT = 60;
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

(function windowActions() {
  const windowCloseBtn = document.querySelectorAll(".close");
  const windowMinBtn = document.querySelectorAll(".minimize");
  const windowFullBtn = document.querySelectorAll(".fullscreen");
  const windowHeader = document.querySelectorAll(".window-style");

  // TODO: add functionality
  windowFullBtn.forEach((btn) => {
    btn.addEventListener("click", () => console.log("fullscreen"));
  });

  // TODO: add functionality
  windowMinBtn.forEach((btn) => {
    btn.addEventListener("click", () => console.log("minimize"));
  });

  windowCloseBtn.forEach((btn) => {
    btn.addEventListener(
      "click",
      () =>
        (btn.parentElement.parentElement.parentElement.style = "display: none")
    );
  });

  windowHeader.forEach((header) => {
    const elmnt = header.parentElement;

    header.addEventListener("mousedown", (e) => {
      elmnt.style.zIndex = 300;
      // get the mouse cursor position at startup:
      let prevX = e.clientX;
      let prevY = e.clientY;

      window.addEventListener("mouseup", closeDragElement);
      window.addEventListener("mousemove", elementDrag);

      function elementDrag(e) {
        // calculate the new cursor position:
        let deltaX = prevX - e.clientX;
        let deltaY = prevY - e.clientY;
        prevX = e.clientX;
        prevY = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - deltaY + "px";
        elmnt.style.left = elmnt.offsetLeft - deltaX + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        window.removeEventListener("mouseup", closeDragElement);
        window.removeEventListener("mousemove", elementDrag);
        elmnt.style.zIndex = 299;
      }
    });
  });
})();

// class Window {
//   isResizing = false;
//   isMinimized = false;
//   isClosed = false;
//   isFullScreen = false;

//   constructor(domWindow) {
//     this.domWindow = domWindow;
//     this.domHeader = domWindow.children[0]; // first element always header
//     this.domCloseBtn = this.domHeader.children[0];
//     this.domMinimizeBtn = this.domHeader.children[1];
//     this.domFullScreenBtn = this.domHeader.children[2];

//     // adding eventListners
//     this.domCloseBtn.addEventListener("click", this.close);
//     this.domMinimizeBtn.addEventListener("click", this.minimize);
//     this.domFullScreenBtn.addEventListener("click", this.makeFullScreen);

//     this.domHeader.addEventListener("mousedown", this.startDrag);
//   }

//   startDrag(event) {
//     this.domWindow.style.zIndex = 300;

//     // get the mouse cursor position at startup:
//     this.prevX = e.clientX;
//     this.prevY = e.clientY;

//     window.addEventListener("mouseup", this.finishDrag);
//     window.addEventListener("mousemove", this.drag);
//   }

//   drag(event) {
//     // calculate the new cursor position:
//     let deltaX = this.prevX - event.clientX;
//     let deltaY = this.prevY - event.clientY;
//     this.prevX = e.clientX;
//     this.prevY = e.clientY;

//     // set the element's new position:
//     this.domWindow.style.top = this.domWindow.offsetTop - deltaY + "px";
//     this.domWindow.style.left = this.domWindow.offsetLeft - deltaX + "px";
//   }

//   finishDrag(event) {
//     // stop moving when mouse button is released:
//     window.removeEventListener("mouseup", this.finishDrag);
//     window.removeEventListener("mousemove", this.drag);

//     // send not moving window to back
//     this.domWindow.style.zIndex = 299;
//   }

//   close(event) {
//     this.domWindow.style = "display: none";
//   }

//   minimize(event) {}
//   resize(event) {}
//   makeFullScreen(event) {}
// }

// let windowObjList = [];
// domWindows.forEach((window) => {
//   windowObjList.append(new Window(window));
// });

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
