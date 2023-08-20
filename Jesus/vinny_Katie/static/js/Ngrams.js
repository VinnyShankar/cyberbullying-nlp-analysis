export {generateNgrams}


function generateNgrams(text, n) {
    const words = text.split(' ');
    const ngrams = [];

    for (let i = 0; i <= words.length - n; i++) {
        ngrams.push(words.slice(i, i + n).join(' '));
    }

    return ngrams;


function generateBigrams(text) {
    return generateNgrams(text, 2);
}

function generateTrigrams(text) {
    return generateNgrams(text, 3);
}

// Test
d3.json(`/api/v1.0/Ngrams/${categ}`)
.then(data =>
    {
    looper()
    function looper() {
    var comment_array = []

        for (let x of data)
        
        comment_array.push(x["comment"])
    }
const sampleText = comment_array

console.log("Bigrams:", generateBigrams(sampleText));
console.log("Trigrams:", generateTrigrams(sampleText));
    
    })}