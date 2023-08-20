import { drawBars } from "./bars.js"
import { hBars } from "./hbars.js"
import { wCloud } from "./words.js"

wCloud()
drawBars()
hBars()

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
