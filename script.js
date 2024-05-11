document.addEventListener("DOMContentLoaded", function() {

// Function to toggle dark/light mode
function toggleDarkMode() {
    const rootElement = document.documentElement;
    rootElement.classList.toggle('night-mode');
}

// Function to save switch state to local storage
function saveSwitchState(state) {
    console.log("Saving: "+state)
    localStorage.setItem('darkModeEnabled', state);
    if(state){
        switchlabel.innerText = "day";
    }else{
        switchlabel.innerText = "night"
    }
}

const switchElement = document.getElementById('switch');
const switchlabel = document.getElementById('switchlabel');
// Function to retrieve switch state from local storage
function getSwitchState() {
    var enabled = localStorage.getItem('darkModeEnabled') === 'true';
    if(enabled){
        switchElement.checked = true;
        switchlabel.innerText = "day";
    }else{
        switchlabel.innerText = "night"
    }
    return enabled;
}

// Function to apply switch state on page load
function applySwitchState() {
    const switchState = getSwitchState();
    if (switchState) {
        // Dark mode is enabled
        toggleDarkMode();
    }
}

// Event listener for switch change
switchElement.addEventListener('change', function() {
    const switchState = this.checked;
    saveSwitchState(switchState);
    toggleDarkMode();
});

// Apply switch state on page load
applySwitchState();

        // Function to set active link in the navbar
    function setActiveLink() {
        const currentPage = window.location.pathname; // Get the current page URL
        const navLinks = document.querySelectorAll('.navbar a'); // Select all navigation links

        // Loop through each navigation link
        navLinks.forEach(link => {
            console.log(link.getAttribute('href'))
            console.log(currentPage)
            // Check if the link's href matches the current page URL
            // if((link.getAttribute('href') === "/home") && currentPage == ""){
            //     link.classList.add('active')
            // }

            if ((link.getAttribute('href') === currentPage) || ((link.getAttribute('href') === "/home") && currentPage == "")) {
                link.classList.add('active'); // Add 'active' class to the current link
            } else {
                link.classList.remove('active'); // Remove 'active' class from other links
            }
        });
    }

    setActiveLink();
});

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { solid #fff}";
    document.body.appendChild(css);
};