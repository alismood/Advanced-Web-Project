# Recipe Share

## Website and How to Use It

[Open Recipe Share](https://alismood.github.io/Web-dev-midterm/)

- Open Recipes to search and filter dishes, find more recipes online, or add dishes to your recipe list.
- Open Gallery to enlarge photos, or About to read the FAQ; use the navigation button to switch between light and dark themes.
- The Forms page demonstrates validation and local sign-in without sending messages or creating real accounts; the recipe list resets when you reload the page.

## Technologies I Learned

- **HTML:** page structure, forms, tables, and accessibility attributes.
- **CSS:** styling, Flexbox, Grid, and responsive layouts with media queries.
- **CSS variables:** shared colors for light and dark themes.
- **Bootstrap:** responsive columns, navigation, buttons, and form styles.
- **JavaScript and DOM manipulation:** functions, arrays, loops, events, and updating page content.
- **jQuery:** selectors, event handling, sliding FAQ answers, and gallery fade effects.
- **APIs, fetch(), and JSON:** requesting recipe data from TheMealDB and displaying the results.
- **Promises:** handling asynchronous responses with .then() and errors with .catch().
- **localStorage:** keeping the chosen theme and local sign-in details after refreshing.
- **Form validation and RegEx:** checking required fields, email format, password strength, and matching passwords.
- **CRUD:** adding, reading, updating, and deleting recipes in a table.

## Goal

The goal is project-based learning of frontend and backend development by building a working recipe website. This version focuses on the frontend and communication with an external backend through a public API.

## Step by Step Coding Process

1. Create the five HTML pages and connect them with a shared navigation bar.
2. Add shared styles in css/style.css and build the layouts with Flexbox and Grid.
3. Use Bootstrap and media queries to adapt the pages for phones, tablets, and computers.
4. Add JavaScript events in js/script.js to search recipes and filter them by category.
5. Store recipe records in an array and build the table controls for adding, editing, and deleting entries.
6. Add form validation, email checks, password strength feedback, and password confirmation.
7. Use jQuery to build the gallery viewer and sliding FAQ answers.
8. Add light and dark themes with CSS variables, then save the selected theme in localStorage.
9. Add local sign-in and sign-out, saving only the name and email in localStorage.
10. Connect TheMealDB with fetch(), read the JSON response, and display recipe cards with loading, no-results, and error messages.
11. Check navigation, keyboard controls, forms, saved settings, and layouts at different screen sizes.
12. Publish the website with GitHub Pages and check the published version.
