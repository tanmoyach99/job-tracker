## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ans: getElementById is a method which selects one element and uses the element's id and returns a single element.
getElementsBYClassName is a method for selecting multiple elements by using class Names which returns a html collection.
querySelector is a slightly different method from the other two which can selects both class,id or even a tag name .it is useful and flexible and it returns a first matching element.
#querySelectorAll return all the matching element depends on your selection whether it tags, classes.

### 2. How do you create and insert a new element into the DOM?

ans: You create a new element using document.createElement(), optionally set its content or attributes, and then insert it into the DOM using methods like appendChild(), append() on a parent element. Another way is to insert new elements by setting a container’s #innerHTML to add HTML directly into the DOM at a specific position.

### 3. What is Event Bubbling? And how does it work?

ans:
Event Bubbling is a mechanism in the DOM where an event triggered on a child element automatically propagates upward through its parent elements until it reaches the root of the document.

When you click (or trigger an event on) a nested element: The event starts at the target element (the element you interacted with). After executing its handler, the event moves up to its parent element. Then it continues up through ancestors (grandparent → body → document). This continues unless the propagation is stopped.

Example: If you click a <button> inside a <div>, the event fires: First on the button. Then on the div and then on higher ancestors. and thats how event bubble works

### 4. What is Event Delegation in JavaScript? Why is it useful?

ans: Event Delegation is a technique in JavaScript where you attach a single event listener to a parent element to handle events for its child elements, instead of adding separate listeners to each child.

why it is useful:
1.Improves performance (fewer event listeners)
2.Works for dynamically added elements
3.Cleaner and more maintainable code
4.Reduces memory usage

### 5. What is the difference between preventDefault() and stopPropagation() methods?

ans: preventDefault() and #stopPropagation() are both event methods, but they control different things.
Stops the browser’s default behavior for an event.

Example: Prevent a form from submitting . Prevent a link from navigating. It does not stop the event from bubbling.

stopPropagation() stops the event from bubbling up (or capturing down) the DOM tree. It does not stop the default browser behavior.
