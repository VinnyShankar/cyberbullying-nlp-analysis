export {wCloud}

function wCloud()
{
    d3.json(`/api/v1.0/wordcloud`)
    .then(data =>
    {
        console.log(data)
    }
    )
}