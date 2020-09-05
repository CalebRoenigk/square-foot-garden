import moment from 'moment';
import { SVG } from '@svgdotjs/svg.js';
import filterWith from '@svgdotjs/svg.filter.js';


// This is the save file format
class SaveFile {
  constructor(save_object, location_object, current_step_object, beds_array) {
    this.save_data = save_object;
    this.location = location_object;
    this.current_step = current_step_object;
    this.beds = beds_array;
  }
}



// This function generates a new bed
function bedAddition() {
  // Determine what the bed id will be
  // Get the total number of beds
  let totalBeds = document.querySelectorAll('.content-bed-item').length;
  // If adding another bed would put you over the 26 bed limit, notify the user no more beds can be made
  if(totalBeds > 25) {
    // Create a new ID for the warning
    let warnID = new Date().getTime();
    // Add the warning crumb
    document.querySelector('.viewport-ui').insertAdjacentHTML('beforeend', '<div class="warn-viewport warn-crumb warn-primary" id="warn-' + warnID +'">You can’t create any more beds.</div>');

    // Animate the warning crumb
    gsap.timeline()
      .from('#warn-' + warnID, {duration: .25, ease: 'linear', opacity: 0})
      .from('#warn-' + warnID, {duration: .5, ease: 'power3.out', y: '75%'}, '-=.25')
      .to('#warn-' + warnID, {duration: .5, ease: 'linear', opacity: 0}, '+=1')
      .call(removeByAttr, ['#', 'warn-' + warnID], '+=.5')
  } else {
    // Another bed can be added
    if(totalBeds == 0) {
      // No beds exist, create the first one
      newBedInput('a', totalBeds);
    } else {
      // This function gives the next character from an input character
      function nextChar(c) {
          return String.fromCharCode(c.charCodeAt(0) + 1);
      }

      // Dictate the new bed id based on the id of the most recent bed id
      let previousBedID = document.querySelectorAll('.content-bed-item')[document.querySelectorAll('.content-bed-item').length-1].getAttribute('data-bed-id').split('_')[1];
      // Create the new bed
      newBedInput(nextChar(previousBedID), totalBeds);
    }

    // Update the bounds of the viewport to show all beds
    updateViewBounds()
  }

  // This function create input controls for a bed
  function newBedInput(bedID, bedCount) {
    // Add the bed parent
    document.querySelector('.content-bed-add').insertAdjacentHTML('beforebegin', '<div class="content-bed-item" data-bed-id="bed_' + bedID + '"></div>');
    let bedLabel = '<div class="bed-label"><div class="subtract-icon"></div><input type="text" class="input-text-nofill" value="Bed ' + bedID.toUpperCase() + '" id="bed_' + bedID + '_name"></input></div>';
    let bedWidthSlider = '<div class="bed-slider"><div class="container"><input type="range" min="1" max="12" value="2" step="1" class="width-range" id="bed_' + bedID + '_width" data-label="Width" list="bed_' + bedID + '_width-tick-list"><datalist id="bed_' + bedID + '_width-tick-list"></datalist></div><div class="slider-value" id="bed_' + bedID + '_width-value">2</div></div>';
    let bedHeightSlider = '<div class="bed-slider"><div class="container"><input type="range" min="1" max="12" value="2" step="1" class="height-range" id="bed_' + bedID + '_height" data-label="Height" list="bed_' + bedID + '_height-tick-list"><datalist id="bed_' + bedID + '_height-tick-list"></datalist></div><div class="slider-value" id="bed_' + bedID + '_height-value">2</div></div>';
    // Add the 3 main elements to the bed item
    document.querySelector('div[data-bed-id="bed_' + bedID + '"]').insertAdjacentHTML('beforeend', bedLabel);
    document.querySelector('div[data-bed-id="bed_' + bedID + '"]').insertAdjacentHTML('beforeend', bedWidthSlider);
    document.querySelector('div[data-bed-id="bed_' + bedID + '"]').insertAdjacentHTML('beforeend', bedHeightSlider);
    // Add the ticks to each range slider
    document.querySelectorAll('div[data-bed-id="bed_' + bedID + '"] datalist').forEach(function(e) {
      // Add 12 ticks (1 for every value in the slider)
      for(var i=0; i < 12; i++) {
        document.querySelector('#' + e.id).insertAdjacentHTML('beforeend', '<option></option>');
      }
    });
    // Add event listeners to each range to update the slider value display on input
    document.querySelectorAll('div[data-bed-id="bed_' + bedID + '"] input[type="range"]').forEach(function(e) {
      e.addEventListener('input', function(r) {
        document.querySelector('#' + this.id + '-value').innerHTML = this.value;
        if(this.getAttribute('data-label') == 'Height') {
          SVG('#bed_' + bedID).height(this.value*100);
          //moveAlongHeight()
        } else {
          //moveAlongRow(parseInt(SVG('#bed_' + bedID).attr('data-row')), parseInt(SVG('#bed_' + bedID).attr('data-column')), SVG('#bed_' + bedID).width(), this.value*100);
          SVG('#bed_' + bedID).width(this.value*100);
        }
        // Redraw the shadow
        redrawShadow(bedID, SVG('#bed_' + bedID));

        // Check to update the viewport
        updateViewBounds();

      }, true);
    });
    // Add event listener to the minus button to allow for bed removal
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] .subtract-icon').addEventListener('click', function(e) {
      // Delete the DOM element
      document.querySelector('div[data-bed-id="bed_' + bedID + '"]').remove();
      // Delete the SVG elements
      SVG('#bed_' + bedID).remove();
      let filterID = SVG('#bed_' + bedID + '_shadow').attr('filter').split(')')[0].substr(4,SVG('#bed_' + bedID + '_shadow').attr('filter').length);
      SVG(filterID).remove();
      SVG('#bed_' + bedID + '_shadow').remove();
      SVG('#bed_' + bedID + '_label').remove();

      // Check to update the viewport
      updateViewBounds();
    }, true);
    // Add event listener to the label name to update bed label name
    document.querySelector('#bed_' + bedID + '_name').addEventListener('input', function(e) {
      SVG('#bed_' + bedID).attr({'data-name': this.value});
      document.querySelector('#bed_' + bedID + '_label').textContent = this.value;
    }, true);
    // Add event listener to the label name to set the default name if the label has no value after user leaves input
    document.querySelector('#bed_' + bedID + '_name').addEventListener('change', function(e) {
      // If the value of the label is nothing or only spaces replace the label with the default name
      if(this.value == '' || !this.value.replace(/\s/g, '').length) {
        this.value = this.id.split('_').splice(0,2).join(' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        document.querySelector('#bed_' + bedID + '_label').textContent = this.value;
      }
    }, true);

    // Add the new bed to the viewport
    let newWidth = document.querySelector('#bed_' + bedID + '_width').value;
    let newHeight = document.querySelector('#bed_' + bedID + '_height').value;
    // Determine where the new bed will go
    let xPlacement;
    let yPlacement;
    if(bedID !== 'a') {
      // This is not the first bed
      let previousBedID = document.querySelectorAll('.content-bed-item')[document.querySelectorAll('.content-bed-item').length-2].getAttribute('data-bed-id').split("_")[1];
      let previousBBox = SVG('#bed_' + previousBedID).bbox();
      // Place the bed 1 cell away on the x from the previous bed
      xPlacement = previousBBox.x + previousBBox.width + 100;
      yPlacement = previousBBox.y;
    }

    // If the bed is the 6th bed in the bed row, move the bed down to another row
    if(bedCount%5 == 0 && bedCount !== 0) {
      // Iterate over all the current bed rects and find the highest y2 value and the lowest x value
      let maxY = 0;
      let minX = 0;
      document.querySelectorAll('#bed-group rect').forEach(function(e, i) {
        let currentID = e.id;
        if(i == 0) {
          maxY = SVG('#' + currentID).bbox().y2;
          minX = SVG('#' + currentID).bbox().x;
        }
        if(SVG('#' + currentID).bbox().y2 > maxY) {
          maxY = SVG('#' + currentID).bbox().y2;
        }
        if(SVG('#' + currentID).bbox().x < minX) {
          minX = SVG('#' + currentID).bbox().x;
        }
      })
      // Set the placement to the next row
      xPlacement = minX;
      yPlacement = maxY + 100;
    } else {
      xPlacement = xPlacement || 300;
      yPlacement = yPlacement || 300;
    }
    var newBed = draw.rect(newWidth*100, newHeight*100).attr({x: xPlacement, y: yPlacement, id: 'bed_' + bedID, 'data-name': document.querySelector('#bed_' + bedID + '_name').value, fill: '#dddee0', 'data-row': Math.floor(((bedCount)/5)), 'data-col': (bedCount%5)}).stroke({width: 6, color: '#ffffff'}).putIn(bedGroup);
    drawShadow(bedID, newBed);
  }

  // This function re-draws the plain shadow of the bed
  function redrawShadow(bedID, bedElement) {
    let shadowFilter = SVG('#bed_' + bedID + '_shadow').filterer();
    SVG('#bed_' + bedID + '_shadow').remove();
    let cellSize = 100;
    let bedBBox = SVG('#bed_' + bedID).bbox();
    // Draw the shadow
    let shadowPoints = [bedBBox.x + ',' + bedBBox.y, (bedBBox.x+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y2-(cellSize/2)), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
    let shadowPath = draw.polygon(shadowPoints.join(' ')).fill('#596475').attr({id: 'bed_' + bedID + '_shadow', opacity: .2});

    // Blur the shadow
    shadowPath.filterWith(shadowFilter);

    // Place the bed shadow behind the bed
    shadowPath.insertBefore(bedElement);

    // Place the text label infront of the bed
    SVG('#bed_' + bedID + '_label').attr({x: bedBBox.cx, y: bedBBox.cy}).insertAfter(bedElement);
  }

  // This function draws the shadow for the first time
  function drawShadow(bedID, bedElement) {
    let cellSize = 100;
    let bedBBox = SVG('#bed_' + bedID).bbox();
    // Draw the shadow
    let shadowPoints = [bedBBox.x + ',' + bedBBox.y, (bedBBox.x+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y2-(cellSize/2)), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
    let shadowPath = draw.polygon(shadowPoints.join(' ')).fill('#596475').attr({id: 'bed_' + bedID + '_shadow', opacity: .2});

    // Blur the shadow
    shadowPath.filterWith(function(add) {
      add.gaussianBlur(5);
    })

    // Place the bed shadow in bed group
    shadowPath.putIn(SVG('#bed-group'));

    // Place the label inside of the bed
    let newBedTitle = draw.plain(document.querySelector('#bed_' + bedID + '_name').value).font({family: 'Surt Exp', size: '1.75em', anchor: 'middle'}).attr({fill: '#ffffff', x: bedBBox.cx, y: bedBBox.cy, id: 'bed_' + bedID + '_label', style: 'transform: translate(0px, .4375em);'}).putIn(SVG('#bed-group'));

    // Move the bed forward
    SVG('#bed_' + bedID).forward()
  }

  // This function animates to a new viewport bounds to show all beds
  function updateViewBounds() {
    // Create a bounds object to store the min/max values
    let bounds = {
      min: {x: 0, y: 0},
      max: {x: 0, y:0}
    }

  document.querySelectorAll('#bed-group *').forEach(function (e, i) {
      // Text the lower and upper bounds for the object and store them in the bounds array if they are larger than the current values
      let bbox = SVG('#' + e.id).bbox();
      // If the element is the first in the iteration, set the bounds min/max values to its values
      if(i == 0) {
        bounds.min.x = bbox.x;
        bounds.min.y = bbox.y;
        bounds.max.x = bbox.x2;
        bounds.max.y = bbox.y2;
      }
      if(bbox.x < bounds.min.x) {
        bounds.min.x = bbox.x;
      }
      if(bbox.y < bounds.min.y) {
        bounds.min.y = bbox.y;
      }
      if(bbox.x2 > bounds.max.x) {
        bounds.max.x = bbox.x2;
      }
      if(bbox.y2 > bounds.max.y) {
        bounds.max.y = bbox.y2;
      }
    });

    // Add a 2 cell margin around the entire view bounds
    bounds.min.x = bounds.min.x-(100*2);
    bounds.min.y = bounds.min.y-(100*2);
    bounds.max.x = bounds.max.x+(100*2);
    bounds.max.y = bounds.max.y+(100*2);

    // Animate the viewport to the new viewbox
    draw.animate(375, 0, 'now').ease('<>').viewbox(bounds.min.x, bounds.min.y, bounds.max.x, bounds.max.y).attr({opacity: 1});

    // Update the grid size
    document.querySelectorAll('line[data-type="grid-line"]').forEach(function(e) {
      e.remove();
    })
    updateGrid(draw, 100, bounds);

    // This function renders the viewport grid
    function updateGrid(svgObject, cellSize, boundsObj) {
      // Determine the max size of the grid by adding 2 cell margins to the passed bounds
      boundsObj.min.x = boundsObj.min.x-(cellSize*2);
      boundsObj.min.y = boundsObj.min.y-(cellSize*2);
      boundsObj.max.x = boundsObj.max.x+(cellSize*2);
      boundsObj.max.y = boundsObj.max.y+(cellSize*2);

      var grid = SVG('#grid-floor');
      let lowBedBounds = {x: SVG('#bed_a').bbox().x, y: SVG('#bed_a').bbox().y};
      let highBedBounds = {x: SVG('#bed_a').bbox().x2, y: SVG('#bed_a').bbox().y2};
      // Iterate over all the beds to find the furthest to the left bed
      document.querySelectorAll('#bed-group rect').forEach(function(e) {
        if(e.getBBox().x < lowBedBounds.x) {
          lowBedBounds = {x: e.getBBox().x, y: e.getBBox().y};
        }
        if((e.getBBox().x + e.getBBox().width) > highBedBounds.x) {
          highBedBounds = {x: (e.getBBox().x + e.getBBox().width), y: (e.getBBox().y + e.getBBox().height)};
        }
      })
      // Iterate over the width, placing lines vertically
      for(var i=0; i < ((highBedBounds.x - lowBedBounds.x)/cellSize)+12; i++) {
        let line = svgObject.line(lowBedBounds.x + ((i-6)*cellSize), lowBedBounds.y-(cellSize*20), lowBedBounds.x + ((i-6)*cellSize), lowBedBounds.y+(highBedBounds.x - lowBedBounds.x)+(cellSize*20)).stroke({ width: 1, color: '#d8dadd', opacity: 1}).attr({'data-type': 'grid-line'});
        grid.add(line);
      }

      // Iterate over the height, placing lines horizontally
      for(var i=0; i < ((highBedBounds.x - lowBedBounds.x)/cellSize)+60; i++) {
        let line = svgObject.line(lowBedBounds.x-(cellSize*20), lowBedBounds.y + ((i-40)*cellSize), lowBedBounds.x+(highBedBounds.x - lowBedBounds.x)+(cellSize*20), lowBedBounds.y + ((i-40)*cellSize)).stroke({ width: 1, color: '#d8dadd', opacity: 1}).attr({'data-type': 'grid-line'})
        grid.add(line);
      }

      grid.after(bedGroup);
    }
  }

  // This function moves all items in the same row left or right based on width change
  function moveAlongRow(row, col, previousWidth, currentWidth) {
    // Iterate over the row
  }
}

// TEMP CODE
// Add event listener to Add Bed button when clicked
document.querySelector('.content-bed-add').addEventListener('click', function() {
  bedAddition();
}, true);

// This function removes a warning crumb based on the passed ID
function removeByAttr(attr, value) {
  document.querySelector(attr + value).remove();
}

// Create a viewport svg right off the bat
var draw = SVG().addTo('.viewport').size('100%', '100%').attr({id: 'viewport-svg', opacity: 0}).viewbox('0 150 850 500');
var bedGroup = draw.group().attr({id: 'bed-group'});
var gridGroup = draw.group().attr({id: 'grid-floor'});

// Auto-saving function
var autoSave = setTimeout(function() {
  saveState();
}, 5000);

// This function saves the current progress
function saveState() {
  // Save Info
  let save_date = moment().unix();
  let save_name = '_autosave-1';
  let autosave = true;
  let saveObject = {
    save_date,
    save_name,
    autosave
  }
  // Location Info
  let type = 'lat/long';
  let value = [-35.59673, 78.02848];
  let hardiness = 4;
  let locationObject = {
    type,
    value,
    hardiness
  }
  // Current Step
  let step = 'bed-layout';
  let view = '';
  let currentStepObject = {
    step,
    view
  }
  // Crops
  // CODE HERE

  // Beds
  let bedsArray = [];
  // Iterate over each bed, adding a bed object to the bed array
  document.querySelectorAll('.content-bed-item').forEach(function(e) {
    let bed_id = e.getAttribute('data-bed-id');
    let bed_name = document.querySelector('#' + bed_id + '_name').value;
    let bed_width = document.querySelector('#' + bed_id + '_width').value;
    let bed_height = document.querySelector('#' + bed_id + '_height').value;
    let bed_cells = {};
    // Iterate over each row, adding its rows to the cells object
    for(var i=0; i < bed_height; i++) {
      let row_name = 'row_' + (i+1);
      let rowArray = [];
      // Iterate over each cell within the row, adding its data to the row array
      for(var j=0; j < bed_width; j++) {
        let cell_id = i + j;
        let cell_contents = [];
        let cell_object = {
          cell_id,
          cell_contents
        }

        // Add the cell object to the row array
        rowArray.push(cell_object);
      }
      bed_cells[row_name] = rowArray;
    }

    let bedObject = {
      bed_id,
      bed_name,
      bed_width,
      bed_height,
      bed_cells
    }

    // Add the current bed object to the bed array
    bedsArray.push(bedObject);
  })

  let saveFile = new SaveFile(saveObject, locationObject, currentStepObject, bedsArray)

  console.log(saveFile)
}


// This function writes data to local storage
// Expire time is an array which contains an operation cue and a value given the operation
function writeLocalStorage(name, data, expireTime, category) {
  let expiringEpoch = 0;
  if(expireTime[0] == 'epoch') {
    // Expire time provided as an exact epoch time
    expiringEpoch = expireTime[1];
  }
  if(expireTime[0] == 'hourstil') {
    // Expire time provided as hours until
    let date = new Date();
    let exp = date.setTime(+ date + (expireTime[1] * 3600000));

    expiringEpoch = Math.floor(exp/1000);
  }
  if(expireTime[0] == 'eod') {
    // Expire time set to End of current day
    let midnight = new Date();
    midnight.setHours(23,59,59,0);

    expiringEpoch = midnight.getTime()/1000;
  }
  if(expireTime[0] == 'never') {
    // Expire time set to a long time in the future
    let date = new Date();
    let exp = date.setTime(+ date + (10000000000 * 3600000));

    expiringEpoch =  Math.floor(exp/1000);
  }


  category = category || 'Default';

  const item = {
    value: data,
    category: category,
    expiry: expiringEpoch
  }

  localStorage.setItem(name, JSON.stringify(item));
}

// This function reads data from local storage and returns the data and expiry in an object
function readLocalStorage(name) {
  let fetchedItem = JSON.parse(localStorage.getItem(name));

  const item = {
    'value': fetchedItem.value,
    'category': fetchedItem.category,
    'expiry': fetchedItem.expiry
  }

  return item;
}

// This function checks for an item in local storage, returns a bool value if the item exists or not
function checkLocalStorage(name) {
  if(localStorage.getItem(name) === null) {
    return false;
  } else {
    return true;
  }
}

// This function removes an item from local storage
function removeItemLocalStorage(name) {
  localStorage.removeItem(name);
}

// This function removes items from local storage that have expired
function expireLocalStorage() {
  let search = [],
      keys = Object.keys(localStorage),
      i = 0, key;

  for (; key = keys[i]; i++) {
    let item = JSON.parse(localStorage.getItem(key));
    let currentTime = new Date();
    currentTime = Math.floor(currentTime.getTime()/1000);
    if(item.expiry <= currentTime) {
      removeItemLocalStorage(key);
    }

  }
}

// This function looks for items in local storage that match a category tag
function localStorageCategorySearch(category) {
  let search = [],
      keys = Object.keys(localStorage),
      i = 0, key;

  for (; key = keys[i]; i++) {
    let item = JSON.parse(localStorage.getItem(key));
    if(item.category == category) {
      search.push(key);
    }
  }

  // If items are found return their key array, else return false
  if(search.length > 0) {
    return search;
  } else {
    return false;
  }
}
