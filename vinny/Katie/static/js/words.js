export {wCloud}

function wCloud()
{
    var categ = d3.select("#selCategory").node().value
    console.log(categ)

    document.getElementById("blahblah").src=`/api/v1.0/wordclouds/${categ}`
    // d3.image(`/api/v1.0/wordclouds/${categ}`)
    // .then((img) =>
    // {
    //     console.log(img)

    //     document.getElementById("wordCloud").src="../template/save.png"

    // }
    // )
}