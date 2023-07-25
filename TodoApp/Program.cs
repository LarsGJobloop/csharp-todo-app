using Microsoft.EntityFrameworkCore;

// Create a new web server builder
// This is a class whit a set of functions which
// we can use to configure and then create a new
// web server
var builder = WebApplication.CreateBuilder(args);

// Setup the database for our server
builder.Services.AddDbContext<TodoDb>(options => options.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Configuration finished, now create the web server
var app = builder.Build();

// Serving static files (HTML, CSS, JS, JPG, etc)
app.UseStaticFiles();


// Setup the endpoints and the methods that will
// run when those endpoints are requested

// Returning the index html, so the user does not have to specify: www.ourpage.com/index.html
app.MapGet("/", () => {
  return Results.File("index.html", "text/html");
});
// Redirecting to base URL if the user tries to go to www.ourpage.com/index.html
app.MapGet("/index.html", () => Results.Redirect("/"));


// GET    /todoitems         	Get all to-do items	      None	      Array of to-do items
// GET    /todoitems/complete	Get completed to-do items	None      	Array of to-do items
// GET    /todoitems/{id}	    Get an item by ID       	None	      To-do item
// POST   /todoitems	        Add a new item	          To-do item	To-do item
// PUT    /todoitems/{id}    	Update an existing item  	To-do item	None
// DELETE /todoitems/{id}    	Delete an item          	None	      None

// Finally start the server
app.Run();
