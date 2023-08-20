export {hBars}

function hBars()
{
    d3.json(`/api/v1.0/stackedbars`)
    .then(data =>
    {
        console.log(data)
             
        var category_array = []
        var posArray = []
        var neuArray = []
        var negArray = []

        for (let x of data)
        {
            category_array.push(x["category"])
        }
        category_array = [...new Set(category_array)].sort()
        console.log(category_array)

        looper()
        function looper()
        {
            for (let x of category_array)
            {
                var pos = 0
                var neu = 0
                var neg = 0

                for (let y of data)
                {
                    if (y["category"] == x && y["score"] == 2)
                    {
                        pos += 1
                    }
                    else if (y["category"] == x && y["score"] == 1)
                    {
                        neu += 1
                    }
                    else if (y["category"] == x && y["score"] == 0)
                    {
                        neg += 1
                    }
                }
                posArray.push(pos)
                neuArray.push(neu)
                negArray.push(neg)
            }
            console.log(posArray)
            console.log(neuArray)
            console.log(negArray)
        }
    })
}