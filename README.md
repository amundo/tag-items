---
lang: en
title:  \<tag-items\> docs
css: tag-items.css
---

<script type=module src="TagItems.js"></script>

<main>

## Overview

`TagItems` is a custom web component that provides a user interface for loading,
displaying, and exporting JSON data related to items and their associated tags.

## Example

```html
<tag-items src=sample.json></tag-items>
```

```{=html}
<tag-items src=sample.json></tag-items>
```

## Structure

The component contains a header section that has:

- An input field to load a JSON file.
- A button to export the current data as a JSON file.

Below the header, there are two sections:

- `tags`: A container to display all the available tags.
- `items`: A container to display all the items.

## Functionality

- **Loading a File:** Users can select a JSON file using the input field. The
  loaded data should have a structure containing `tags` (an array of tags) and
  `items` (an array of items).
- **Displaying Data:** After loading a file, the component will display all tags
  and items. Tags are draggable, allowing users to drag and drop them onto items
  to associate them.
- **Exporting Data:** Users can export the current data as a JSON file by
  clicking the "Export" button.

## Methods and Properties

1. `connectedCallback()`: An internal method called when the component is
   attached to the DOM. It initiates the rendering of event listeners.

2. `render()`: Sets up event listeners for the load and export buttons.

3. `loadFile(event)`: Loads and parses a JSON file chosen by the user.

4. `data`: A getter and setter for the internal `#data` property, which holds
   the loaded JSON data. The setter ensures every item has a `tags` property.

5. `displayData()`: Displays the loaded tags and items in their respective
   containers, making tags draggable and allowing items to accept dropped tags.

6. `exportFile()`: Exports the current data as a formatted JSON file.

## Custom Event Handling

The component uses drag and drop operations to associate tags with items:

- Tags can be dragged.
- Items can receive dropped tags, updating their `tags` property if the tag
  isn't already associated.

## Usage

To use the `TagItems` web component in your application:

1. Ensure you've imported it.
2. Add the `<tag-items></tag-items>` tag in your HTML file.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TagItems Example</title>
    <script type="module" src="https://pathall.net/tag-items/v1.0.0/TagItems.js"></script>
</head>
<body>
    <tag-items></tag-items>
</body>
</html>
```

</main>
