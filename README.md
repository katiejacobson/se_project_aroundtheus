# Project 3: Around The U.S.

### Overview

- Intro
- Figma
- Images

**Description of Project**

This project is to build a responsive webpage that has a header, profile, gallery of images, and footer. The webpage should match the Figma specs for Desktop and mobile, along with any breakpoints that we deem appropriate.

This project has been updated to include JavaScript functionality including opening and closing a profile edit window and changing the name and description of the profile. Additinally, a template has been used to build the cards so future funcitonality will allow users to add cards.

Update: This project has been updated to allow users to add and delete cards of images. Users can "like" images and enlarge the pictures.

**Description of Techniques**

This is a chance to practice using flexbox and grid displays and positioning elements for different display sizes. While the gallery of images is responsive due to grid and grid-template-columns with auto-fit, media queries were used to make breakpoints at 480px and 785px. Flexbox was used for the profile elements and changing to flex-direction: columns at lower screen sizes allowed a reorganization of the profile elements so they stacked on top of each other.

Vanilla JS has been used to add functionality including opening and closing profile edit boxes and changing the name and description in the profile. A template card has been used to allow rendering of cards from an array of objects.

Update: Users can input data (name and image url) into the "add card" form and a new card will be added with the name and image. Additionally, classList.add and classList.remove have been used to allow modals to be opened and closed.

**Figma**

- [Link to the project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)

https://www.figma.com/file/JFPhASqvZ5pBjQV2ouUlim/Sprint-5_-Around-The-U.S.-_-desktop-%2B-mobile-&#40;Copy&#41;?t=3hvVWRz9LUFsxyNn-6

**Images**  
./images/Desktop-Demo.png
./images/Mobile-Demo.png
./images/Tablet-Demo.png

**Github Pages URL**
https://katiejacobson.github.io/se_project_aroundtheus/

**Video Explanation**
https://drive.google.com/file/d/16A_3bRf7MviHZc_8syy4p5sqec1dWMep/view?usp=sharing

**To Improve**

I would like to make a smoother transition for the breakpoint at 785px since I transitioned from grid to flexbox for the profile element and the transition is pretty jarring.

I would like to add the capability to add more text for each card so it could function as a "travel diary" or sorts.
