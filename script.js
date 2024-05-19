document.addEventListener("DOMContentLoaded", function() {

//#region night mode toggle code

//toggle dark/light mode
function toggleDarkMode() {
    const rootElement = document.documentElement;
    rootElement.classList.toggle('night-mode');
}

//save switch state to local storage
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
//retrieve switch state from local storage
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

//apply switch state on page load
function applySwitchState() {
    const switchState = getSwitchState();
    if (switchState) {
        // Dark mode is enabled
        toggleDarkMode();
    }
}

//listen for switch change event
switchElement.addEventListener('change', function() {
    const switchState = this.checked;
    saveSwitchState(switchState);
    toggleDarkMode();
});

//apply switch state every time the page loads
applySwitchState();

    //set active link in navbar
    function setActiveLink() {
        //get pagename and all refrence for all navlinks
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar a');

        //loop through each navlink
        navLinks.forEach(link => {
            console.log(link.getAttribute('href'))
            console.log(currentPage)
            //check if the link's href matches the current page URL
            // if((link.getAttribute('href') === "/home") && currentPage == ""){
            //     link.classList.add('active')
            // }

            if ((link.getAttribute('href') === currentPage) || ((link.getAttribute('href') === "/home") && currentPage == "/")) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
//#endregion


//#region top button code

    //scroll to top button code
    let mybutton = document.getElementById("myBtn");
    
    //when the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.classList.add('show');
        } else {
            mybutton.classList.remove('show');
        }
    }
    
    function topFunction() {
        //set the scroll position to the top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    mybutton.onclick = topFunction;

    //#endregion


//#region accordion code

const toggleLinks = document.querySelectorAll('.toggle-link');

    toggleLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const answer = link.nextElementSibling;

            //close all other answers and reset icons
            document.querySelectorAll('.answer').forEach(function(otherAnswer) {
                if (otherAnswer !== answer) {
                    otherAnswer.style.maxHeight = null;
                    otherAnswer.classList.remove('active');
                }
            });

            document.querySelectorAll('.toggle-link').forEach(function(otherLink) {
                const downIcon = otherLink.querySelector('.down-icon');
                const upIcon = otherLink.querySelector('.up-icon');
                if (downIcon && upIcon) {
                    downIcon.classList.remove('hidden');
                    upIcon.classList.add('hidden');
                }
            });

            //toggle the clicked answer and update icon
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.classList.remove('active');
                const downIcon = link.querySelector('.down-icon');
                const upIcon = link.querySelector('.up-icon');
                if (downIcon && upIcon) {
                    downIcon.classList.remove('hidden');
                    upIcon.classList.add('hidden');
                }
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.classList.add('active');
                const downIcon = link.querySelector('.down-icon');
                const upIcon = link.querySelector('.up-icon');
                if (downIcon && upIcon) {
                    downIcon.classList.add('hidden');
                    upIcon.classList.remove('hidden');
                }
            }
        });
    });

//#endregion

    setActiveLink();
});

//#region typewriter effect code (INCLUDES WINODW ONLOOAD)

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
    //INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { solid #fff}";
    document.body.appendChild(css);
};
//#endregion
