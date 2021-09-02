//result messege container
const resultMessege = document.getElementById('result-messege');
//toggler
const toggler = (displaySpinner,displayResult,displayMessege) => {
    document.getElementById('spinner').style.display = displaySpinner;
    const resultToggle = document.getElementById('book-container');
        resultToggle.style.display = displayResult;
        resultToggle.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-3', 'g-4');
        resultMessege.style.display = displayMessege;
}
///click handler
const searchInput = () => {
    const searchBox = document.getElementById('search-input');
    const searchText = searchBox.value;
    searchBox.value = '';     
    toggler('block','none','none');  
    if(searchText === ''){
        resultMessege.innerHTML = `
    <h2 class="text-center text-secondary my-3">Please enter your fovorite book name.</h2>`
    toggler('none','none','block');
    }  
   else{
    searchFetch(searchText);
   }
   
}

///search text fetch 
const searchFetch= searchText=>{    
    const url = `https://openlibrary.org/search.json?q=${searchText}`    
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data))
    .catch(() => {
        resultMessege.innerHTML = '<h1 class="text-center text-danger">Something went wrong 😩, Please try again later.</h1>';
    })    
}
//results messege
const outputMessege = data =>{   
     if(data.docs.length === 0){
        resultMessege.innerHTML=`
    <h2 class="text-center text-danger my-3">No result found.</h2>    
    `}
    else{
        resultMessege.innerHTML = `
    <h2 style="border-bottom: 2px solid lightgray;" class="text-center text-primary mb-4 pb-2">Total ${data.numFound} results found.</h2>    
    `
    }    
}
//display book data
const displayBook = data =>{
    const bookConatainer = document.getElementById('book-container');     
    outputMessege(data);     
     //clear display data 
     bookConatainer.textContent = '';
     //maximum 30 output display on UI
     const books = data.docs.slice(0,30);
     books?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                    <div class="card h-100 p-2 rounded-3">
                        <img src="${`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}" alt="Image not found'" onerror= "this.src='images/notFound.png';" class="card-img-top   rounded-3 h-75">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h5 class="card-title"></h5>
                            <p class="card-text">Author: ${book.author_name ? book.author_name[0] :  'Unknown'}</p>
                            <p class="card-text">Publisher: ${book.publisher ? book.publisher[0] :  'Unknown' }</p>
                            <p class="card-text">First Published: ${book.publish_year ? Math.min.apply(null,book.publish_year) : 'Unknown'}</p>
                        </div>
                    </div>
        `
        bookConatainer.appendChild(div); 
    });    
    toggler('none','flex','block');   
}