const navbarHam = document.getElementById("navbar-ham");
const navbarCross = document.getElementById("navbar-cross");
const navbar = document.getElementById("navbar");
const navbarBackdrop = document.getElementById("navbar-backdrop");

const navbarToggle = () => {
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
};

navbarToggle();
