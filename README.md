# Rick and Morty Challange
> Challenge made by Sirius Software

## Libraries used
- typescript
- vitejs as development environment (added svgr loading feature to use some assets as react components)
- sass for styling
- react table v7 for the tables
- font awesome for some extra icons needed

## Techical Challenges
- data and table management has its own challenges, even though im familiar with react table v7, some design details were a bit hardcoded to match them:
    - separation between header and first row, since margins and paddings cant be added to thead and tbody because of how those html primitives work (they calculate the height and manage it), i had to add an empty row to function as this separation.
    - had some troubles setting up correctly the widths of the columns, react table v7 did not help with this and even though I put width/min-width/max-width hardcoded, still depending on the table width, it doesn't goes through. On the other side, the product looks good.