//look in my current directory for this  hidden file.
// List hidden files in dir: ls -a
const path = require('path');

require('dotenv').config({ path: `../../../../../../env.${process.env.REACT_APP_MAPS_KEY}` })


//I reccomend doing a console.log as well to make sure the names match*
console.log(`../../../../../../env.${process.env.REACT_APP_MAPS_KEY}`)
