
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
    videoContainer.addEventListener('click', () => {
        if (video.paused) {
            image.style.display = 'none';
            video.muted = false;
            video.play();
            videoCursor.querySelector('i').className = pauseIcon;
            videoCursor.style.height = '4vw';
            videoCursor.style.width = '4vw';
        } else {
            video.pause();
            videoCursor.querySelector('i').className = playIcon;
            videoCursor.style.height = originalPosition.height;
            videoCursor.style.width = originalPosition.width;
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
        duration: 2.5,
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
    delay: 6.5,
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

// scroll effect on all element
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.motion-effect').forEach(element => {
        let initialY = 0; // Store the original Y position

        // Get the initial position of the element
        const rect = element.getBoundingClientRect();
        initialY = rect.top + window.scrollY;

        // Create a ScrollTrigger for the element
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%", // Adjust start position
            end: "bottom 20%", // Adjust end position
            onUpdate: (self) => {
                // Get scroll speed
                const scrollSpeed = Math.abs(self.getVelocity());

                // Apply motion based on scroll speed
                gsap.to(element, {
                    y: scrollSpeed * 0.1, // Adjust multiplier as needed
                    overwrite: 'auto'
                });
            },
            onLeaveBack: () => {
                // Reset the element when scrolling up
                gsap.to(element, {
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            },
            onStop: () => {
                // Reset the element when scrolling stops
                gsap.to(element, {
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });

        // Handle scroll stop detection
        let timeout;
        window.addEventListener('scroll', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                // Smoothly reset to original position when scrolling stops
                gsap.to(element, {
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }, 100); // Adjust timeout as needed
        });
    });
});



//page 1 (OUR PROJECTS) animations from here
