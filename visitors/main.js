class Record
{
  constructor(name, address, reason) 
  	{
    this.name = name;
    this.address = address;
    this.reason = reason;
  	}
}

class UI 
{
  addBookToList(book) 
  	{
    	const list = document.getElementById('book-list');
    	// Create tr element
    	const row = document.createElement('tr');
    	// Insert cols
    	row.innerHTML = `
      		<td>${book.name}</td>
      		<td>${book.address}</td>
      		<td>${book.reason}</td>
      		<td><a href="#" class="delete">X<a></td>
    					`;
  
	    list.appendChild(row);
  	}

  showAlert(message, className) 
  {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    					 }, 3000);
  }

  deleteBook(target) 
  {
    if(target.className === 'delete')
	 {
      target.parentElement.parentElement.remove();
     }
  }

  clearFields() 
  	{
    	document.getElementById('name').value = '';
    	document.getElementById('add').value = '';
    	document.getElementById('reason').value = '';
  	}
}

// Local Storage Class
class Store 
{
  static getBooks()
   {
  	  let books;
    	if(localStorage.getItem('books') === null) 
		{
      	books = [];
    	} 
	else 
		{
      books = JSON.parse(localStorage.getItem('books'));
    	}

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(reason) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.reason === reason) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const name = document.getElementById('name').value,
        address = document.getElementById('add').value,
        reason = document.getElementById('reason').value

  // Instantiate book
  const book = new Record(name, address, reason);

  // Instantiate UI
  const ui = new UI();

  console.log(ui);

  // Validate
  if(name === '' || address === '' || reason === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    // Show success
    ui.showAlert('Record Added!', 'success');
  
    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Record Removed!', 'success');

  e.preventDefault();
});