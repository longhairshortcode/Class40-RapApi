const thumbsUp = document.querySelectorAll('.fa-thumbs-up')
const deleteTrash = document.querySelectorAll('.fa-trash')


//add event listener for all deleteTrash
Array.from(deleteTrash).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

// the deleteRapper function after trash icon is clicked
async function deleteRapper(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageName': sName,
              'birthName': bName
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

//add event listener for all thumbs up
Array.from(thumbsUp).forEach((element) => {
    element.addEventListener('click', addLike)
})
// the addLike function after like icon is clicked
async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const res = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'stageName': sName,
              'birthName': bName,
              'likes': tLikes
            })
          })
        const data= await resp.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}