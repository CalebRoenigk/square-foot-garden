import moment from 'moment';
import { SVG } from '@svgdotjs/svg.js';
import filterWith from '@svgdotjs/svg.filter.js';


// This object holds all the data for each plant type
const plantData = [
  {
    plant_name: 'Artichokes, globe',
    plant_id: '0000',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Artichokes, Jerusalem',
    plant_id: '0001',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Arugula',
    plant_id: '0002',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Asparagus',
    plant_id: '0003',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Basil',
    plant_id: '0004',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Lima Beans, bush',
    plant_id: '0005',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Lima Beans, pole',
    plant_id: '0006',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Snap Beans, bush',
    plant_id: '0007',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Snap Beans, pole',
    plant_id: '0008',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Beets',
    plant_id: '0009',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Broccoli',
    plant_id: '0010',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Brussels sprouts',
    plant_id: '0011',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Cabbage',
    plant_id: '0012',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Cabbage, Chinese',
    plant_id: '0013',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Carrots',
    plant_id: '0014',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Cauliflower',
    plant_id: '0015',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Celery',
    plant_id: '0016',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Chard, Swiss',
    plant_id: '0017',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Cilantro',
    plant_id: '0018',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Collard greens',
    plant_id: '0019',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Corn, sweet',
    plant_id: '0020',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Cucumbers',
    plant_id: '0021',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Dill',
    plant_id: '0022',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Eggplant',
    plant_id: '0023',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Fennel, Florence',
    plant_id: '0024',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Garlic',
    plant_id: '0025',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Kale',
    plant_id: '0026',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Kohlrabi',
    plant_id: '0027',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Leek',
    plant_id: '0028',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Lettuce, head',
    plant_id: '0029',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Lettuce, leaf',
    plant_id: '0030',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Cantaloupe',
    plant_id: '0031',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Watermelon',
    plant_id: '0032',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Mustard',
    plant_id: '0033',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Okra',
    plant_id: '0034',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Onions, bulb',
    plant_id: '0035',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Onions, green',
    plant_id: '0036',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Pac choi',
    plant_id: '0037',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Parsley',
    plant_id: '0038',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Parsnips',
    plant_id: '0039',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Peanuts',
    plant_id: '0040',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Peanuts',
    plant_id: '0040',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Peas, bush',
    plant_id: '0041',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Peas, vining',
    plant_id: '0042',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Peas, field',
    plant_id: '0043',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Peppers',
    plant_id: '0044',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Potatoes, Irish',
    plant_id: '0045',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Sweetpotatoes',
    plant_id: '0046',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Pumpkin',
    plant_id: '0047',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Radishes',
    plant_id: '0048',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Rutabega',
    plant_id: '0049',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Spinach',
    plant_id: '0050',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Squash, summer',
    plant_id: '0051',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Squash, winter',
    plant_id: '0052',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Sunflower',
    plant_id: '0053',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  },
  {
    plant_name: 'Tomatoes',
    plant_id: '0054',
    calender_times: [
      {
        start: 0,
        end: 0,
        plant_varient: ''
      }
    ],
    harvest_times: [
      {
        days: 0,
        to_bloom: 0,
        to_end: 0,
        plant_varient: ''
      }
    ]
  }
]

// This array is created for search results
// Will also need to add filtering to allow for plants that can be grown in the current hardiness zone
const plantSearchArray = [];
for(var i=0; i < plantData.length; i++) {
  plantSearchArray.push(plantData[i].plant_name);
}

// This array contains all the label colors for any of the cell labling systems
const labelColors = ["#5FAD41", "#28AFB0", "#FF7D00", "#F0A202", "#FC6DAB", "#E94F37", "#CA7DF9", "#8261FA", "#398CD0", "#F45B69", "#FFDA22", "#004F2D", "#052FC7", "#25F88F", "#604488", "#982649", "#A0DDFF", "#FF6F59", "#B80000", "#145C9E", "#0A100D", "#B30089", "#F896D8", "#724CF9"];


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
        .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '0%', opacity: 1})
        .call(generateCells)
        .call(cellTransition)
        .call(populatePanel, [stepTo])
      break;
    default:
      // code block
  }
}

