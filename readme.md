 # Solution

Total solution time was approximately 40 minutes.

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
- Once each all the spend and views are added for each unique creative name, divide total spend by total views to get cost per view by creative name and cost per rotation name. This value is then rounded to two decimal places.


 ## Assumptions

- Rotation dates are always given in the form `HH:MM AM/PM`
- Spots are first assigned to afternoon instead of prime
- All dates for rotation comparison are aribitrarily given the same day (February 2, 2016). This does not impact the rotation by day analysis since rotation day keys are composed of the rotation name and spot.dateString
- Spot spend value is in dollars e.g., USD
- Spot views value is in number of views

 ## Usage

 - This solution is written in Javascript and uses Node
 - To install the project dependencies (fast-csv): `npm install`
 - To run the solution: `npm start` or `node main.js`
