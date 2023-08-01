# Loops in C\#

## Content

- [For](#)

## Loops

In C#, there are several types of loops that allow you to repeat a block of code until a specific condition is met. Here are the various types of loops available in C#:

### 1. `for` loop: The most commonly used loop, where a block of code is executed a specified number of times based on an initial value, a condition, and an increment or decrement step.

<details>
<summary>Example code</summary>

```csharp
for (initialization; condition; iteration)
{
    // Code block to be repeated
}
```
</details>

### 2. `while` loop: A loop that continues to execute a block of code as long as the specified condition is true.

<details>
<summary>Example code</summary>
```csharp
while (condition)
{
    // Code block to be repeated
}
```
</details>

### 3. `do-while` loop: Similar to the `while` loop, but the code block is executed at least once before checking the condition.

<details>
<summary>Example code</summary>

```csharp
do
{
    // Code block to be repeated
} while (condition);
```
</details>

### 4. `foreach` loop: Used to iterate through elements in collections like arrays, lists, or other collections that implement the `IEnumerable` interface.

<details>
<summary>Example code</summary>

```csharp
foreach (var item in collection)
{
    // Code block to be repeated for each item in the collection
}
```
</details>

### 5. `goto` loop: NOT RECOMMENDED, it is possible to use the `goto` statement to create a loop-like structure in C#.

<details>
<summary>Example code</summary>

```csharp
start:
    // Code block to be repeated
    goto start; // Jump back to the label "start"
```
</details>

### 6. `break` and `continue` statements: These are not loops themselves but are used inside loops to control the flow. `break` is used to exit a loop prematurely, and `continue` is used to skip the rest of the current iteration and start the next iteration.

These are the primary loop constructs in C#. Each loop type has its own specific use cases, and you should choose the one that best fits the requirements of your program and enhances code readability and maintainability.

## Looping through a simple list

In C#, you can loop through a list using different techniques:

1. `foreach` loop: The most common and recommended way to loop through a list is using the `foreach` loop. It automatically iterates through each element of the list.
<details>
<summary>Example code</summary>

```csharp
List<T> myList = new List<T>(); // Replace T with the actual type of your list elements

foreach (var item in myList)
{
    // Code block to process each item in the list
}
```
</details>

### 2. Traditional `for` loop: You can use a traditional `for` loop to iterate through the list using an index.
<details>
<summary>Example code</summary>

```csharp
for (int i = 0; i < myList.Count; i++)
{
    var item = myList[i];
    // Code block to process each item in the list
}
```
</details>

3. `while` loop with index: You can also loop through the list using a `while` loop with an index.
<details>
<summary>Example code</summary>

```csharp
int i = 0;
while (i < myList.Count)
{
    var item = myList[i];
    // Code block to process each item in the list

    i++;
}
```
</details>

4. `do-while` loop with index: Similar to the `while` loop, but the loop body is executed at least once.
<details>
<summary>Example code</summary>

```csharp
int i = 0;
do
{
    var item = myList[i];
    // Code block to process each item in the list

    i++;
} while (i < myList.Count);
```
</details>

5. Using LINQ `ForEach` method: If you are using `List<T>`, you can also utilize the `List<T>.ForEach` method to apply an action to each element in the list.
<details>
<summary>Example code</summary>

```csharp
List<T> myList = new List<T>(); // Replace T with the actual type of your list elements

myList.ForEach(item =>
{
    // Code block to process each item in the list
});
```
</details>

6. LINQ `foreach` with `IEnumerable`: If you have an `IEnumerable<T>` (which includes `List<T>`), you can use `foreach` directly on it.
<details>
<summary>Example code</summary>

```csharp
IEnumerable<T> myEnumerable = new List<T>(); // Replace T with the actual type of your list elements

foreach (var item in myEnumerable)
{
    // Code block to process each item in the list
}
```
</details>

The `foreach` loop is preferred for its simplicity and readability. Additionally, using LINQ can provide more concise and expressive code for certain scenarios.