// Create a viewport svg right off the bat
var draw = SVG().addTo('.viewport').size('100%', '100%').attr({id: 'viewport-svg', opacity: 1}).viewbox('0 150 850 500');
var bedGroup = draw.group().attr({id: 'bed-group'});
var gridGroup = draw.group().attr({id: 'grid-floor'});

// This function generates a set of swap arrows between two points
function generateSwapArrows(p1, p2) {
  let cellSize = 100;
  // If swap arrows exist, remove them
  if(SVG('#swap_arrows') !== null) {
    SVG('#swap_arrows').remove();
  }

  // Calculate distance between the two points
  let dist = Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2));

  // Draw two 'lines' (rect) from p1 to p2, shortened by half the cell size, offset to the right by 1/4th the cell size, also offset it down/up by 3.5, also offset it left/right by 4px
  let lineThickness = 3;
  let topPoints = [(p1.x + cellSize/4) + ',' + (p1.y - (3.5+(lineThickness/2))), (p1.x + (dist-((cellSize/4) + 4))) + ',' + (p1.y - (3.5+(lineThickness/2))), (p1.x + (dist-((cellSize/4) + 4))) + ',' + (p1.y - (3.5-(lineThickness/2))), (p1.x + cellSize/4) + ',' + (p1.y - (3.5-(lineThickness/2)))];
  let lineTop = draw.polygon(topPoints.join(' ')).attr({id: 'top_line'});
  let lineTopStroke = draw.polygon(topPoints.join(' ')).attr({id: 'top_line_stroke'});
  let bottomPoints = [(p1.x + ((cellSize/4)+4)) + ',' + (p1.y + (3.5+(lineThickness/2))), (p1.x + (dist-(cellSize/4))) + ',' + (p1.y + (3.5+(lineThickness/2))), (p1.x + (dist-(cellSize/4))) + ',' + (p1.y + (3.5-(lineThickness/2))), (p1.x + ((cellSize/4)+4)) + ',' + (p1.y + (3.5-(lineThickness/2)))];
  let lineBottom = draw.polygon(bottomPoints.join(' ')).attr({id: 'bottom_line'});
  let lineBottomStroke = draw.polygon(bottomPoints.join(' ')).attr({id: 'bottom_line_stroke'});

  // Draw two arrowheads and position them at the ends of the lines
  let arrowheadTopPoints = [(p1.x + ((dist-(cellSize/4))-8)) + ',' + (p1.y - (3.5 + 4.5)), (p1.x + (dist-(cellSize/4))+1) + ',' + (p1.y - 3.5), (p1.x + ((dist-(cellSize/4))-8)) + ',' + (p1.y - (3.5 - 4.5))];
  let arrowheadTop = draw.polygon(arrowheadTopPoints.join(' ')).attr({id: 'top_arrow'});
  let arrowheadTopStroke = draw.polygon(arrowheadTopPoints.join(' ')).attr({id: 'top_arrow_stroke'});
  let arrowheadBottomPoints = [(p1.x + ((cellSize/4)+8)) + ',' + (p1.y + (3.5 + 4.5)), (p1.x + ((cellSize/4)-1)) + ',' + (p1.y + 3.5), (p1.x + ((cellSize/4)+8)) + ',' + (p1.y + (3.5 - 4.5))];
  let arrowheadBottom = draw.polygon(arrowheadBottomPoints.join(' ')).attr({id: 'bottom_arrow'});
  let arrowheadBottomStroke = draw.polygon(arrowheadBottomPoints.join(' ')).attr({id: 'bottom_arrow_stroke'});

  // Group the objects
  let swapGroup = draw.group().attr({id: 'swap_arrows', opacity: 0});
  let swapGroupStroke = draw.group().attr({id: 'swap_stroke'});
  let swapGroupFill = draw.group().attr({id: 'swap_fill'});
  // Stroke
  lineTopStroke.putIn(swapGroupStroke);
  lineBottomStroke.putIn(swapGroupStroke);
  arrowheadTopStroke.putIn(swapGroupStroke);
  arrowheadBottomStroke.putIn(swapGroupStroke);
  // Fill
  lineTop.putIn(swapGroupFill);
  lineBottom.putIn(swapGroupFill);
  arrowheadTop.putIn(swapGroupFill);
  arrowheadBottom.putIn(swapGroupFill);
  // Group
  swapGroupStroke.putIn(swapGroup);
  swapGroupFill.putIn(swapGroup);

  // Style
  swapGroupFill.fill("#2D936C");
  swapGroupStroke.stroke({width: 6, color: '#ffffff', linejoin: 'round'});

  // Calculate rotation
  let rot = Math.atan2((p2.y - p1.y),( p2.x - p1.x)) * 180 / Math.PI;
  swapGroup.rotate(rot, p1.x, p1.y);

  // Animate in
  swapGroup.animate(200, '<>', 0).attr({opacity: 1})
}

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

