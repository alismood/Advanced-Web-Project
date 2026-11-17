# Recipe Share
[OurWebsite](https://alismood.github.io/Web-dev-midterm/)

## Description

Recipe Share is a website for finding simple dishes and reading cooking steps. It has five pages and works on phones, tablets, and computers.

## Team

Our group is IT-2503. The members are Zhabaikhan Ali, Abdul Mobin, and Diyar Kabyken.

## Home

The home page introduces the website. It has links to the recipes, gallery, and contact page.

<img width="1470" height="836" alt="Screenshot 2026-11-11 at 18 28 27" src="https://github.com/user-attachments/assets/429ea09c-76b8-4c39-bf60-a89d8a7ac09b" />


## About

The about page explains the website. It also shows the three team members.
<img width="1470" height="834" alt="Screenshot 2026-11-11 at 18 28 41" src="https://github.com/user-attachments/assets/b52e678a-fd56-4df3-92a5-b04bd39d643d" />


## FAQ

The About page has five common questions about using Recipe Share. Answers open and close with jQuery slideToggle(), and a plus or minus sign shows whether each answer is open.

[Paste a screenshot of the FAQ with an open answer here.]

## Recipes

Users can search recipes by name or ingredient and filter them by category. The results change as they type, and the search works with uppercase and lowercase letters.

<img width="1466" height="327" alt="Screenshot 2026-11-11 at 18 29 10" src="https://github.com/user-attachments/assets/06118e46-ee7d-4b24-b381-17107024a181" />
<img width="1470" height="646" alt="Screenshot 2026-11-11 at 18 29 24" src="https://github.com/user-attachments/assets/cca4ef0c-85f6-4bab-a750-049bcf6b02fa" />


## Online Recipes

Users can search for dishes from [TheMealDB](https://www.themealdb.com/docs_api_guide.php) with fetch() and view the JSON results as recipe cards. Each card shows a name, photo, category, and cooking instructions. Messages show when recipes are loading, no matches are found, or the request fails.

[Paste a screenshot of the online recipe results here.]

[Paste a screenshot of the no-results or error message here.]

## Recipe List

Users can add, view, edit, and delete recipes in a table. A confirmation appears before deleting, and the list resets when the page reloads.



## Gallery

The gallery uses CSS Grid to display food photos. Clicking a photo opens a larger view with previous and next buttons and fade effects.
<img width="1470" height="830" alt="Screenshot 2026-11-11 at 18 30 18" src="https://github.com/user-attachments/assets/72bdfffd-46f1-46b3-be64-43c220e68b42" />


<img width="1470" height="820" alt="Screenshot 2026-11-11 at 18 30 31" src="https://github.com/user-attachments/assets/5729fd07-10f6-4f66-978e-f14ea1ca88c6" />


## Contact and Registration

The forms check required fields, email format, password length, and matching passwords. The password strength label changes between weak, medium, and strong as the user types. These practice forms show feedback without creating accounts or sending messages.

<img width="1470" height="829" alt="Screenshot 2026-11-11 at 18 31 07" src="https://github.com/user-attachments/assets/9fd97628-3ba1-498d-bd43-e6b4a76f69fe" />


<img width="762" height="371" alt="Screenshot 2026-11-11 at 18 31 29" src="https://github.com/user-attachments/assets/c6792e4b-69a7-4993-960b-efddb0c80390" />


## Theme

The theme button switches every page between light and dark colors. The choice is saved in localStorage and stays after refreshing or opening another page.

[Paste screenshots of the light and dark themes here.]

## Sign In

The sign-in form checks the name and email, then saves them in localStorage on this browser. A welcome message and sign-out button appear on every page, and signing out removes the saved user details. This is a local demo and does not check account passwords.

[Paste screenshots of the sign-in form and welcome message here.]

## Layout

Recipe cards use Flexbox, and the gallery uses CSS Grid. Bootstrap columns and media queries adjust the pages for small screens.

## Technologies

The website uses HTML, CSS, Bootstrap, JavaScript, and jQuery. The code uses basic variables, arrays, loops, functions, events, and page updates.

<<<<<<< HEAD

=======
>>>>>>> e5e6ac2 (init)
## Files

The five HTML files contain the pages, and css/style.css contains the styles. The interactive features are in js/script.js, and the Bootstrap and jQuery libraries are in vendor.

<<<<<<< HEAD
## Contributions
### Zhabaikhan Ali

Did the Home page and about page
=======
## Run

Open the website with a local web server, such as VS Code Live Server, so saved details work across pages. Bootstrap and jQuery are included locally, but the food photos need an internet connection.

## Responsibilities

This is a proposed split of the final work. Confirm that it matches each member's actual contribution before submitting.

### Zhabaikhan Ali

Earlier work covered the Home and About pages. Final responsibilities are the saved light and dark themes, the FAQ, and their documentation.
>>>>>>> e5e6ac2 (init)

### Abdul Mobin

Earlier work covered the Recipes and Gallery pages. Final responsibilities are the recipe API, result cards, request messages, and their documentation.

### Diyar Kabyken

Earlier work covered the Contact page. Final responsibilities are sign-in validation, saved user details, sign-out, and their documentation.

## Report

Recipe Share Report.docx contains the group defense guide. It lists assigned features, demo steps, code to study, and practice questions for each member.

## Links

Website: https://alismood.github.io/Web-dev-midterm/

Repository: https://github.com/alismood/Web-dev-midterm

## Development Support

AI tools supported development, testing, and troubleshooting. Each member should review the code and understand the features they present.
