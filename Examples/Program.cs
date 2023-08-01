using System.Collections.Generic;

List<string> persons = new List<string>();

persons.Add("Lars");
persons.Add("Wayne");


var lars = persons[0];
persons.RemoveAt(0);