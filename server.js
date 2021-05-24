const express = require("express");
const app = express();
const port = 3000;

// Expose public folder
app.use(express.static("./public"));

// Include Libraries
const libraries = [
    ["/revealjs/", "./node_modules/reveal.js/"],
    ["/animejs/", "./node_modules/animejs/lib/"],
    ["/tailwind/", "./node_modules/tailwindcss/dist/"],
    ["/tsparticles/", "./node_modules/tsparticles/dist/"],
    ["/swiper/", "./node_modules/swiper/"],
    ["/chartjs/", "./node_modules/chart.js/dist/"],
];

for (const lib of libraries) {
    app.use(lib[0], express.static(lib[1]));
}

app.listen(port, () => {
    console.log("----------------------------------------------");
    console.log(`ENTREP 101 Listening at port: ${port}`);
    console.log("----------------------------------------------");
});