// Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Disable specific keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J')) {
        e.preventDefault();
    }
});


function locomotiveAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });




    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

locomotiveAnimations()





//code in arranged format
// Video cursor functionality
function initializeVideoCursor() {
    const videoContainer = document.getElementById('video-container');
    const videoCursor = document.getElementById('video-cursor');
    const video = videoContainer.querySelector('video');
    const image = videoContainer.querySelector('img');
    const playIcon = 'ri-play-large-fill';
    const pauseIcon = 'ri-pause-large-fill';

    // Store the original position and size of the cursor
    const originalPosition = {
        top: videoCursor.style.top,
        left: videoCursor.style.left,
        height: videoCursor.style.height,
        width: videoCursor.style.width,
    };

    // Click event to play/pause video and update cursor
    // videoContainer.addEventListener('click', () => {
    //     if (video.paused) {
    //         image.style.display = 'none';
    //         video.muted = false;
    //         video.play();
    //         videoCursor.querySelector('i').className = pauseIcon;
    //         videoCursor.style.height = '4vw';
    //         videoCursor.style.width = '4vw';
    //     } else {
    //         video.pause();
    //         videoCursor.querySelector('i').className = playIcon;
    //         videoCursor.style.height = originalPosition.height;
    //         videoCursor.style.width = originalPosition.width;
    //     }
    // });

    

    // Click event to play/pause video and update cursor
// Add event listener for mouse entering the video container
videoContainer.addEventListener('click', () => {
    // When mouse enters the video container, play the video and scale down the cursor
    if (video.paused) {
        image.style.display = 'none';
        video.muted = false;
        video.play();
        videoCursor.querySelector('i').className = pauseIcon;
        videoCursor.style.transform = 'scale(0.5)'; // Scale down when the mouse is inside the container
    }
    else {
        video.pause();
        videoCursor.querySelector('i').className = playIcon;
        videoCursor.style.transform = 'scale(1)'; // Reset to original size when video is paused
    }
});

// Add event listener for mouse leaving the video container
videoContainer.addEventListener('mouseleave', () => {
    // When mouse leaves the video container, pause the video and reset the cursor size
    if (!video.paused) {
        video.pause();
        videoCursor.querySelector('i').className = playIcon;
        videoCursor.style.transform = 'scale(1)'; // Reset to original size when the mouse leaves
    }
});





    // Mouseleave event to stop video and reset everything
    videoContainer.addEventListener('mouseleave', () => {
        video.pause();
        video.muted = true;
        image.style.display = 'block';
        videoCursor.style.top = originalPosition.top;
        videoCursor.style.left = originalPosition.left;
        videoCursor.style.height = originalPosition.height;
        videoCursor.style.width = originalPosition.width;
        videoCursor.querySelector('i').className = playIcon;
        videoContainer.style.cursor = 'auto';
    });
}


// Loader animation
function loadingAnimation() {
    let tl = gsap.timeline();

let loaderr =    document.getElementById("loader")
function loaderVisiblity(){
    loaderr.style.opacity = 1;
}
loaderVisiblity()

let loaderrr =    document.getElementById("page1")
function loaderVisiblityy(){
    loaderrr.style.opacity = 1;
}
loaderVisiblityy()

    tl.from('#loader h1', {
        y: 150,
        stagger: 0.25,
        duration: 0.6,
        delay: 0.5,
    });

    tl.from("#line1-part1,.line  h2", {
        opacity: 0,
        onStart: function () {
            let counterStart = document.querySelector("#time");
            let count = 0;

            let inter = setInterval(function () {
                if (count <= 100) {
                    counterStart.textContent = count;
                    count++;
                } else {
                    clearInterval(inter);
                }
            }, 35);
        }
    });

    tl.to("#loader h1, #loader h2, #loader h5, #loader h6", {
        opacity: 0,
        duration: 0.4,
        delay: 3.5,
    });

    tl.to('#loader', {
        y: -1600,
        display: 'none',
        duration: 3.7,
    });
}

loadingAnimation();

// Loader disable all actions
function loaderSupremacy() {
    function disableInteraction() {
        document.body.style.overflow = 'hidden'; // Disable scrolling
        document.body.style.pointerEvents = 'none'; // Disable mouse events
    }

    function enableInteraction() {
        document.body.style.overflow = ''; // Re-enable scrolling
        document.body.style.pointerEvents = ''; // Re-enable mouse events
    }

    disableInteraction();

    window.addEventListener('load', function () {
        setTimeout(function () {
            document.getElementById('loader').style.display = 'none';
            enableInteraction();

            // Initialize video cursor after loading is complete
            initializeVideoCursor();

        }, 6400); // Adjust the time as needed
    });
}

