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


// ==================================== Endpoints ==========================================
// Setup the endpoints and the methods that will
// run when those endpoints are requested

// Returning the index html, so the user does not have to specify: www.ourpage.com/index.html
app.MapGet("/", () => {
  return Results.File("index.html", "text/html");
});
// Redirecting to base URL if the user tries to go to www.ourpage.com/index.html
app.MapGet("/index.html", () => Results.Redirect("/"));



// VERB   Endpoint         	  Description       	      Body	      Return Type

// GET    /todoitems         	Get all to-do items	      None	      Array of to-do items
app.MapGet("/todoitems", () => {
  return Results.Ok("Get all to-do items");
});

// GET    /todoitems/complete	Get completed to-do items	None      	Array of to-do items
app.MapGet("/todoitems/complete", () => {
  return Results.Ok("Get completed to-do items");
});

// GET    /todoitems/{id}	    Get an item by ID       	None	      To-do item
app.MapGet("/todoitems/{id}", (int id) => {
  return Results.Ok("Get an item by ID");
});

// POST   /todoitems	        Add a new item	          To-do item	To-do item
app.MapPost("/todoitems", () => {
  return Results.Accepted("Add a new item");
});

// PUT    /todoitems/{id}    	Update an existing item  	To-do item	None
app.MapPut("/todoitems/{id}", (int id) => {
  return Results.Accepted("Update an existing item");
});

// DELETE /todoitems/{id}    	Delete an item          	None	      None
app.MapDelete("/todoitems/{id}", () => {
  return Results.Accepted("Delete an item");
});

// =================================== /Endpoints ==========================================


// Finally start the server
app.Run();
