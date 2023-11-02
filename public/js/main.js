const thumbsUp = document.querySelectorAll('.fa-thumbs-up')
const deleteTrash = document.querySelectorAll('.fa-trash')


//chat GPT

const deleteNaNNullIcons = document.querySelectorAll('.delete-me');

// Add an event listener for the "delete NaN/Null" icons
Array.from(deleteNaNNullIcons).forEach((element) => {
    element.addEventListener('click', deleteNaNNullRapper);
});

// Function to delete entries with "null" birthName, "null" stageName, and "NaN" likes
async function deleteNaNNullRapper() {
    const sName = this.parentNode.childNodes[1].innerText;
    const bName = this.parentNode.childNodes[3].innerText;
    const tLikes = Number(this.parentNode.childNodes[5].innerText);

    if (bName === 'null' && sName === 'null' && isNaN(tLikes)) {
        try {
            const res = await fetch('deleteNullOrNaNRapper', {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'stageName': sName,
                    'birthName': bName,
                    'likes': tLikes
                })
            });
            const data = await res.json();
            console.log(data);

            // Remove the parent list item from the DOM
            const parentListItem = this.parentNode;
            parentListItem.remove();
        } catch (err) {
            console.log(err);
        }
    }
}




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
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}



// chat said this instead with conditions to cehck if values are valid before creating new li
//async function addLike() {
//     const sNameElement = this.parentNode.childNodes[1];
//     const bNameElement = this.parentNode.childNodes[3];
//     const tLikesElement = this.parentNode.childNodes[5];

//     // Check if elements are found
//     if (sNameElement && bNameElement && tLikesElement) {
//         const sName = sNameElement.innerText;
//         const bName = bNameElement.innerText;
//         const tLikes = Number(tLikesElement.innerText);

//         // Check if tLikes is a valid number
//         if (!isNaN(tLikes)) {
//             try {
//                 const res = await fetch('addOneLike', {
//                     method: 'put',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         'stageName': sName,
//                         'birthName': bName,
//                         'likes': tLikes
//                     })
//                 });
//                 const data = await res.json();
//                 console.log(data);
//                 location.reload();
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     }
// }