loaderSupremacy();

// Page1 hero animation
gsap.from('.hero h1,#video-container', {
    y: 200,
    stagger: 0.20,
    duration: 0.6,
    delay: 6.3,
});

// Sherry.js magnet effect
Shery.makeMagnet("#nav-part2 h4, #nav #logo", {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
});

// Sherry.js mouse cursor effect
Shery.mouseFollower({
    duration: 1,
});

// arranged code end

//video player function
function videoPlayer() {
    const videoContainer = document.getElementById('video-container');
    const videoCursor = document.getElementById('video-cursor');

    // Store the original position of the cursor
    const originalPosition = {
        top: videoCursor.style.top,
        left: videoCursor.style.left,
    };

    videoContainer.addEventListener('mousemove', (event) => {
        const rect = videoContainer.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Ensure the cursor stays within the bounds of the video container
        const cursorX = Math.min(Math.max(mouseX, videoCursor.offsetWidth / 2), rect.width - videoCursor.offsetWidth / 2);
        const cursorY = Math.min(Math.max(mouseY, videoCursor.offsetHeight / 2), rect.height - videoCursor.offsetHeight / 2);

        // Move the video cursor
        videoCursor.style.top = `${cursorY - videoCursor.offsetHeight / 2}px`;
        videoCursor.style.left = `${cursorX - videoCursor.offsetWidth / 2}px`;

        // Hide the original cursor
        videoContainer.style.cursor = 'none';
    });

    videoContainer.addEventListener('mouseleave', () => {
        // Instantly reset the video cursor to its original position
        videoCursor.style.top = originalPosition.top;
        videoCursor.style.left = originalPosition.left;

        // Show the original cursor
        videoContainer.style.cursor = 'auto';
    });

    videoContainer.addEventListener('mouseenter', () => {
        // Instantly reset the video cursor to its original position when re-entering
        videoCursor.style.top = originalPosition.top;
        videoCursor.style.left = originalPosition.left;
    });

}

videoPlayer();

// hr line Animation
document.addEventListener("DOMContentLoaded", function () {
    const hrElements = document.querySelectorAll('hr');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1 // Adjust this threshold as needed
    });

    hrElements.forEach(hr => {
        observer.observe(hr);
    });
});





//page 1 (OUR PROJECTS) animations from here

function sheryAnimation() {
    Shery.imageEffect('.image-div', {
        size: 5,
        // debug:true,
        config: { "a": { "value": 0, "range": [0, 30] }, "b": { "value": -0.989, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.727274964521342 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 2.98, "range": [0.1, 5] }, "durationIn": { "value": 3.95, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.34, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.00, "range": [0, 10] }, "metaball": { "value": 0.5, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true,
    })
}

sheryAnimation()


//hiding curson for #loader and when the mouse is inside #video-container div

function cursorHider() {
    const videoContainer = document.getElementById('video-container');

    function hideSheryMouseFollower() {
        const sheryCursor = document.querySelector('.mousefollower');
        if (sheryCursor) {
            sheryCursor.classList.add('hidden-shery-cursor');
        }
    }


    function showSheryMouseFollower() {
        const sheryCursor = document.querySelector('.mousefollower');
        if (sheryCursor) {
            sheryCursor.classList.remove('hidden-shery-cursor');
        }
    }

    videoContainer.addEventListener('mouseenter', hideSheryMouseFollower);
    videoContainer.addEventListener('mouseleave', showSheryMouseFollower);


    //loader mouse hide
    const loader = document.getElementById('loader');

    function hideSheryMouseFollower() {
        const sheryCursor = document.querySelector('.mousefollower');
        if (sheryCursor) {
            sheryCursor.classList.add('hidden-shery-cursor');
        }
    }

    function showSheryMouseFollower() {
        const sheryCursor = document.querySelector('.mousefollower');
        if (sheryCursor) {
            sheryCursor.classList.remove('hidden-shery-cursor');
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                hideSheryMouseFollower();
            } else {
                showSheryMouseFollower();
            }
        });
    });

    observer.observe(loader);

}

cursorHider();


