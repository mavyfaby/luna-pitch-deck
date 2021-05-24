document.addEventListener("DOMContentLoaded", function() {
    let indexh = 0;

    Chart.defaults.font.size = 16;
    Chart.defaults.animation.duration = 3000;

    Reveal.initialize({
        controls: false,
        embedded: false,
        width: '100%',
        height: '100%',
        transition: "concave",
        transitionSpeed: "slow",
    });

    const tractionChart = {
        type: "bar",
        data: {
            labels: ["June 2021", "July 2021", "August 2021", "September 2021", "October 2021", "November 2021"],
            datasets: [
                {
                    label: "Registered Users",
                    backgroundColor: "#DB4437",
                    borderColor: "#DB4437",
                    data: [1000, 10000, 15000, 30000, 60000, 100000]
                },
                {
                    label: "Total downloads",
                    backgroundColor: "#F4B400",
                    borderColor: "#F4B400",
                    data: [1100, 12000, 18000, 32500, 62000, 100500]
                },
                {
                    label: "Partnered Malls",
                    backgroundColor: "#0F9D58",
                    borderColor: "#0F9D58",
                    data: [5, 20, 50, 100, 250, 500]
                },
                {
                    label: "Revenue",
                    backgroundColor: "#4285F4",
                    borderColor: "#4285F4",
                    data: [150000, 250000, 500000, 750000, 500000, 800000]
                }
            ]
        },
        options: {
            interaction: {
                mode: 'nearest'
            },
            transitions: {
                show: {
                    animations: {
                        x: { from: 0 },
                        y: { from: 0 },
                    }
                },
                hide: {
                    animations: {
                        x: { from: 0 },
                        y: { from: 0 },
                    }
                }
            }
        }
    };

    const investingChart = {
        type: "pie",
        data: {
            labels: [
                'Internet Bill',
                'Server Cost',
                'Server Maintenance'
            ],
            datasets: [{
                label: 'Investing',
                data: [20, 50, 30],
                backgroundColor: [
                    '#DB4437',
                    '#F4B400',
                    '#4285F4'
                ],
                hoverOffset: 4
            }]
        }
    };

    const props = {
        s0: {
            isAppNameShown: false,
            isAppTaglineShown: false,
            isAppIconShown: false,    
        },
        s8: {
            isShown: false
        },
        s9: {
            isShown: false
        },
        s11: {
            isCanvasShown: false
        },
        s19: {
            isCanvasShown: false
        },
        s20: {
            isParticlesShown: false
        }
    };

    const loadedParticles = [];

    function loadParticles(index, theme) {
        if (!loadedParticles.includes(index)) {
            tsParticles.loadJSON(`particles-${index}`, `js/particles-${theme}.json`);

            loadedParticles.push(index);
        }
    }

    function animate(el, val) {
        return anime({
            targets: el,
            translateY: [-val, val],
            direction: 'alternate',
            loop: true,
            duration: 1000,
            easing: "easeInOutQuad"
        });
    }

    const darks = [0, 7, 10, 14, 16, 18];
    const virus = [3];

    Reveal.on("slidechanged", function(ev) {
        indexh = ev.indexh;

        let theme = "light";

        if (darks.includes(ev.indexh)) {
            theme = "dark";
        } else if (virus.includes(ev.indexh)) {
            theme = "virus";
        }

        loadParticles(ev.indexh, theme);

        if (ev.indexh == 8 && !props.s8.isShown) {
            props.s8.isShown = true;
            
            animate(`.slide-9-app-product`, 25);
        }

        if (ev.indexh == 9 && !props.s9.isShown) {
            props.s9.isShown = true;
            
            anime({
                targets: ".slide-10-app-product",
                translateY: [-30, 30],
                direction: 'alternate',
                loop: true,
                duration: 1000,
                easing: "easeInOutQuad"
            });

            new Swiper('.swiper-container', {
                speed:  1750,
                slidesPerView: "auto",
                centeredSlides: true,
                effect: "coverflow",
                disableOnInteraction: false,
                coverflowEffect: {
                    rotate: 90,
                    slideShadows: false
                },
                autoplay: {
                    delay: 3000
                }
            });
        }

        if (ev.indexh == 20 && !props.s20.isParticlesShown) {
            props.s20.isParticlesShown = true;

            tsParticles.loadJSON("contact-particles-light", "js/particles-light.json");
            tsParticles.loadJSON("contact-particles-dark", "js/particles-dark.json");
        }
    });

    Reveal.on("fragmentshown", function(ev) {
        const cls = ev.fragment.classList;

        if (indexh == 0) {
            if (cls.contains(`slide-1-app-name`) && !props.s0.isAppNameShown) {
                props.s0.isAppNameShown = true;
                animate(`.slide-1-app-name`, 50);
            }

            if (cls.contains(`slide-1-app-tagline`) && !props.s0.isAppTaglineShown) {
                props.s0.isAppTaglineShown = true;
                animate(`.slide-1-app-tagline`, 50);
            }
    
            if (cls.contains(`slide-1-app-icon`) && !props.s0.isAppIconShown) {
                props.s0.isAppIconShown = true;
                animate(`.slide-1-app-icon`, 75);
            }
        }

        if (indexh == 11 && cls.contains("chart-container") && !props.s11.isCanvasShown) {
            props.s11.isCanvasShown = true;
            new Chart(document.getElementById("traction-chart"), tractionChart);
        }

        if (indexh == 19 && cls.contains("chart-container") && !props.s19.isCanvasShown) {
            props.s19.isCanvasShown = true;
            new Chart(document.getElementById("investing-chart"), investingChart);
        }
    });

    loadParticles(indexh, "dark");
});