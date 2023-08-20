import { drawBars } from "./bars.js"
import { hBars } from "./hbars.js"
// import { wCloud } from "./words.js"

// wCloud()
drawBars()
hBars()

$("#selCategory").on("change", function(){
  drawBars()
})