import moment from 'moment';
import svg from 'svg.js';



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
      newBedInput('a');
    } else {
      // This function gives the next character from an input character
      function nextChar(c) {
          return String.fromCharCode(c.charCodeAt(0) + 1);
      }

      // Dictate the new bed id based on the id of the most recent bed id
      let previousBedID = document.querySelectorAll('.content-bed-item')[document.querySelectorAll('.content-bed-item').length-1].getAttribute('data-bed-id').split('_')[1];
      // Create the new bed
      newBedInput(nextChar(previousBedID));
    }
  }

  // This function create input controls for a bed
  function newBedInput(bedID) {
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
      }, true);
    });
    // Add event listener to the minus button to allow for bed removal
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] .subtract-icon').addEventListener('click', function(e) {
      document.querySelector('div[data-bed-id="bed_' + bedID + '"]').remove();
    }, true);
    // Add event listener to the label name to update bed label name
    document.querySelector('#bed_' + bedID + '_name').addEventListener('input', function(e) {
      console.log(this.value)
    }, true);
    // Add event listener to the label name to set the default name if the label has no value after user leaves input
    document.querySelector('#bed_' + bedID + '_name').addEventListener('change', function(e) {
      // If the value of the label is nothing or only spaces replace the label with the default name
      if(this.value == '' || !this.value.replace(/\s/g, '').length) {
        this.value = this.id.split('_').splice(0,2).join(' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }
    }, true);
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
