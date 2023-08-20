import { drawBars } from "./bars.js"
import { hBars } from "./hbars.js"
import { wCloud } from "./words.js"
import { lgbtCloud } from "./words.js"
import { lgbtPos } from "./grams.js"
import { lgbtNeg } from "./grams.js"

wCloud()
drawBars()
hBars()
lgbtCloud()
lgbtPos()
lgbtNeg()

$("#selCategory").on("change", function(){
  wCloud()
  drawBars()
})

// Scroll to Top Button
document.addEventListener("DOMContentLoaded", function() {
  const toTopButton = document.getElementById("toTop");

  toTopButton.addEventListener("click", function(event) {
      event.preventDefault();
      scrollToTop();
  });

  function scrollToTop() {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  }
});