// This function creates cells and dividers for each bed
function generateCells() {
  let cellSize = 100;
  // Iterate over each row
  document.querySelectorAll('#bed-group > g').forEach(function(row) {
    let rowNumb = row.id.split('-')[1];
    console.log('rownumb: ' + rowNumb);
    // Iterate over each bed in this row
    document.querySelectorAll('#' + row.id + ' g').forEach(function(bed) {
      console.log('bed: ' + bed.id);
      // Get the height and width of the current bed
      let thisHeight = SVG('#' + bed.id + '_base').height();
      let thisWidth = SVG('#' + bed.id + '_base').width();

      // Create a group for the cells and dividers to go in
      let cellGroup = draw.group().attr({id: bed.id + '_cells'});
      let dividerGroup = draw.group().attr({id: bed.id + '_dividers'});
      let contentGroup = draw.group().attr({id: bed.id + '_content'});

      // Place the groups in order
      cellGroup.putIn(contentGroup);
      dividerGroup.putIn(contentGroup);
      contentGroup.putIn(SVG('#' + bed.id));

      // Store the bbox for the current bed
      let bedBBox = SVG('#' + bed.id + '_base').bbox();
      console.log(bedBBox)
      // Iterate over the width of the bed, creating vertical dividers
      for(var i=0; i < (thisWidth/cellSize)-1; i++) {
        // Start placement at x1 + cellSize
        let vDivider = draw.line(bedBBox.x+(cellSize*(i+1)), bedBBox.y, bedBBox.x+(cellSize*(i+1)), bedBBox.y2).stroke({width: 2, color: '#ffffff', dasharray: (bedBBox.y2 - bedBBox.y) + ' ' + ((bedBBox.y2 - bedBBox.y)+10), dashoffset: ((bedBBox.y2 - bedBBox.y)+10)}).attr({class: 'vert-divider'});
        // Place the divder in the divider group
        vDivider.putIn(dividerGroup);
      }
      // Iterate over the height of the bed, creating horizontal dividers
      for(var i=0; i < (thisHeight/cellSize)-1; i++) {
        // Start placement at x1 + cellSize
        let hDivider = draw.line(bedBBox.x, bedBBox.y+(cellSize*(i+1)), bedBBox.x2, bedBBox.y+(cellSize*(i+1))).stroke({width: 2, color: '#ffffff', dasharray: (bedBBox.x2 - bedBBox.x) + ' ' + ((bedBBox.x2 - bedBBox.x)+10), dashoffset: ((bedBBox.x2 - bedBBox.x)+10)}).attr({class: 'horz-divider'});
        hDivider.putIn(dividerGroup);
      }

      // Add a border-rect to the divder group
      let border = draw.rect(bedBBox.width, bedBBox.height).cx(bedBBox.cx).cy(bedBBox.cy).attr({class: 'bed-border', fill: 'none'}).stroke({width: 6, color: '#ffffff'});
      border.putIn(dividerGroup);

      // Create the cells
      // Iterate over the height
      let totalCellCount = 0;
      for(var h=0; h < (thisHeight/cellSize); h++) {
        // Iterate over the width
        for(var w=0; w < (thisWidth/cellSize); w++) {
          // Create a cell at the right height and width coordinate
          let cellID = 'cell_' + bed.id.split('_')[1] + '_' + totalCellCount;
          let cell = draw.rect(cellSize, cellSize).x((bedBBox.x + (w*cellSize))).y((bedBBox.y + (h*cellSize))).attr({id: cellID, class: 'bed-cell'}).fill({color: '#596475', opacity: 0});

          cell.putIn(cellGroup);
          totalCellCount++;
        }
      }

      // Move the cell group behind the divider group
      cellGroup.back();
    })
  })
}

