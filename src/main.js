import '@/style/a.css'
const element = document.getElementById("app")
const div = document.createElement("div")
const fragment = document.createDocumentFragment();
const img = new Image()
img.className = "pidan"
img.src = require("@/assets/pidan.png").default
div.className = "dog"
fragment.appendChild(div)
fragment.appendChild(img)
element.appendChild(fragment)
import "@/js/treeshaking";
import "@/js/vendor";
import "@/js/test";
