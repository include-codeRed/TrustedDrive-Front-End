const toggle = (() => {
    let isToggle = false;

    return () => {

        if (!isToggle) {
            isToggle = !isToggle;
            //code
        } else {
            isToggle = !isToggle;
            //code
        }
        return isToggle;
    }

})();



let isToggleMenu = false;

function menu(x) {
    x.classList.toggle("open");

    let elemNavLink = document.getElementById('nav-bar-link-id');
    let elemNavBar = document.getElementById('nav-bar');
    if (!isToggleMenu) {
        isToggleMenu = !isToggleMenu;
        //code
        elemNavLink.style.display = "flex";
        elemNavBar.style.height = "auto";
    } else {
        isToggleMenu = !isToggleMenu;
        //code
        elemNavLink.style.display = "none";
        elemNavBar.style.height = '56px';
    }

};