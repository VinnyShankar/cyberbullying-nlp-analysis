export {wCloud}
export {lgbtCloud}

// ##################################################################
// Dynamic Wordcloud
// ##################################################################
function wCloud()
{
    var categ = d3.select("#selCategory").node().value

    document.getElementById("blahblah").src=`/api/v1.0/wordclouds/${categ}`
}


// ##################################################################
// LGBT+ Wordcloud
// ##################################################################
function lgbtCloud() {
    document.getElementById("lgbtCloud").src=`/api/v1.0/lgbtwords`
}