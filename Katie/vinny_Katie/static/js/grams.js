export { lgbtPos }
export { lgbtNeg }


// ##################################################################
// LGBT+ Positive Bigrams
// ##################################################################
function lgbtPos() {
    document.getElementById("lgbtPositive").src=`/api/v1.0/positive`
}


// ##################################################################
// LGBT+ Negative Bigrams
// ##################################################################
function lgbtNeg() {
    document.getElementById("lgbtNegative").src=`/api/v1.0/negative`
}