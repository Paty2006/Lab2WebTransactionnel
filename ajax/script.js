async function fetchWithAwait(){
    try{
        const response = await fetch('http://localhost:5501/publications')
        const json = await response.json()
        console.log(json)
    } catch (err) {
       // console.log(err)
    }
    
}

fetchWithAwait()