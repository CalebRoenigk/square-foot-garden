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
  // Change the style of the forward button
  document.querySelector('.button-forward').setAttribute('class', 'button-primary button-forward');
  // Determine what the bed id will be
  // Get the total number of beds
  let totalBeds = document.querySelectorAll('.content-bed-item').length;
  // If adding another bed would put you over the 26 bed limit, notify the user no more beds can be made
  if(totalBeds > 25) {
    // Grey out the add bed button
    document.querySelector('.content-bed-add').setAttribute('style', 'color: #596475; opacity: .38; pointer-events: none; cursor: not-allowed;');
    document.querySelector('.add-icon').setAttribute('class', 'add-icon-null');
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
    // Ungrey the add bed button
    document.querySelector('.content-bed-add').removeAttribute("style");
    if(document.querySelector('.add-icon-null') !== null) {
      document.querySelector('.add-icon-null').setAttribute('class', 'add-icon');
    }
    // Another bed can be added
    if(totalBeds == 0) {
      // No beds exist, create the first one
      addBed('a', totalBeds);
    } else {
      // This function gives the next character from an input character
      function nextChar(c) {
          return String.fromCharCode(c.charCodeAt(0) + 1);
      }

      // Dictate the new bed id based on the id of the most recent bed id
      let previousBedID = document.querySelectorAll('.content-bed-item')[document.querySelectorAll('.content-bed-item').length-1].getAttribute('data-bed-id').split('_')[1];
      // Create the new bed
      addBed(nextChar(previousBedID), totalBeds);
    }

    // Update the bounds of the viewport to show all beds
    updateViewBounds()
  }

  // This function creates a new bed
  function addBed(bedID, bedCount) {
    let cellSize = 100;
    // Add the DOM elements
    // Add the bed parent
    document.querySelector('.content-bed-add').insertAdjacentHTML('beforebegin', '<div class="content-bed-item" data-bed-id="bed_' + bedID + '"><div class="container"></div></div>');
    let bedLabel = '<div class="bed-label"><div class="subtract-icon"></div><input type="text" class="input-text-nofill" value="Bed ' + bedID.toUpperCase() + '" id="bed_' + bedID + '_name"></input></div>';
    let bedWidthSlider = '<div class="bed-slider"><div class="container"><input type="range" min="1" max="12" value="2" step="1" class="width-range" id="bed_' + bedID + '_width" data-label="Width" list="bed_' + bedID + '_width-tick-list"><datalist id="bed_' + bedID + '_width-tick-list"></datalist></div><div class="slider-value" id="bed_' + bedID + '_width-value">2</div></div>';
    let bedHeightSlider = '<div class="bed-slider"><div class="container"><input type="range" min="1" max="12" value="2" step="1" class="height-range" id="bed_' + bedID + '_height" data-label="Height" list="bed_' + bedID + '_height-tick-list"><datalist id="bed_' + bedID + '_height-tick-list"></datalist></div><div class="slider-value" id="bed_' + bedID + '_height-value">2</div></div>';
    // Add the 3 main elements to the bed item
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] > .container').insertAdjacentHTML('beforeend', bedLabel);
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] > .container').insertAdjacentHTML('beforeend', bedWidthSlider);
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] > .container').insertAdjacentHTML('beforeend', bedHeightSlider);
    // Add the ticks to each range slider
    document.querySelectorAll('div[data-bed-id="bed_' + bedID + '"]  > .container datalist').forEach(function(e) {
      // Add 12 ticks (1 for every value in the slider)
      for(var i=0; i < 12; i++) {
        document.querySelector('#' + e.id).insertAdjacentHTML('beforeend', '<option></option>');
      }
    });

    // Functionality
    // Add event listener to the minus button to allow for bed removal
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] .subtract-icon').addEventListener('click', function(e) {
      // Delete the DOM element
      document.querySelector('div[data-bed-id="bed_' + bedID + '"]').remove();
      // If there are no more beds, grey out the forward button
      if(document.querySelectorAll('.panel-content > div').length == 1) {
        // Change the style of the forward button
        document.querySelector('.button-forward').setAttribute('class', 'button-no-select button-forward');
      }
      // Delete the SVG elements
      let filterID = SVG('#bed_' + bedID + '_shadow').attr('filter').split(')')[0].substr(4,SVG('#bed_' + bedID + '_shadow').attr('filter').length);
      let missingCol = SVG('#bed_' + bedID).attr('data-col');
      // Add the col value to the parent row in the missing data tag
      let currentMissing = SVG('#row-' + SVG('#bed_' + bedID).attr('data-row')).attr('data-missing');
      if(currentMissing == null || currentMissing == 'undefined') {
        SVG('#row-' + SVG('#bed_' + bedID).attr('data-row')).attr('data-missing', missingCol);
      } else {
        // Add the new element to the existing tag
        let existingValue = SVG('#row-' + SVG('#bed_' + bedID).attr('data-row')).attr('data-missing');
        let unsortedArray = existingValue + ',' + missingCol;
        unsortedArray = unsortedArray.split(',');
        let sortedArray = unsortedArray.sort();
        SVG('#row-' + SVG('#bed_' + bedID).attr('data-row')).attr('data-missing', sortedArray.join(','));
      }

      SVG(filterID).remove();
      SVG('#bed_' + bedID).remove();
      // Check to update the viewport
      updateViewBounds();

      // Ungrey the add bed button
      document.querySelector('.content-bed-add').removeAttribute("style");
      if(document.querySelector('.add-icon-null') !== null) {
        document.querySelector('.add-icon-null').setAttribute('class', 'add-icon');
      }
    }, true);
    // Add event listener to the label name to set the default name if the label has no value after user leaves input
    document.querySelector('#bed_' + bedID + '_name').addEventListener('change', function(e) {
      // If the value of the label is nothing or only spaces replace the label with the default name
      if(this.value == '' || !this.value.replace(/\s/g, '').length) {
        this.value = this.id.split('_').splice(0,2).join(' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        manageBed(bedID);
      }
    }, true);
    // Add event listeners to each range to update the slider value display on input
    document.querySelectorAll('div[data-bed-id="bed_' + bedID + '"] input[type="range"]').forEach(function(e) {
      e.addEventListener('input', function(r) {
        document.querySelector('#' + this.id + '-value').innerHTML = this.value;
        manageBed(bedID);

        // Check to update the viewport
        updateViewBounds();

      }, true);
    });
    // Add event listener to the label name to update bed label name
    document.querySelector('#bed_' + bedID + '_name').addEventListener('input', function(e) {
      manageBed(bedID);
    }, true);

    // Calculate what row and column the bed will reside in
    // Check to make sure the number of total beds is the same as the amount of beds that exist
    let bedRow = 0;
    let bedCol = 0;
    let missingBeds = document.querySelectorAll('g[data-missing]').length;
    if(missingBeds == 0) {
      bedRow = Math.floor(bedCount/5);
      bedCol = bedCount%5;
    } else {
      bedRow = parseInt(document.querySelectorAll('g[data-missing]')[0].getAttribute('id').split('-')[1]);
      if(document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').length !== 1) {
        parseInt(bedCol = document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing'));
      } else {
        bedCol = parseInt(document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').split(',')[0]);
      }


      // Remove the item from the missing tag
      if(document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').split(',').length == 1) {
        document.querySelectorAll('g[data-missing]')[0].removeAttribute('data-missing');
      } else {
        document.querySelectorAll('g[data-missing]')[0].setAttribute('data-missing', document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').substr(2, document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').length));
      }
    }

    // Add the row group if it does not already exist
    if(document.querySelector('#row-' + bedRow) == null) {
      draw.group().attr({id: 'row-' + bedRow}).putIn(SVG('#bed-group'));
    }

    // Add a group for the current bed into the correct row
    let bedItem = draw.group().attr({id: 'bed_' + bedID, 'data-name': document.querySelector('#bed_' + bedID + '_name').value, 'data-row': bedRow, 'data-col': bedCol}).putIn(SVG('#row-' + bedRow));

    let xPlace = 0;
    let yPlace = 0;

    // Determine the current x/y placement for the new bed
    if(bedCount !== 0 && bedCol !== 0) {
      // The bed is in an existing row
      xPlace = SVG('#row-' + bedRow + ' g[data-col="' + (bedCol-1) + '"] rect').bbox().x2 + cellSize;
      yPlace = SVG('g[data-row="' + bedRow + '"] rect').bbox().y;
    } else if(bedCol == 0 && bedRow !== 0) {
      // The bed is in a new row, thus xPlace = 0
      // Iterate through the previous row of beds to get the max y value
      let maxY = 0;
      document.querySelectorAll('#row-' + (bedRow-1) + ' g').forEach(function(e) {
        let cID = e.id;
        let thisMaxY = SVG('#' + cID + '_base').bbox().y2;
        if(thisMaxY > maxY) {
          maxY = thisMaxY;
        }
      })
      yPlace = maxY + cellSize;
    }

    // Add the bed rect, label, and shadow to the bed group
    let bed = draw.rect(2*100, 2*100).attr({x: xPlace, y: yPlace, fill: '#dddee0', id: 'bed_' + bedID + '_base'}).stroke({width: 6, color: '#ffffff'}).putIn(SVG('#bed_' + bedID));
    let label = draw.plain(document.querySelector('#bed_' + bedID + '_name').value).font({family: 'Surt Exp', size: '1.75em', anchor: 'middle'}).attr({fill: '#ffffff', x: SVG('#bed_' + bedID).bbox().cx, y: SVG('#bed_' + bedID).bbox().cy, id: 'bed_' + bedID + '_label', style: 'transform: translate(0px, .4375em);'}).putIn(SVG('#bed_' + bedID));

    let bedBBox = SVG('#bed_' + bedID + '_base').bbox();
    // Draw the shadow
    let shadowPoints = [bedBBox.x + ',' + bedBBox.y, (bedBBox.x+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y2-(cellSize/2)), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
    let shadow = draw.polygon(shadowPoints.join(' ')).fill('#596475').attr({id: 'bed_' + bedID + '_shadow', opacity: .2});

    // Blur the shadow
    shadow.filterWith(function(add) {
      add.gaussianBlur(5);
    })

    // Place the bed shadow in bed group, at back
    shadow.putIn(SVG('#bed_' + bedID));
    shadow.back();
  }

  // This function manages the bed's height, width, and label
  function manageBed(bedID) {
    let cellSize = 100;
    // Label Check
    let inputText = document.querySelector('#bed_' + bedID + '_name').value;
    let labelText = document.querySelector('#bed_' + bedID + '_label').textContent;
    // Test if the label needs an update
    if(inputText !== labelText) {
      SVG('#bed_' + bedID).attr({'data-name': inputText});
      document.querySelector('#bed_' + bedID + '_label').textContent = inputText;
    }

    // Width Check
    let inputWidth = document.querySelector('#bed_' + bedID + '_width').value*cellSize;
    let bedWidth = SVG('#bed_' + bedID + '_base').bbox().width;
    if(inputWidth !== bedWidth) {
      let widthChange = inputWidth - bedWidth;
      // Update Width
      SVG('#bed_' + bedID + '_base').width(inputWidth);
      let bedBBox = SVG('#bed_' + bedID + '_base').bbox();
      // Update Text Position
      SVG('#bed_' + bedID + '_label').attr({x: bedBBox.cx, y: bedBBox.cy});
      // Create new Shadow Points
      let shadowPoints = [bedBBox.x + ',' + bedBBox.y, (bedBBox.x+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y2-(cellSize/2)), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
      // Update the shadow
      SVG('#bed_' + bedID + '_shadow').attr({points: shadowPoints.join(' ')});

      // Update the other beds to the right
      updatePositionRight(widthChange, parseInt(SVG('#bed_' + bedID).attr('data-row')), parseInt(SVG('#bed_' + bedID).attr('data-col')));
    }

    // Height Check
    let inputHeight = document.querySelector('#bed_' + bedID + '_height').value*cellSize;
    let bedHeight = SVG('#bed_' + bedID + '_base').bbox().height;
    if(inputHeight !== bedHeight) {
      // Update Height
      SVG('#bed_' + bedID + '_base').height(inputHeight);
      let bedBBox = SVG('#bed_' + bedID + '_base').bbox();
      // Update Text Position
      SVG('#bed_' + bedID + '_label').attr({x: bedBBox.cx, y: bedBBox.cy});
      // Create new Shadow Points
      let shadowPoints = [bedBBox.x + ',' + bedBBox.y, (bedBBox.x+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y2-(cellSize/2)), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
      // Update the shadow
      SVG('#bed_' + bedID + '_shadow').attr({points: shadowPoints.join(' ')});

      // Update the other beds below
      // Find the largest height in the current row
      let currentRow = parseInt(SVG('#bed_' + bedID).attr('data-row'));
      let maxY = 0;
      document.querySelectorAll('#row-' + currentRow + ' g').forEach(function(e) {
        if(SVG('#' + e.id).bbox().y2 > maxY) {
          maxY = SVG('#' + e.id).bbox().y2;
        }
      });
      updatePositionBelow(maxY, parseInt(SVG('#bed_' + bedID).attr('data-row')));
    }


    // This function updates the position of everything to the right of a bed in a row
    function updatePositionRight(xChange, rowIn, colOn) {
      let cellSize = 100;
      // Only make further changes if the column is below 4, as this column is the last in any row
      if(colOn < 4) {
        // Iterate over every bed in the row
        document.querySelectorAll('g[data-row="' + rowIn + '"]').forEach(function(e) {
          // Only effect items in columns after the passed column
          if(parseInt(e.getAttribute('data-col')) > colOn) {
            // Move the matched elements
            SVG('#' + e.id + '_base').dx(xChange);
            SVG('#' + e.id + '_label').dx(xChange);

            let bedBBox = SVG('#' + e.id + '_base').bbox();
            // Update the shadow
            let shadowPoints = [bedBBox.x + ',' + bedBBox.y, (bedBBox.x+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y2-(cellSize/2)), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
            SVG('#' + e.id + '_shadow').attr({points: shadowPoints.join(' ')});
          }
        })
      }
    }

    // This function updates the position of everything below the bed in a row
    function updatePositionBelow(yMax, rowIn) {
      let cellSize = 100;
      if(rowIn < 5 && SVG('#row-' + (rowIn+1)) !== null) {
        // Determine the y-offset given the max y of the previous row
        let nextRowMinY = 0;
        document.querySelectorAll('#row-' + (rowIn+1) + ' g').forEach(function(e) {
          if(SVG('#' + e.id + '_base').bbox().y > nextRowMinY) {
            nextRowMinY = SVG('#' + e.id + '_base').bbox().y;
          }
        });
        let changeHeight = (yMax+cellSize) - nextRowMinY;
        // Iterate over every bed in the row
        document.querySelectorAll('#bed-group > g').forEach(function(e) {
          if(parseInt(e.id.split('-')[1]) > rowIn) {
            // Move the matched elements
            document.querySelectorAll('#' + e.id + ' g').forEach(function(a) {
              SVG('#' + a.id + '_base').dy(changeHeight);
              SVG('#' + a.id + '_label').dy(changeHeight);

              let bedBBox = SVG('#' + a.id + '_base').bbox();
              // Update the shadow
              let shadowPoints = [bedBBox.x + ',' + bedBBox.y, (bedBBox.x+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y-(cellSize/2)), (bedBBox.x2+(cellSize/2)) + ',' + (bedBBox.y2-(cellSize/2)), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
              SVG('#' + a.id + '_shadow').attr({points: shadowPoints.join(' ')});
            });
          }
        });
      }
    }
  }

  // This function animates to a new viewport bounds to show all beds
  function updateViewBounds() {
    // Create a bounds object to store the min/max values
    let bounds = {
      min: {x: 0, y: 0},
      max: {x: 0, y:0}
    }

    document.querySelectorAll('#bed-group g g').forEach(function (e, i) {
      // Text the lower and upper bounds for the object and store them in the bounds array if they are larger than the current values
      let bbox = SVG('#' + e.id + ' rect').bbox();
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
    bounds.min.x = bounds.min.x-(100);
    bounds.min.y = bounds.min.y-(100);
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
      let lowBedBounds = {x: SVG('#bed_a_base').bbox().x, y: SVG('#bed_a_base').bbox().y};
      let highBedBounds = {x: SVG('#bed_a_base').bbox().x2, y: SVG('#bed_a_base').bbox().y2};
      // Iterate over all the beds to find the furthest to the left bed
      document.querySelectorAll('#bed-group g').forEach(function(e) {
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
}

// TEMP CODE
// Add event listener to Add Bed button when clicked
document.querySelector('.content-bed-add').addEventListener('click', function() {
  bedAddition();
}, true);

// TEMP CODE
// When clicking the forward button move to the next step
document.querySelector('.button-forward').addEventListener('click', function() {
  // Test that the button is active
  if(this.classList.contains('button-no-select') !== true) {
    transitionStep(document.querySelector('body').getAttribute('data-step'), this.getAttribute('data-next-step'))
  }
}, true);

// This function removes a warning crumb based on the passed ID
function removeByAttr(attr, value) {
  document.querySelector(attr + value).remove();
}

// This function transitions from one state to another
function transitionStep(stepFrom, stepTo) {
  switch(true) {
    case stepFrom=='bed-layout' && stepTo=='plant-selection':
      // From bed layout to plant selection
      // Set the body step to plant selection
      document.querySelector('body').setAttribute('data-step', 'plant-selection');
      gsap.timeline()
        .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '105%', opacity: 0})
        .to('.content-bed-item > .container', {duration: .4, ease: "power1.inOut", y: '110%', opacity: 0, stagger: {each: 0.075,from: "start",grid: "auto", ease: "power3.in"}}, "-=.25")
        .call(zoomViewboxOut, [500, 0, 'now', '<>'])
        .to('.content-bed-add *', {duration: .375, ease: "power1.inOut", y: '250%', opacity: 0}, "-=.3")
        .call(textChange, ['.side-panel > .container > h1', 'Choose Plants'])
        .call(removeElement, ['.panel-content > div'])
        .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '0%', opacity: 1});
      break;
    default:
      // code block
  }
}

// Create a viewport svg right off the bat
var draw = SVG().addTo('.viewport').size('100%', '100%').attr({id: 'viewport-svg', opacity: 1}).viewbox('0 150 850 500');
var bedGroup = draw.group().attr({id: 'bed-group'});
var gridGroup = draw.group().attr({id: 'grid-floor'});

// This function changes the text of a passed element to passed text
function textChange(selector, text) {
  document.querySelector(selector).textContent = text;
}

// This function removes all matched passed elements
function removeElement(selector) {
  document.querySelectorAll(selector).forEach(function(e) {
    e.remove();
  })
}

// This function zooms out the viewbox on the viewport SVG given passed values
function zoomViewboxOut(duration, delay, when, ease) {
  let cellSize = 100;
  // Zoom out a bit
  let currentViewbox = draw.viewbox()
  draw.animate(duration, delay, when).ease(ease).viewbox(currentViewbox.x-cellSize, currentViewbox.y-cellSize, currentViewbox.width+(cellSize*2) , currentViewbox.height+(cellSize*2));
}

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
