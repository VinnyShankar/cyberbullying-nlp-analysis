export {hBars}

function hBars()
{
    d3.json(`/api/v1.0/stackedbars`)
    .then(data =>
    {
        console.log(data)
             
        var lpos = 0
        var lneu = 0
        var lneg = 0

        var opos = 0
        var oneu = 0
        var oneg = 0

        looper()
        function looper()
        {
            for (let y of data)
            {
                if (y["identity"] == "lgbt" && y["score"] == 2)
                {
                    lpos += 1
                }
                else if (y["identity"] == "lgbt" && y["score"] == 1)
                {
                    lneu += 1
                }
                else if (y["identity"] == "lgbt" && y["score"] == 0)
                {
                    lneg += 1
                }
                else if (y["identity"] == "unknown" && y["score"] == 2)
                {
                    opos += 1
                }
                else if (y["identity"] == "unknown" && y["score"] == 1)
                {
                    oneu += 1
                }
                else if (y["identity"] == "unknown" && y["score"] == 0)
                {
                    oneg += 1
                }
            }
        }
        
        console.log(lpos)
        console.log(lneu)
        console.log(lneg)

        console.log(opos)
        console.log(oneu)
        console.log(oneg)
    })
}