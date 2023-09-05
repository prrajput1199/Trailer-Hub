import React from 'react'

const UseGenre = (selectedGenre) => {
if(selectedGenre.length < 1) return "";

const genreIds = selectedGenre.map((Element)=>{
    return Element.id;
})

return genreIds.reduce((accumulator,currentvalue)=>{
    return accumulator + "," + currentvalue;
})
}

export default UseGenre;
