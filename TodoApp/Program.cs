using Microsoft.EntityFrameworkCore;

// Create a new web server builder
// This is a class whit a set of functions which
// we can use to configure and then create a new
// web server
var builder = WebApplication.CreateBuilder(args);

// Setup and register the database for our server
builder.Services.AddDbContext<TodoDb>(options => options.UseInMemoryDatabase("TodoList"));

// Error handling for database
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


// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems         	  Get all to-do items	        None	      Array of to-do items
app.MapGet("/todoitems", async (TodoDb database) => {
  var todoes = await database.Todos.ToListAsync();
  
  return Results.Ok(todoes);
});

// VERB   Endpoint         	    Description       	        Body	      Return Type
// POST   /todoitems	          Add a new item	            To-do item	To-do item
app.MapPost("/todoitems", async (Todo todo, TodoDb database) => {
  database.Todos.Add(todo);
  await database.SaveChangesAsync();
  
  return Results.Created($"/todoitems/{todo.Id}", todo);
});







// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/complete	  Get completed to-do items	  None      	Array of to-do items
app.MapGet("/todoitems/complete", async (TodoDb database) => {
  var completeTodoes = await database.Todos.Where(todo => todo.IsComplete).ToListAsync();

  return Results.Ok(completeTodoes);
});

// VERB   Endpoint         	    Description       	        Body	      Return Type
// GET    /todoitems/{id}	      Get an item by ID       	  None	      To-do item
app.MapGet("/todoitems/{id}", async (int id, TodoDb database) => {
    var todo = await database.Todos.FindAsync(id);

    if (todo is null) return Results.Ok(todo);
    else return Results.NotFound();
});


// VERB   Endpoint         	    Description       	        Body	      Return Type
// PUT    /todoitems/{id}    	  Update an existing item  	  To-do item	None
app.MapPut("/todoitems/{id}", async (int id, Todo newTodo, TodoDb database) => {
  var todo = await database.Todos.FindAsync(id);

  if (todo is null) return Results.NotFound();

  todo.Name = newTodo.Name;
  todo.IsComplete = newTodo.IsComplete;

  await database.SaveChangesAsync();

  return Results.NoContent();
});

// VERB   Endpoint         	    Description       	        Body	      Return Type
// DELETE /todoitems/{id}    	  Delete an item          	  None	      None
app.MapDelete("/todoitems/{id}", async (int id, TodoDb database) => {
  var todo = await database.Todos.FindAsync(id);

  if (todo is null) return Results.NotFound();

  database.Todos.Remove(todo);
  await database.SaveChangesAsync();
  
  return Results.Ok(todo);
});

// =================================== /Endpoints ==========================================


// Finally start the server
app.Run();