// This function transitions the beds from the bed view to the cell view
function cellTransition() {
  let cellSize = 100;
  // Order of timeline
  // Move each bed label up and change its color and opacity
  // Draw in each horizontal divider
  // Draw in each vertical divder

  // Iterate over the beds, setting the y position of the text label to above the bed
  document.querySelectorAll('#bed-group > g > g').forEach(function(bed, i) {
    console.log(bed);
    console.log(i);
    // Calculate what y position the label will be at
    let minBedY = SVG('#' + bed.id + '_base').bbox().y;
    let delay = 50 * i;
    // Animate the text label
    SVG('#' + bed.id + '_label').animate(500, delay, 'now').ease('<>').attr({fill: '#596475', opacity: .38, y: minBedY-(cellSize/2)});
  });

  // Animate the dividers
  gsap.timeline()
    .to('#bed-group > g > g > g > g > line', {duration: .5, delay: .2, ease: 'power2.inOut', strokeDashoffset: 0, stagger: {each: .025, from: 'start', ease: 'power1.inOut'}})
}

// PANEL STATE CHANGE


// This function populates the panel based on passed states
function populatePanel(state) {
  switch(true) {
    case state=='plant-selection':
      // Add Plant Search to panel content
      document.querySelector('.panel-content').insertAdjacentHTML('afterbegin', '<div class="plant-search" style="overflow: hidden;"><div class="search-box" style="transform: translateY(150%);"><input type="text" placeholder="Start Typing" id="search-plants"><div class="search-suggestions"></div></div><div class="add-option" style="transform: translateY(150%);"></div></div>');

      // Add plant items search-paste area to panel content
      document.querySelector('.panel-content').insertAdjacentHTML('beforeend', '<div class="plant-items" id="no-bed-plants"></div>');

      // Event Listeners for Search
      // This adds an event listener to the search box so that when it is in focus the search results are open
      document.querySelector("#search-plants").addEventListener("focusin", function(e) {
        gsap.to('.search-suggestions', {duration: .1, ease: 'linear', height: 'auto', backgroundColor: '#ffffff', boxShadow: '0px 4px 16px 2px var(--secondary-color-min)', paddingTop: '36px'});
        let query = document.querySelector("#search-plants").value;
        updatePlantSearchResult(query)
      });
      // And when focus is out
      document.querySelector("#search-plants").addEventListener("focusout", function(e) {
        gsap.to('.search-suggestions', {duration: .1, ease: 'linear', clearProps: 'all'});

        // When there is any value in the search box and it matches an item in the search array, color the add button
        let query = document.querySelector("#search-plants").value;
        if(query.length > 0 && plantSearchArray.indexOf(query) !== -1) {
          gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', backgroundColor: 'var(--primary-color)'})
        } else {
          gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
        }
      });

      // Add plant item to no-parent area if the add icon is active
      document.querySelector(".plant-search > .add-option").addEventListener("click", function(e) {
        // Add the option to the no-parent area
        addPlantOption(plantData[plantSearchArray.indexOf(document.querySelector("#search-plants").value)])

        // Clear search
        gsap.to('.add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
        document.querySelector("#search-plants").value = '';
      });

      // Add the update plant search result to the plant search box
      document.querySelector("#search-plants").addEventListener("input", function() {
        let query = document.querySelector("#search-plants").value;
        updatePlantSearchResult(query);

        // When there is any value in the search box and it matches an item in the search array, color the add button
        if(query.length > 0 && plantSearchArray.indexOf(query) !== -1) {
          gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', backgroundColor: 'var(--primary-color)'})
        } else {
          gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
        }
      });

      // Iterate over each bed
      document.querySelectorAll('#bed-group > g > g').forEach(function(bed) {
        // Create a bed wrapper for the current bed in the panel content
        document.querySelector('.panel-content').insertAdjacentHTML('beforeend', '<div class="bed-wrapper" id="' + bed.id + '_plants" data-name="' + bed.getAttribute('data-name') + '" style="opacity: 0; transform: translateY(10%);"></div>');

        // Iterate over each cell in the bed
        document.querySelectorAll('#' + bed.id + '_cells > rect').forEach(function(cell) {
          // Store info about the current cell
          let cellBed = cell.id.split('_')[1];
          let cellNum = cell.id.split('_')[2];

          // Insert an empty item into the bed wrapper for this cell
          document.querySelector('#' + bed.id + '_plants').insertAdjacentHTML('beforeend', '<div class="blank-item" data-plant-parent="' + bed.id + '" data-cell="' + cellNum + '" id="empty_' + cellBed + '_' + cellNum + '" style="opacity: 0; transform: translateY(7.5%);">Empty</div>');

          // Add event listeners to the empty item for DnD functionality
          addDragAndDrop('#empty_' + cellBed + '_' + cellNum);
        })
      });

      // Animate the content in
      gsap.timeline()
      .to('.plant-search > div', {duration: .375, ease: "power2.inOut", y: '0%'}, "-=.125")
      .to('.plant-search', {duration: .05, ease: 'linear', clearProps: 'all'}, '+=.375')
      .to('.plant-search > div', {duration: .05, ease: 'linear', clearProps: 'all'})
      .to('.bed-wrapper', {duration: .4, ease: "power2.out", y: '0%', opacity: 1, stagger: {each: .075, from: 'start', grid: 'auto', ease: 'power1.out'}}, "-=.5")
      .to('.bed-wrapper > div', {duration: .25, ease: "power2.out", y: '0%', opacity: 1, stagger: {each: .025, from: 'start', grid: 'auto', ease: 'linear'}}, "-=.5")
      .to('.bed-wrapper', {duration: .05, ease: 'linear', clearProps: 'all', stagger: {each: .075, from: 'start', grid: 'auto', ease: 'power1.out'}}, "+=.45")

      break;
    default:
      // ADD DEFAULT HOME SCREEN HERE
  }
}

// PLANT SELECTION


// This function updates the search results
function updatePlantSearchResult(query) {
  let resultList = document.querySelector(".search-suggestions");
  resultList.innerHTML = "";

  plantSearchArray.map(function(algo){
      query.split(" ").map(function (word){
          if(algo.toLowerCase().indexOf(word.toLowerCase()) != -1 && resultList.childNodes.length < 5){
              resultList.innerHTML += `<li>${algo}</li>`;
          }
      })
  });

  // Add event listener to each search item
  document.querySelectorAll(".search-suggestions > li").forEach(function(e) {
    e.addEventListener("click", function() {
      // Fill the search box in with the clicked value
      document.querySelector("#search-plants").value = e.textContent;

      // When there is any value in the search box and it matches an item in the search array, color the add button
      if(e.textContent.length > 0 && plantSearchArray.indexOf(e.textContent) !== -1) {
        gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', backgroundColor: 'var(--primary-color)'})
      } else {
        gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
      }
    });
  })
};

// This function adds a search item to the no-parent container for new search items
function addPlantOption(plantObj) {
  let itemCount = document.querySelectorAll('.grab-item').length;

  // Select a color from the label color array given the total items % the number of items in the label color array
  let labelColor = labelColors[itemCount%labelColors.length];

  // Add the item to the no-parent container
  let newPlantCount = (document.querySelector('#no-bed-plants').childElementCount-1) + 1;
  let newItem = '<div class="grab-item" data-plant-parent="none" data-label-color="' + labelColor + '" draggable="true" id="plant_' + newPlantCount + '">' + plantObj.plant_name + '</div>';

  // Add the drag and drop event listeners to the new item
  document.querySelector('#no-bed-plants').insertAdjacentHTML('beforeend', newItem);
  addDragAndDrop('#plant_' + newPlantCount);
}

// These function handle the styling of dragged item when drag starts and ends
function handleDragEnd(e) {
  gsap.to(this, {duration: .2, ease: 'power2.inOut', opacity: 1});
  gsap.set(this, {delay: .2, clearProps: 'opacity'});
}

function handleDragIn(ev) {
  ev.preventDefault();

  gsap.to(this, {duration: .2, ease: 'power2.inOut', boxShadow: '0px 4px 12px 0px var(--secondary-color-low)'});

  // document.querySelector('.panel-content').setAttribute('data-label-color-drag', ev.target.getAttribute('data-label-color'))

  // Test the two DnD items for classes
  let itemBeingDroppedClassList = document.querySelector('#' + document.querySelector('.panel-content').getAttribute('data-id-drag')).classList;
  let itemSittingClassList = ev.target.classList;

  // If the item being dragged is from the no-bed container
  if(document.querySelector('#' + document.querySelector('.panel-content').getAttribute('data-id-drag')).getAttribute('data-cell') == null) {
    // The item being dragged is from the no bed container
    // The sitting item is a plant cell
    // Color change will need to happen on the sitting cell
    let hoverBedParent = ev.target.getAttribute('data-plant-parent').split('_')[1];
    let hoverCell = SVG('#cell_' + hoverBedParent + '_' + ev.target.getAttribute('data-cell'));
    // Store the old fill color temporarily to the cell
    let oldHoverFill = hoverCell.attr('fill');
    let oldHoverOpacity = hoverCell.attr('fill-opacity');
    hoverCell.data('old-fill', oldHoverFill, true);
    hoverCell.data('old-opacity', oldHoverOpacity, true);
    // Change the color of the cell to the label color of the hovering plant item with .5 opacity
    hoverCell.animate(250, 0, 'now').ease('<>').fill({color: document.querySelector('.panel-content').getAttribute('data-label-color-drag'), opacity: 0.5})

  } else {
    // The item being dragged is from one of the bed containers
    // The swap arrows will need to draw on
    // Color change will need to happen
    // Sitting Cell Color
    let hoverBedParent = ev.target.getAttribute('data-plant-parent').split('_')[1];
    let hoverCell = SVG('#cell_' + hoverBedParent + '_' + ev.target.getAttribute('data-cell'));
    // Store the old fill color temporarily to the cell
    let oldHoverFill = hoverCell.attr('fill');
    let oldHoverOpacity = hoverCell.attr('fill-opacity');
    hoverCell.data('old-fill', oldHoverFill, true);
    hoverCell.data('old-opacity', oldHoverOpacity, true);
    // Change the color of the cell to the label color of the hovering plant item with .5 opacity
    hoverCell.animate(250, 0, 'now').ease('<>').fill({color: document.querySelector('.panel-content').getAttribute('data-label-color-drag'), opacity: 0.5})

    // Dragging Cell Color
    let draggingBedParent = document.querySelector('#' + document.querySelector('.panel-content').getAttribute('data-id-drag')).getAttribute('data-plant-parent').split('_')[1];
    let draggingCell = SVG('#cell_' + hoverBedParent + '_' + document.querySelector('#' + document.querySelector('.panel-content').getAttribute('data-id-drag')).getAttribute('data-cell'));
    // Store the old fill color temporarily to the cell
    draggingCell.data('old-fill', draggingCell.attr('fill'), true);
    // Change the color of the cell to the label color of the hovering plant item with .5 opacity
    draggingCell.animate(250, 0, 'now').ease('<>').fill({color: oldHoverFill, opacity: 0.5})

  }
  return true;
}

function handleDragOver(e) {
  return false;
}

function handleDragOut(ev) {
  gsap.to(this, {duration: .2, ease: 'power2.inOut', boxShadow: '0px 0px 0px 0px var(--secondary-color-off)'});
  gsap.set(this, {delay: .2, clearProps: 'boxShadow'});

  console.log('dragout: ' + this.id)
  if(this.getAttribute('data-cell') !== null) {
    // The element the dragged element is leaving has a cell connected to it
    let leavingBedParent = this.getAttribute('data-plant-parent').split('_')[1];
    let leavingCell = SVG('#cell_' + leavingBedParent + '_' + this.getAttribute('data-cell'));
    let oldFill = leavingCell.data('old-fill');
    let oldOpacity = leavingCell.data('old-opacity');

    // Change the color of the cell back to its old fill
    leavingCell.animate(250, 0, 'now').ease('<>').fill({color: oldFill, opacity: oldOpacity})
    // Remove the old fill color data
    leavingCell.data('old-fill', null);
    leavingCell.data('old-opacity', null);
  }
}

// This is the drag and drop data transfer format
class DnDObject {
  constructor(id, parent, cell, text, label, classes, draggable) {
    this.id = id;
    this.parent = parent;
    this.cell = cell || false;
    this.text = text;
    this.label = label || false;
    this.classes = classes;
    this.draggable = draggable || false;
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function handleDragStart(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
  ev.dataTransfer.setData("bed", ev.target.getAttribute('data-plant-parent'));
  ev.dataTransfer.setData("cell", ev.target.getAttribute('data-cell'));
  ev.dataTransfer.setData("text", ev.target.textContent);
  ev.dataTransfer.setData("label_color", ev.target.getAttribute('data-label-color'));
  ev.dataTransfer.setData("classes", ev.target.classList);
  ev.dataTransfer.setData("draggable", ev.target.getAttribute('draggable'));

  // Pass some data to temporary data attritubes on panel-content, this allows for data read on hover over
  document.querySelector('.panel-content').setAttribute('data-label-color-drag', ev.target.getAttribute('data-label-color'));
  document.querySelector('.panel-content').setAttribute('data-id-drag', ev.target.id);

  gsap.to(this, {duration: .2, ease: 'power2.inOut', opacity: .5});
}

function handleDrop(ev) {
  ev.preventDefault();

  // Store both items as element selections
  let itemBeingDropped = document.querySelector('#' + ev.dataTransfer.getData("id"));
  let itemSitting = document.querySelector('#' + ev.target.id);

  // Make data objects for both sitting and dropping items
  let droppingData = new DnDObject(itemBeingDropped.id, itemBeingDropped.getAttribute('data-plant-parent').toString(), itemBeingDropped.getAttribute('data-cell'), itemBeingDropped.textContent, itemBeingDropped.getAttribute('data-label-color'), itemBeingDropped.classList.toString(), itemBeingDropped.getAttribute('draggable'));
  let sittingData = new DnDObject(itemSitting.id, itemSitting.getAttribute('data-plant-parent').toString(), itemSitting.getAttribute('data-cell'), itemSitting.textContent, itemSitting.getAttribute('data-label-color'), itemSitting.classList.toString(), itemSitting.getAttribute('draggable'));

  // Swap the data
  swapData(droppingData, sittingData);

  // If the now swapped sitting item is an empty item and its parent is .plant-items, delete it
  if(itemBeingDropped.parentElement.classList.contains('plant-items') == true && itemBeingDropped.classList.contains('blank-item') == true) {
    document.querySelector('#' + itemBeingDropped.id).remove()
  }

  gsap.to(this, {duration: .2, ease: 'power2.inOut', boxShadow: '0px 0px 0px 0px var(--secondary-color-off)'});
  gsap.set(this, {delay: .2, clearProps: 'boxShadow'});

  // This function swaps the data between the two drag and drop items
  function swapData(dData, sData) {
    // Fix the old drop item with the new sitting data
    let oldDropItem = document.querySelector('#' + dData.id);
    oldDropItem.removeAttribute('class');
    oldDropItem.setAttribute('class', sData.classes);
    oldDropItem.id = 'TEMPID';
    oldDropItem.textContent = sData.text;
    oldDropItem.setAttribute('data-plant-parent', dData.parent);
    if(sData.draggable !== false) {
      oldDropItem.setAttribute('draggable', sData.draggable);
    } else {
      oldDropItem.removeAttribute('draggable');
    }
    if(sData.label !== false) {
      oldDropItem.setAttribute('data-label-color', sData.label);
    } else {
      oldDropItem.removeAttribute('data-label-color');
    }

    // Fix the old sitting item with the new dropping data
    let oldSitItem = document.querySelector('#' + sData.id);
    oldSitItem.removeAttribute('class');
    oldSitItem.setAttribute('class', dData.classes);
    oldSitItem.id = dData.id;
    oldSitItem.textContent = dData.text;
    oldSitItem.setAttribute('data-plant-parent', sData.parent);
    if(dData.draggable !== false) {
      oldSitItem.setAttribute('draggable', dData.draggable);
    } else {
      oldSitItem.removeAttribute('draggable');
    }
    if(dData.label !== false) {
      oldSitItem.setAttribute('data-label-color', dData.label);
    } else {
      oldSitItem.removeAttribute('data-color-label');
    }
    // Cell Data transfer
    // D data is for the sit item
    if(dData.cell !== false) {
      oldDropItem.setAttribute('data-cell', dData.cell);
    } else {
      oldDropItem.removeAttribute('data-cell');
    }
    // S data is for the drop item
    if(sData.cell !== false) {
      oldSitItem.setAttribute('data-cell', sData.cell);
    } else {
      oldSitItem.removeAttribute('data-cell');
    }

    // After old sitting item id has been changed, remove the temp id from the old drop item and replace it with the new sitting id
    oldDropItem.id = sData.id;

    // Set the color of the cells
    // Sitting Cell
    if(SVG('#cell_' + sData.parent.split('_')[1] + '_' + sData.cell) !== null) {
      SVG('#cell_' + sData.parent.split('_')[1] + '_' + sData.cell).animate(250, 0, 'now').ease('<>').fill({color: dData.label_color, opacity: 1})
      SVG('#cell_' + sData.parent.split('_')[1] + '_' + sData.cell).data('old-fill', null);
      SVG('#cell_' + sData.parent.split('_')[1] + '_' + sData.cell).data('old-opacity', null);
    }
    // Dropping Cell
    if(SVG('#cell_' + dData.parent.split('_')[1] + '_' + dData.cell) !== null) {
      SVG('#cell_' + dData.parent.split('_')[1] + '_' + dData.cell).animate(250, 0, 'now').ease('<>').fill({color: sData.label_color, opacity: 1})
      SVG('#cell_' + dData.parent.split('_')[1] + '_' + dData.cell).data('old-fill', null);
      SVG('#cell_' + dData.parent.split('_')[1] + '_' + dData.cell).data('old-opacity', null);
    }

    // Remove the temporary data attritubes on panel-content
    document.querySelector('.panel-content').removeAttribute('data-label-color-drag');
    document.querySelector('.panel-content').removeAttribute('data-id-drag');
  }
}

// This function adds the standard set of event listeners to a drag and drop item
function addDragAndDrop(elements) {
  let dragableItems = document.querySelectorAll(elements);
    dragableItems.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragend', handleDragEnd, false);
      item.addEventListener('dragenter', handleDragIn, false);
      item.addEventListener('dragover', allowDrop, false);
      item.addEventListener('dragleave', handleDragOut, false);
      item.addEventListener('drop', handleDrop, false);
  });
}

// This function removes the standard set of event listeners from a drag and drop item
function removeDragAndDrop(elements) {
  let dragableItems = document.querySelectorAll(elements);
    dragableItems.forEach(function(item) {
      item.removeEventListener('dragstart', handleDragStart, false);
      item.removeEventListener('dragend', handleDragEnd, false);
      item.removeEventListener('dragenter', handleDragIn, false);
      item.removeEventListener('dragover', allowDrop, false);
      item.removeEventListener('dragleave', handleDragOut, false);
      item.removeEventListener('drop', handleDrop, false);
  });
}


// END PLANT SELECTION

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
