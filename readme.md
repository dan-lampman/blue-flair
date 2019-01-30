# Tatari Hiring Homework

This is a quick little homework assignment that we give to our potential
hires.  It's mostly intended to just make sure that people can actually
write code, but also serves as a decent indicator to how they think about
data and write code to make use of data.

## Timeboxing

We want to be respectful of your time, and the fact of the matter is
that this is essentially throwaway code, so any work on this should be
timeboxed to an hour or two, tops.  If it's not "finished," that's fine;
seeing in-progress code is just as enlightening!

## Description

Write a program in the language of your choosing that:

 * Consumes both `rotations.csv` and `spots.csv`
 * Generates output that shows cost per view by two dimensions:
   * CPV by creative
   * CPV by rotation by day

### Details

First, this is intentionally underspecified.  Feel free to ask questions,
or to just make assumptions.  If you *do* make any assumptions for the
sake of expediency, document 'em so we know you considered them!

For the purpose of this exercise, here's some terminology:

 * "Creative" - Business lingo for a TV ad
 * "Rotation" - The timerange on a TV network that an ad airs in

 # Solution

## Approach
- Parse both CSVs to arrays (rotations and spots)
- Format arrays to have proper types

  E.g.,

  `formattedRotations = {
      name,
      start,
      end
  }`

  `formattedSpots = {
      dateString,
      date,
      creativeName,
      spend,
      views
  };`

- Iterate through each spot and create buckets for the spot creative name and the rotation-spot.dateString combination
- For each spot, increment the total number of spend and views for that spot name
- For each spot, iterate through each rotation and assign the spot to the first rotation that meets the date requirements: spot.date must be greater than or equal to the rotation start and less than or equal to the rotation end. This algorithm will cause spots shown  at 3PM to be grouped into afternoon instead of prime. Unique rotation keys are composed of the rotation name and the dateString from the spot.
- Once each all the spend and views are added for each unique creative name, divide total spend by total views to get cost per view by creative name and cost per rotation name.


 ## Assumptions

- Rotation dates are always given in the form `HH:MM AM/PM`
- Spots are first assigned to afternoon instead of prime
- All dates for rotation comparison are aribitrarily given the same day (February 2, 2016). This does not impact the rotation by day analysis since rotation day keys are composed of the rotation name and spot.dateString
- Spot spend value is in dollars e.g., USD
- Spot views value is in number of views

 ## Usage

 - This solution is written in Javascript and uses Node.
 - To install the project dependencies (fast-csv): `npm install`
 - To run the solution: `npm start` or `node main.js`
