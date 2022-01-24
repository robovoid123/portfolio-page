const navbarHam = document.getElementById("navbar-ham");
const navbarCross = document.getElementById("navbar-cross");
const navbar = document.getElementById("navbar");
const navbarBackdrop = document.getElementById("navbar-backdrop");
const navbarLinks = document.querySelectorAll(".navbar-link");
const projectDesc = document.querySelectorAll(".project__desc p");
const windowCloseBtn = document.querySelectorAll(".close");
const windowMinBtn = document.querySelectorAll(".minimize");
const windowFullBtn = document.querySelectorAll(".fullscreen");

const navbarToggle = () => {
  const closingAction = () => {
    navbarCross.classList.add("navbar__button--close");
    navbarCross.classList.remove("navbar__button--open");
    navbarHam.classList.add("navbar__button--open");
    navbarHam.classList.remove("navbar__button--close");
    navbar.classList.remove("navbar--show");
    navbarBackdrop.classList.remove("navbar__backdrop--open");

    console.log("action triggered");
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
};

const reduceDescriptionText = () => {
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
};

// TODO: make window resizable
// TODO: make window draggable
const windowActions = () => {
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
};

reduceDescriptionText();
navbarToggle();
windowActions();
