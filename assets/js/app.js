import moment from 'moment';
import {SVG} from '@svgdotjs/svg.js';
import filterWith from '@svgdotjs/svg.filter.js';

// This object holds all the data for each plant type
const plantData = [
  {
    plant_name: 'Artichokes, globe',
    plant_id: '0000',
    size: {
      height: 36,
      width: 48,
    },
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [12],
            end: [16],
            harvest: {
              grown: 365,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Artichokes, Jerusalem',
    plant_id: '0001',
    size: {
      height: 48,
      width: 32,
    },
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'tuber',
            start: [12],
            end: [16],
            harvest: {
              grown: 210,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Arugula',
    plant_id: '0002',
    size: {
      height: 8,
      width: 16,
    },
    per_cell: 5,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [5, 31],
            end: [12, 38],
            harvest: {
              grown: 45,
              bloom: '',
              period: 50
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Asparagus',
    plant_id: '0003',
    size: {
      height: 48,
      width: 1,
    },
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'crown',
            start: [7],
            end: [12],
            harvest: {
              grown: 730,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Basil',
    plant_id: '0004',
    size: {
      height: 16,
      width: 14,
    },
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [18],
            end: [29],
            harvest: {
              grown: 28,
              bloom: '',
              period: 21
            }
          },
          {
            type: 'seed',
            start: [18],
            end: [29],
            harvest: {
              grown: 60,
              bloom: '',
              period: 21
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Lima Beans, bush',
    plant_id: '0005',
    size: {
      height: 24,
      width: 6,
    },
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [16],
            end: [29],
            harvest: {
              grown: 72,
              bloom: '',
              period: 18
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Lima Beans, pole',
    plant_id: '0006',
    size: {
      height: 96,
      width: 8,
    },
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [16, 29],
            end: [23, 30],
            harvest: {
              grown: 85,
              bloom: '',
              period: 18
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Snap Beans, bush',
    plant_id: '0007',
    per_cell: 6,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [12],
            end: [38],
            harvest: {
              grown: 52,
              bloom: '',
              period: 7
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Snap Beans, pole',
    plant_id: '0008',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [14],
            end: [38],
            harvest: {
              grown: 68,
              bloom: '',
              period: 4
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Beets',
    plant_id: '0009',
    per_cell: 9,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [10, 29],
            end: [14, 36],
            harvest: {
              grown: 57,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Broccoli',
    plant_id: '0010',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7, 31],
            end: [14, 36],
            harvest: {
              grown: 75,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Brussels sprouts',
    plant_id: '0011',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [27],
            end: [33],
            harvest: {
              grown: 45,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Cabbage',
    plant_id: '0012',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [5, 29],
            end: [14, 36],
            harvest: {
              grown: 70,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Cabbage, Chinese',
    plant_id: '0013',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [12, 38],
            end: [14, 40],
            harvest: {
              grown: 50,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [12, 31],
            end: [14, 33],
            harvest: {
              grown: 70,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Carrots',
    plant_id: '0014',
    per_cell: 9,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [5, 25],
            end: [12, 36],
            harvest: {
              grown: 72,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Cauliflower',
    plant_id: '0015',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7, 31],
            end: [14, 38],
            harvest: {
              grown: 50,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'transplant',
            start: [7, 31],
            end: [14, 38],
            harvest: {
              grown: 90,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Celery',
    plant_id: '0016',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7, 25],
            end: [12, 31],
            harvest: {
              grown: 55,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Chard, Swiss',
    plant_id: '0017',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [10, 31],
            end: [16, 36],
            harvest: {
              grown: 37,
              bloom: '',
              period: 9
            }
          },
          {
            type: 'seed',
            start: [10, 31],
            end: [16, 36],
            harvest: {
              grown: 65,
              bloom: '',
              period: 9
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Cilantro',
    plant_id: '0018',
    per_cell: 8,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [5, 38],
            end: [12, 39],
            harvest: {
              grown: 52,
              bloom: '',
              period: 9
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Collard greens',
    plant_id: '0019',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7, 29],
            end: [25, 36],
            harvest: {
              grown: 52,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [29],
            end: [36],
            harvest: {
              grown: 80,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Corn, sweet',
    plant_id: '0020',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [12],
            end: [20],
            harvest: {
              grown: 82,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Cucumbers',
    plant_id: '0021',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [16],
            end: [31],
            harvest: {
              grown: 32,
              bloom: '',
              period: 7
            }
          },
          {
            type: 'seed',
            start: [16],
            end: [31],
            harvest: {
              grown: 60,
              bloom: '',
              period: 7
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Dill',
    plant_id: '0022',
    per_cell: 6,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [12, 31],
            end: [13, 36],
            harvest: {
              grown: 47,
              bloom: '',
              period: 12
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Eggplant',
    plant_id: '0023',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [16, 31],
            end: [31, 33],
            harvest: {
              grown: 92,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Fennel, Florence',
    plant_id: '0024',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [10, 27],
            end: [16, 33],
            harvest: {
              grown: 75,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Garlic',
    plant_id: '0025',
    per_cell: 5,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'bulb',
            start: [38],
            end: [47],
            harvest: {
              grown: 195,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Kale',
    plant_id: '0026',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7, 31],
            end: [25, 38],
            harvest: {
              grown: 18,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [7, 31],
            end: [25, 38],
            harvest: {
              grown: 45,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Kohlrabi',
    plant_id: '0027',
    per_cell: 6,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7, 31],
            end: [25, 36],
            harvest: {
              grown: 27,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [7, 31],
            end: [25, 36],
            harvest: {
              grown: 55,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Leek',
    plant_id: '0028',
    per_cell: 5,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7],
            end: [25],
            harvest: {
              grown: 65,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [7],
            end: [25],
            harvest: {
              grown: 135,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Lettuce, head',
    plant_id: '0029',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [12, 38],
            end: [16, 40],
            harvest: {
              grown: 52,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [5, 33],
            end: [11, 37],
            harvest: {
              grown: 77,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Lettuce, leaf',
    plant_id: '0030',
    per_cell: 5,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [5, 31],
            end: [16, 38],
            harvest: {
              grown: 20,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [5, 31],
            end: [16, 38],
            harvest: {
              grown: 45,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Cantaloupe',
    plant_id: '0031',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [16],
            end: [27],
            harvest: {
              grown: 60,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [16],
            end: [27],
            harvest: {
              grown: 87,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Watermelon',
    plant_id: '0032',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [16],
            end: [25],
            harvest: {
              grown: 67,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [16],
            end: [25],
            harvest: {
              grown: 95,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Mustard',
    plant_id: '0033',
    per_cell: 9,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [7, 31],
            end: [25, 38],
            harvest: {
              grown: 35,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Okra',
    plant_id: '0034',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [18],
            end: [20],
            harvest: {
              grown: 23,
              bloom: '',
              period: 5
            }
          },
          {
            type: 'seed',
            start: [18, 31],
            end: [20, 33],
            harvest: {
              grown: 65,
              bloom: '',
              period: 5
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Onions, bulb',
    plant_id: '0035',
    per_cell: 5,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'bulb',
            start: [10],
            end: [12],
            harvest: {
              grown: 90,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [1, 31],
            end: [12, 51],
            harvest: {
              grown: 105,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Onions, green',
    plant_id: '0036',
    per_cell: 9,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [10, 33],
            end: [12, 36],
            harvest: {
              grown: 49,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [5, 34],
            end: [12, 36],
            harvest: {
              grown: 65,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Pac choi',
    plant_id: '0037',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [12, 33],
            end: [13, 38],
            harvest: {
              grown: 52,
              bloom: '',
              period: 9
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Parsley',
    plant_id: '0038',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [7, 31],
            end: [14, 38],
            harvest: {
              grown: 33,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'seed',
            start: [7, 31],
            end: [14, 38],
            harvest: {
              grown: 75,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Parsnips',
    plant_id: '0039',
    per_cell: 6,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [7, 31],
            end: [18, 38],
            harvest: {
              grown: 115,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Peanuts',
    plant_id: '0040',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [18],
            end: [20],
            harvest: {
              grown: 152,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Peas, bush',
    plant_id: '0041',
    per_cell: 5,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [1, 31],
            end: [14, 38],
            harvest: {
              grown: 57,
              bloom: '',
              period: 4
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Peas, vining',
    plant_id: '0042',
    per_cell: 6,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [1, 31],
            end: [14, 38],
            harvest: {
              grown: 63,
              bloom: '',
              period: 4
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Peas, field',
    plant_id: '0043',
    per_cell: 6,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [12, 31],
            end: [25, 33],
            harvest: {
              grown: 60,
              bloom: '',
              period: 4
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Peppers',
    plant_id: '0044',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [16, 31],
            end: [23, 32],
            harvest: {
              grown: 77,
              bloom: '',
              period: 12
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Potatoes, Irish',
    plant_id: '0045',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'tuber',
            start: [7],
            end: [12],
            harvest: {
              grown: 107,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Sweetpotatoes',
    plant_id: '0046',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [18],
            end: [27],
            harvest: {
              grown: 110,
              bloom: '',
              period: 0
            }
          },
          {
            type: 'tuber',
            start: [18],
            end: [27],
            harvest: {
              grown: 107,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Pumpkin',
    plant_id: '0047',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [16],
            end: [27],
            harvest: {
              grown: 117,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Radishes',
    plant_id: '0048',
    per_cell: 9,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [5, 31],
            end: [25, 36],
            harvest: {
              grown: 22,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Rutabega',
    plant_id: '0049',
    per_cell: 5,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [5, 27],
            end: [14, 38],
            harvest: {
              grown: 75,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Spinach',
    plant_id: '0050',
    per_cell: 4,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [7, 31],
            end: [25, 40],
            harvest: {
              grown: 55,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Squash, summer',
    plant_id: '0051',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [14],
            end: [31],
            harvest: {
              grown: 35,
              bloom: '',
              period: 10
            }
          },
          {
            type: 'seed',
            start: [14],
            end: [31],
            harvest: {
              grown: 55,
              bloom: '',
              period: 10
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Squash, winter',
    plant_id: '0052',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [16],
            end: [31],
            harvest: {
              grown: 54,
              bloom: '',
              period: 10
            }
          },
          {
            type: 'seed',
            start: [16],
            end: [31],
            harvest: {
              grown: 82,
              bloom: '',
              period: 10
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Sunflower',
    plant_id: '0053',
    per_cell: 2,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [12],
            end: [18],
            harvest: {
              grown: 82,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Tomatoes',
    plant_id: '0054',
    per_cell: 1,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'transplant',
            start: [16, 31],
            end: [27, 32],
            harvest: {
              grown: 80,
              bloom: '',
              period: 0
            }
          }
        ]
      }
    ]
  },
  {
    plant_name: 'Turnips',
    plant_id: '0055',
    per_cell: 9,
    planting: [
      {
        zone: 7,
        variant: [
          {
            type: 'seed',
            start: [5, 31],
            end: [25, 36],
            harvest: {
              grown: 57,
              bloom: '',
              period: 0
            }
          }
        ]
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

// UI REFRESH CODE HERE

// When the document is loaded build the bed layout view
viewConstructor('bed-layout', false);


// Build a view from scratch
function viewConstructor(view, fromSave) {
  switch(true) {
      case view=='bed-layout':
        // Clear and tag
        document.querySelector('body').innerHTML = "";
        document.querySelector('body').setAttribute('data-step', 'bed-layout');

        // Craft side panel
        document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="side-panel"><div class="container"><h1>Bed Layout</h1></div></div>');

        // Craft the viewport UI
        document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="viewport-ui"></div>');
        document.querySelector('.viewport-ui').insertAdjacentHTML('afterbegin', '<div class="view-actions"></div>');
        document.querySelector('.view-actions').insertAdjacentHTML('afterbegin', '<div class="back-action"></div>');
        document.querySelector('.view-actions').insertAdjacentHTML('afterbegin', '<div class="forward-action"></div>');
        document.querySelector('.forward-action').insertAdjacentHTML('afterbegin', '<div class="button-no-select button-forward" data-next-step="plant-selection">Select Plants<div class="button-arrow"></div></div>');
        document.querySelector('.view-actions').insertAdjacentHTML('afterbegin', '<div class="file-actions"></div>');
        document.querySelector('.file-actions').insertAdjacentHTML('afterbegin', '<div class="file-button" data-file="load"></div><div class="file-button" data-file="save"></div>');

        // Craft the viewport
        document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="viewport"></div>');
        var draw = SVG().addTo('.viewport').size('100%', '100%').attr({id: 'viewport-svg', opacity: 1}).viewbox('0 150 850 500');
        var bedGroup = draw.group().attr({id: 'bed-group'});
        var gridGroup = draw.group().attr({id: 'grid-floor'});

        // If loading from a save, populate elements
        if(fromSave == true) {
          // Save state load
        } else {
          // Add side panel content
          document.querySelector('.side-panel').insertAdjacentHTML('beforeend', '<div class="panel-content"><div class="content-bed-add"><div class="add-icon"></div><h3>Add Bed</h3></div></div>');

          // Add UI listeners
          // Add event listener to Add Bed button when clicked
          document.querySelector('.content-bed-add').addEventListener('click', function() {
            bedAddition();
          }, true);
        }

        // Set all UI elements up to transition in from nothing
        gsap.timeline()
          .set('.side-panel', {left: '-150%'})
          .set('.file-button', {scale: .25, opacity: 0, transition: 0})
          .set('.button-forward', {x: '-25%', opacity: 0, transition: 0})
          .set('#viewport-svg', {opacity: 0})

        // Bring in the UI elements
        gsap.timeline()
          .to('.side-panel', {duration: 1, ease: 'power4.out', left: '40px'})
          .to('.file-button[data-file="load"]', {duration: .15, ease: 'linear', opacity: 1}, "-=.4")
          .to('.file-button[data-file="load"]', {duration: .375, ease: 'circ', scale: 1}, "-=.45")
          .to('.file-button[data-file="save"]', {duration: .15, ease: 'linear', opacity: 1}, "-=.3")
          .to('.file-button[data-file="save"]', {duration: .375, ease: 'circ', scale: 1}, "-=.35")
          .to('.button-forward', {duration: .25, ease: 'linear', opacity: 1}, "-=.25")
          .to('.button-forward', {duration: .5, ease: 'circ', x: '0%'}, "-=.25")
          .set('.file-button', {clearProps: 'all'})
          .set('.button-forward', {clearProps: 'all'})
        break;
      default:
        // ADD DEFAULT HOME SCREEN HERE
    }
}

// BED UI HANDLERS

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
      gsap.to('#viewport-svg', {duration: .375, ease: 'linear', opacity: 1});
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
    var draw = SVG('#viewport-svg');
    let cellSize = 100;
    // Add the DOM elements
    // Add the bed parent
    document.querySelector('.content-bed-add').insertAdjacentHTML('beforebegin', '<div class="content-bed-item" data-bed-id="bed_' + bedID + '" id="bed_item_' + bedID + '"><div class="container"></div></div>');
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

    // Scroll to the new bed's location
    let bedItemContent = document.querySelector('#bed_item_' + bedID);
    let bedScrollPos = bedItemContent.offsetTop;

    scrollTo(document.querySelector('.panel-content'), bedScrollPos, 250);
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
    var draw = SVG('#viewport-svg');
    var bedGroup = SVG('#bed-group');
    var gridGroup = SVG('#grid-floor');
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

// END BED UI HANDLERS

// Scroll to a scroll position
function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function(){
        currentTime += increment;
        var val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    function easeInOutQuad(t, b, c, d) {
      t /= d/2;
    	if (t < 1) return c/4*t*t + b;
    	t--;
    	return -c/4 * (t*(t-2) - 1) + b;
    };
}

// END UI REFRESH


//
// // TEMP CODE
// // When clicking the forward button move to the next step
// document.querySelector('.button-forward').addEventListener('click', function() {
//   // Test that the button is active
//   if(this.classList.contains('button-no-select') !== true) {
//     transitionStep(document.querySelector('body').getAttribute('data-step'), this.getAttribute('data-next-step'))
//   }
// }, true);
//
// // TEMP CODE
// // When clicking the backward button move to the previous step
// document.querySelector('.button-backward').addEventListener('click', function() {
//   // Test that the button is active
//   if(this.classList.contains('button-no-select') !== true) {
//     transitionStep(document.querySelector('body').getAttribute('data-step'), this.getAttribute('data-last-step'))
//   }
// }, true);
//
// // This function removes a warning crumb based on the passed ID
// function removeByAttr(attr, value) {
//   document.querySelector(attr + value).remove();
// }
//
// // This function transitions from one state to another
// function transitionStep(stepFrom, stepTo) {
//   switch(true) {
//     // Forward to plant selection from bed layout
//     case stepFrom=='bed-layout' && stepTo=='plant-selection':
//       // From bed layout to plant selection
//       // Set the body step to plant selection
//       document.querySelector('body').setAttribute('data-step', 'plant-selection');
//       gsap.timeline()
//         .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '105%', opacity: 0})
//         .to('.content-bed-item > .container', {duration: .4, ease: "power1.inOut", y: '110%', opacity: 0, stagger: {each: 0.075,from: "start",grid: "auto", ease: "power3.in"}}, "-=.25")
//         .call(zoomViewboxOut, [500, 0, 'now', '<>'])
//         .to('.content-bed-add *', {duration: .375, ease: "power1.inOut", y: '250%', opacity: 0}, "-=.3")
//         .call(textChange, ['.side-panel > .container > h1', 'Choose Plants'])
//         .call(removeElement, ['.panel-content > div'])
//         .set('.forward-action', {overflow: 'hidden'})
//         .set('.back-action', {overflow: 'hidden'})
//         .to('.back-action > div',  {duration: .375, ease: 'power2.inOut', y: '150%', opacity: 0})
//         .to('.forward-action > div',  {duration: .375, ease: 'power2.inOut', y: '150%', opacity: 0}, "-=.25")
//         .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '0%', opacity: 1})
//         .call(generateCells)
//         .call(cellTransition)
//         .call(populatePanel, [stepTo])
//         .to('.back-action > div',  {duration: .375, ease: 'power2.inOut', y: '0%', opacity: 1})
//         .to('.forward-action > div',  {duration: .375, ease: 'power2.inOut', y: '0%', opacity: 1}, "-=.25")
//         .set('.back-action',  {clearProps: 'all'})
//         .set('.forward-action',  {clearProps: 'all'})
//
//       break;
//     // Back to bed layout from plant selection
//     case stepFrom=='plant-selection' && stepTo=='bed-layout':
//       // From bed layout to plant selection
//       // Set the body step to plant selection
//       document.querySelector('body').setAttribute('data-step', 'plant-selection');
//       gsap.timeline()
//         .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '105%', opacity: 0})
//         .set('.panel-content > div', {overflow: 'hidden'})
//         .to('.panel-content > div > div', {duration: .4, ease: "power1.inOut", y: '110%', opacity: 0, stagger: {each: 0.075,from: "start",grid: "auto", ease: "power3.in"}}, "-=.25")
//         .call(zoomViewboxIn, [500, 0, 'now', '<>'])
//         // .to('.content-bed-add *', {duration: .375, ease: "power1.inOut", y: '250%', opacity: 0}, "-=.3")
//         .call(textChange, ['.side-panel > .container > h1', 'Bed Layout'])
//         .call(removeElement, ['.panel-content > div'])
//         .set('.forward-action', {overflow: 'hidden'})
//         .set('.back-action', {overflow: 'hidden'})
//         .to('.back-action > div',  {duration: .375, ease: 'power2.inOut', y: '150%', opacity: 0})
//         .to('.forward-action > div',  {duration: .375, ease: 'power2.inOut', y: '150%', opacity: 0}, "-=.25")
//         .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '0%', opacity: 1})
//         // .call(generateCells)
//         .call(cellTransition)
//         .call(populatePanel, [stepTo])
//         .to('.back-action > div',  {duration: .375, ease: 'power2.inOut', y: '0%', opacity: 1})
//         .to('.forward-action > div',  {duration: .375, ease: 'power2.inOut', y: '0%', opacity: 1}, "-=.25")
//         .set('.back-action',  {clearProps: 'all'})
//         .set('.forward-action',  {clearProps: 'all'})
//
//       break;
//
//     // Forward to plant-planner from plant selection
//     case stepFrom=='plant-selection' && stepTo=='plant-planner':
//       // Set the body step to plant planner
//       document.querySelector('body').setAttribute('data-step', 'plant-planner');
//       gsap.timeline()
//         .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '105%', opacity: 0})
//         .set('.search-wrapper', {overflow: 'hidden'})
//         .to('.search-wrapper > .container', {duration: .4, ease: "power1.inOut", y: '110%', opacity: 0}, "-=.25")
//         .to('.bed-area', {duration: .375, ease: "power1.inOut", top: 0, clearProps: 'height'}, "-=.3")
//         .call(textChange, ['.side-panel > .container > h1', 'Planner'])
//         .set('.forward-action', {overflow: 'hidden'})
//         .set('.back-action', {overflow: 'hidden'})
//         .to('.back-action > div',  {duration: .375, ease: 'power2.inOut', y: '150%', opacity: 0})
//         .to('.forward-action > div',  {duration: .375, ease: 'power2.inOut', y: '150%', opacity: 0}, "-=.25")
//         .to('.side-panel > .container > h1', {duration: .375, delay: .125, ease: "power2.inOut", y: '0%', opacity: 1})
//         .call(populatePanel, [stepTo])
//         .to('.back-action > div',  {duration: .375, ease: 'power2.inOut', y: '0%', opacity: 1})
//         .to('.forward-action > div',  {duration: .375, ease: 'power2.inOut', y: '0%', opacity: 1}, "-=.25")
//         .set('.back-action',  {clearProps: 'all'})
//         .set('.forward-action',  {clearProps: 'all'})
//
//       break;
//     default:
//       // code block
//   }
// }
//
// // This function generates a set of swap arrows between two points
// function generateSwapArrows(p1, p2) {
//   let cellSize = 100;
//   // If swap arrows exist, remove them
//   if(SVG('#swap_arrows') !== null) {
//     SVG('#swap_arrows').remove();
//   }
//
//   // Calculate distance between the two points
//   let dist = Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2));
//
//   // Draw two 'lines' (rect) from p1 to p2, shortened by half the cell size, offset to the right by 1/4th the cell size, also offset it down/up by 3.5, also offset it left/right by 4px
//   let lineThickness = 3;
//   let topPoints = [(p1.x + cellSize/4) + ',' + (p1.y - (3.5+(lineThickness/2))), (p1.x + (dist-((cellSize/4) + 4))) + ',' + (p1.y - (3.5+(lineThickness/2))), (p1.x + (dist-((cellSize/4) + 4))) + ',' + (p1.y - (3.5-(lineThickness/2))), (p1.x + cellSize/4) + ',' + (p1.y - (3.5-(lineThickness/2)))];
//   let lineTop = draw.polygon(topPoints.join(' ')).attr({id: 'top_line'});
//   let lineTopStroke = draw.polygon(topPoints.join(' ')).attr({id: 'top_line_stroke'});
//   let bottomPoints = [(p1.x + ((cellSize/4)+4)) + ',' + (p1.y + (3.5+(lineThickness/2))), (p1.x + (dist-(cellSize/4))) + ',' + (p1.y + (3.5+(lineThickness/2))), (p1.x + (dist-(cellSize/4))) + ',' + (p1.y + (3.5-(lineThickness/2))), (p1.x + ((cellSize/4)+4)) + ',' + (p1.y + (3.5-(lineThickness/2)))];
//   let lineBottom = draw.polygon(bottomPoints.join(' ')).attr({id: 'bottom_line'});
//   let lineBottomStroke = draw.polygon(bottomPoints.join(' ')).attr({id: 'bottom_line_stroke'});
//
//   // Draw two arrowheads and position them at the ends of the lines
//   let arrowheadTopPoints = [(p1.x + ((dist-(cellSize/4))-8)) + ',' + (p1.y - (3.5 + 4.5)), (p1.x + (dist-(cellSize/4))+1) + ',' + (p1.y - 3.5), (p1.x + ((dist-(cellSize/4))-8)) + ',' + (p1.y - (3.5 - 4.5))];
//   let arrowheadTop = draw.polygon(arrowheadTopPoints.join(' ')).attr({id: 'top_arrow'});
//   let arrowheadTopStroke = draw.polygon(arrowheadTopPoints.join(' ')).attr({id: 'top_arrow_stroke'});
//   let arrowheadBottomPoints = [(p1.x + ((cellSize/4)+8)) + ',' + (p1.y + (3.5 + 4.5)), (p1.x + ((cellSize/4)-1)) + ',' + (p1.y + 3.5), (p1.x + ((cellSize/4)+8)) + ',' + (p1.y + (3.5 - 4.5))];
//   let arrowheadBottom = draw.polygon(arrowheadBottomPoints.join(' ')).attr({id: 'bottom_arrow'});
//   let arrowheadBottomStroke = draw.polygon(arrowheadBottomPoints.join(' ')).attr({id: 'bottom_arrow_stroke'});
//
//   // Group the objects
//   let swapGroup = draw.group().attr({id: 'swap_arrows', opacity: 0});
//   let swapGroupStroke = draw.group().attr({id: 'swap_stroke'});
//   let swapGroupFill = draw.group().attr({id: 'swap_fill'});
//   // Stroke
//   lineTopStroke.putIn(swapGroupStroke);
//   lineBottomStroke.putIn(swapGroupStroke);
//   arrowheadTopStroke.putIn(swapGroupStroke);
//   arrowheadBottomStroke.putIn(swapGroupStroke);
//   // Fill
//   lineTop.putIn(swapGroupFill);
//   lineBottom.putIn(swapGroupFill);
//   arrowheadTop.putIn(swapGroupFill);
//   arrowheadBottom.putIn(swapGroupFill);
//   // Group
//   swapGroupStroke.putIn(swapGroup);
//   swapGroupFill.putIn(swapGroup);
//
//   // Style
//   swapGroupFill.fill("#2D936C");
//   swapGroupStroke.stroke({width: 6, color: '#ffffff', linejoin: 'round'});
//
//   // Calculate rotation
//   let rot = Math.atan2((p2.y - p1.y),( p2.x - p1.x)) * 180 / Math.PI;
//   swapGroup.rotate(rot, p1.x, p1.y);
//
//   // Animate in
//   swapGroup.animate(200, '<>', 0).attr({opacity: 1})
// }
//
// // This function generates a set of swap arrows between two points
// function generateRemoveX(p1) {
//   let cellSize = 100;
//   // If remove x exists, remove it
//   if(SVG('#x_icon') !== null) {
//     SVG('#x_icon').remove();
//   }
//
//   // Draw a polgon x
//   let lineThickness = 3;
//   let lineLength = 14;
//   let xValues = {
//     xMin: p1.x-lineLength,
//     xInMin: p1.x-(lineThickness/2),
//     xInMax: p1.x+(lineThickness/2),
//     xMax: p1.x+lineLength
//   }
//   let yValues = {
//     yMin: p1.y-lineLength,
//     yInMin: p1.y-(lineThickness/2),
//     yInMax: p1.y+(lineThickness/2),
//     yMax: p1.y+lineLength
//   }
//   let xPoints = [xValues.xInMax + ',' + yValues.yInMin, xValues.xMax + ',' + yValues.yInMin, xValues.xMax + ',' + yValues.yInMax, xValues.xInMax + ',' + yValues.yInMax, xValues.xInMax + ',' + yValues.yMax, xValues.xInMin + ',' + yValues.yMax, xValues.xInMin + ',' + yValues.yInMax, xValues.xMin + ',' + yValues.yInMax, xValues.xMin + ',' + yValues.yInMin, xValues.xInMin + ',' + yValues.yInMin, xValues.xInMin + ',' + yValues.yMin, xValues.xInMax + ',' + yValues.yMin];
//   let xPoly = draw.polygon(xPoints.join(' ')).attr({id: 'x_poly_poly'});
//   let xStroke = draw.polygon(xPoints.join(' ')).attr({id: 'x_stroke_poly'});
//
//   // Group the objects
//   let xGroup = draw.group().attr({id: 'x_icon', opacity: 0});
//   let xGroupStroke = draw.group().attr({id: 'x_stroke'});
//   let xGroupFill = draw.group().attr({id: 'x_fill'});
//   // Stroke
//   xStroke.putIn(xGroupStroke);
//   // Fill
//   xPoly.putIn(xGroupFill);
//   // Group
//   xGroupStroke.putIn(xGroup);
//   xGroupFill.putIn(xGroup);
//
//   // Style
//   xGroupFill.fill("#DB4535");
//   xGroupStroke.stroke({width: 6, color: '#ffffff', linejoin: 'round'});
//
//   // Calculate rotation
//   let rot = 45;
//   xGroup.rotate(rot, p1.x, p1.y);
//
//   // Animate in
//   xGroup.animate(200, '<>', 0).attr({opacity: 1})
// }
//
// // This function changes the text of a passed element to passed text
// function textChange(selector, text) {
//   document.querySelector(selector).textContent = text;
// }
//
// // This function removes all matched passed elements
// function removeElement(selector) {
//   document.querySelectorAll(selector).forEach(function(e) {
//     e.remove();
//   })
// }
//
// // This function zooms out the viewbox on the viewport SVG given passed values
// function zoomViewboxOut(duration, delay, when, ease) {
//   let cellSize = 100;
//   // Zoom out a bit
//   let currentViewbox = draw.viewbox()
//   draw.animate(duration, delay, when).ease(ease).viewbox(currentViewbox.x-cellSize, currentViewbox.y-cellSize, currentViewbox.width+(cellSize*2) , currentViewbox.height+(cellSize*2));
// }
//
// // This function zooms in the viewbox on the viewport SVG given passed values
// function zoomViewboxIn(duration, delay, when, ease) {
//   let cellSize = 100;
//   // Zoom out a bit
//   let currentViewbox = draw.viewbox()
//   draw.animate(duration, delay, when).ease(ease).viewbox(currentViewbox.x+cellSize, currentViewbox.y+cellSize, currentViewbox.width-(cellSize*2) , currentViewbox.height-(cellSize*2));
// }
//
// // This function creates cells and dividers for each bed
// function generateCells() {
//   let cellSize = 100;
//   // Iterate over each row
//   document.querySelectorAll('#bed-group > g').forEach(function(row) {
//     let rowNumb = row.id.split('-')[1];
//     // Iterate over each bed in this row
//     document.querySelectorAll('#' + row.id + ' g').forEach(function(bed) {
//       // Get the height and width of the current bed
//       let thisHeight = SVG('#' + bed.id + '_base').height();
//       let thisWidth = SVG('#' + bed.id + '_base').width();
//
//       // Create a group for the cells and dividers to go in
//       let cellGroup = draw.group().attr({id: bed.id + '_cells'});
//       let dividerGroup = draw.group().attr({id: bed.id + '_dividers'});
//       let contentGroup = draw.group().attr({id: bed.id + '_content'});
//
//       // Place the groups in order
//       cellGroup.putIn(contentGroup);
//       dividerGroup.putIn(contentGroup);
//       contentGroup.putIn(SVG('#' + bed.id));
//
//       // Store the bbox for the current bed
//       let bedBBox = SVG('#' + bed.id + '_base').bbox();
//       // Iterate over the width of the bed, creating vertical dividers
//       for(var i=0; i < (thisWidth/cellSize)-1; i++) {
//         // Start placement at x1 + cellSize
//         let vDivider = draw.line(bedBBox.x+(cellSize*(i+1)), bedBBox.y, bedBBox.x+(cellSize*(i+1)), bedBBox.y2).stroke({width: 2, color: '#ffffff', dasharray: (bedBBox.y2 - bedBBox.y) + ' ' + ((bedBBox.y2 - bedBBox.y)+10), dashoffset: ((bedBBox.y2 - bedBBox.y)+10)}).attr({class: 'vert-divider'});
//         // Place the divder in the divider group
//         vDivider.putIn(dividerGroup);
//       }
//       // Iterate over the height of the bed, creating horizontal dividers
//       for(var i=0; i < (thisHeight/cellSize)-1; i++) {
//         // Start placement at x1 + cellSize
//         let hDivider = draw.line(bedBBox.x, bedBBox.y+(cellSize*(i+1)), bedBBox.x2, bedBBox.y+(cellSize*(i+1))).stroke({width: 2, color: '#ffffff', dasharray: (bedBBox.x2 - bedBBox.x) + ' ' + ((bedBBox.x2 - bedBBox.x)+10), dashoffset: ((bedBBox.x2 - bedBBox.x)+10)}).attr({class: 'horz-divider'});
//         hDivider.putIn(dividerGroup);
//       }
//
//       // Add a border-rect to the divder group
//       let border = draw.rect(bedBBox.width, bedBBox.height).cx(bedBBox.cx).cy(bedBBox.cy).attr({class: 'bed-border', fill: 'none'}).stroke({width: 6, color: '#ffffff'});
//       border.putIn(dividerGroup);
//
//       // Create the cells
//       // Iterate over the height
//       let totalCellCount = 0;
//       for(var h=0; h < (thisHeight/cellSize); h++) {
//         // Iterate over the width
//         for(var w=0; w < (thisWidth/cellSize); w++) {
//           // Create a cell at the right height and width coordinate
//           let cellID = 'cell_' + bed.id.split('_')[1] + '_' + totalCellCount;
//           let cell = draw.rect(cellSize, cellSize).x((bedBBox.x + (w*cellSize))).y((bedBBox.y + (h*cellSize))).attr({id: cellID, class: 'bed-cell'}).fill({color: '#596475', opacity: 0});
//
//           cell.putIn(cellGroup);
//           totalCellCount++;
//         }
//       }
//
//       // Move the cell group behind the divider group
//       cellGroup.back();
//     })
//   })
// }
//
// // This function transitions the beds from the bed view to the cell view
// function cellTransition() {
//   let cellSize = 100;
//   // Order of timeline
//   // Move each bed label up and change its color and opacity
//   // Draw in each horizontal divider
//   // Draw in each vertical divder
//
//   // Iterate over the beds, setting the y position of the text label to above the bed
//   document.querySelectorAll('#bed-group > g > g').forEach(function(bed, i) {
//     // Calculate what y position the label will be at
//     let minBedY = SVG('#' + bed.id + '_base').bbox().y;
//     let delay = 50 * i;
//     // Animate the text label
//     SVG('#' + bed.id + '_label').animate(500, delay, 'now').ease('<>').attr({fill: '#596475', opacity: .38, y: minBedY-(cellSize/2)});
//   });
//
//   // Animate the dividers
//   gsap.timeline()
//     .to('#bed-group > g > g > g > g > line', {duration: .5, delay: .2, ease: 'power2.inOut', strokeDashoffset: 0, stagger: {each: .025, from: 'start', ease: 'power1.inOut'}})
// }
//
// // PANEL STATE CHANGE
//
//
// // This function populates the panel based on passed states
// function populatePanel(state) {
//   switch(true) {
//     case state=='plant-selection':
//       // Add Plant Search to panel content
//       document.querySelector('.panel-content').insertAdjacentHTML('afterbegin', '<div class="search-wrapper"><div class="container"><div class="plant-search"><div class="search-box"><input type="text" placeholder="Start Typing" id="search-plants"><div class="search-suggestions"></div></div><div class="add-option" id="remove-zone"></div></div><div class="plant-items" id="no_bed_plants"><div id="search-container-dropzone"></div></div></div></div>');
//
//       // Event Listeners for Search
//       // This adds an event listener to the search box so that when it is in focus the search results are open
//       document.querySelector("#search-plants").addEventListener("focusin", function(e) {
//         gsap.to('.search-suggestions', {duration: .1, ease: 'linear', height: 'auto', backgroundColor: '#ffffff', boxShadow: '0px 4px 16px 2px var(--secondary-color-min)', paddingTop: '36px'});
//         let query = document.querySelector("#search-plants").value;
//         updatePlantSearchResult(query)
//       });
//       // And when focus is out
//       document.querySelector("#search-plants").addEventListener("focusout", function(e) {
//         gsap.to('.search-suggestions', {duration: .1, ease: 'linear', clearProps: 'all'});
//
//         // When there is any value in the search box and it matches an item in the search array, color the add button
//         let query = document.querySelector("#search-plants").value;
//         if(query.length > 0 && plantSearchArray.indexOf(query) !== -1) {
//           gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', backgroundColor: 'var(--primary-color)'})
//         } else {
//           gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
//         }
//       });
//
//       // Add plant item to no-parent area if the add icon is active
//       document.querySelector(".plant-search > .add-option").addEventListener("click", function(e) {
//         // Add the option to the no-parent area
//         addPlantOption(plantData[plantSearchArray.indexOf(document.querySelector("#search-plants").value)])
//
//         // Clear search
//         gsap.to('.add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
//         document.querySelector("#search-plants").value = '';
//       });
//
//       // Add the update plant search result to the plant search box
//       document.querySelector("#search-plants").addEventListener("input", function() {
//         let query = document.querySelector("#search-plants").value;
//         updatePlantSearchResult(query);
//
//         // When there is any value in the search box and it matches an item in the search array, color the add button
//         if(query.length > 0 && plantSearchArray.indexOf(query) !== -1) {
//           gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', backgroundColor: 'var(--primary-color)'})
//         } else {
//           gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
//         }
//       });
//
//       // Set the panel content to overflow-y hidden
//       gsap.set('.panel-content', {overflowY: 'hidden'});
//
//       // Add the bed wrapper
//       document.querySelector('.panel-content').insertAdjacentHTML('beforeend', '<div class="bed-area"><div class="container"></div></div>');
//
//       // Iterate over each bed
//       document.querySelectorAll('#bed-group > g > g').forEach(function(bed) {
//         // Create a bed wrapper for the current bed in the panel content
//         document.querySelector('.panel-content > .bed-area > .container').insertAdjacentHTML('beforeend', '<div class="bed-wrapper" id="' + bed.id + '_plants" data-name="' + bed.getAttribute('data-name') + '" data-bed-id="' + bed.id + '"></div>');
//
//         // Iterate over each cell in the bed
//         document.querySelectorAll('#' + bed.id + '_cells > rect').forEach(function(cell) {
//           // Store info about the current cell
//           let cellBed = cell.id.split('_')[1];
//           let cellNum = cell.id.split('_')[2];
//
//           // Insert an empty item into the bed wrapper for this cell
//           document.querySelector('#' + bed.id + '_plants').insertAdjacentHTML('beforeend', '<div class="blank-item" data-cell="' + cellNum + '" id="empty_' + cellBed + '_' + cellNum + '"></div>');
//
//           // Add event listeners to the empty item for DnD functionality
//           document.querySelector('#empty_' + cellBed + '_' + cellNum).addEventListener('dragenter', handleDragEnter, false);
//           document.querySelector('#empty_' + cellBed + '_' + cellNum).addEventListener('dragover', allowDrop, false);
//           document.querySelector('#empty_' + cellBed + '_' + cellNum).addEventListener('dragleave', handleDragLeave, false);
//         })
//       });
//
//       // Add the drag info div
//       document.querySelector('.panel-content').insertAdjacentHTML('beforeend', '<div id="drag-info"></div>');
//
//       // Add event listeners to the remove item for DnD removal
//       document.querySelector('#remove-zone').addEventListener('dragenter', handleDragEnter, false);
//       document.querySelector('#remove-zone').addEventListener('dragover', allowDrop, false);
//       document.querySelector('#remove-zone').addEventListener('dragleave', handleDragLeave, false);
//
//       // Add event listeners to the add item for DnD addition
//       document.querySelector('#search-container-dropzone').addEventListener('dragenter', handleDragEnter, false);
//       document.querySelector('#search-container-dropzone').addEventListener('dragover', allowDrop, false);
//       document.querySelector('#search-container-dropzone').addEventListener('dragleave', handleDragLeave, false);
//
//       // Change out the step buttons
//       document.querySelector('.forward-action > div').setAttribute('data-next-step', 'plan-creation');
//       document.querySelector('.forward-action > div').classList.remove('button-primary');
//       document.querySelector('.forward-action > div').classList.add('button-no-select')
//       document.querySelector('.forward-action > div').childNodes[0].nodeValue = "Create Plan";
//       document.querySelector('.back-action > div').setAttribute('data-last-step', 'bed-layout');
//       document.querySelector('.back-action > div').childNodes[1].nodeValue = "Bed Layout";
//
//       break;
//     default:
//       // ADD DEFAULT HOME SCREEN HERE
//   }
// }
//
//
// // PLANT SELECTION
//
//
// // This function updates the search results
// function updatePlantSearchResult(query) {
//   let resultList = document.querySelector(".search-suggestions");
//   resultList.innerHTML = "";
//
//   plantSearchArray.map(function(algo){
//       query.split(" ").map(function (word){
//           if(algo.toLowerCase().indexOf(word.toLowerCase()) != -1 && resultList.childNodes.length < 5){
//               resultList.innerHTML += `<li>${algo}</li>`;
//           }
//       })
//   });
//
//   // Add event listener to each search item
//   document.querySelectorAll(".search-suggestions > li").forEach(function(e) {
//     e.addEventListener("click", function() {
//       // Fill the search box in with the clicked value
//       document.querySelector("#search-plants").value = e.textContent;
//
//       // When there is any value in the search box and it matches an item in the search array, color the add button
//       if(e.textContent.length > 0 && plantSearchArray.indexOf(e.textContent) !== -1) {
//         gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', backgroundColor: 'var(--primary-color)'})
//       } else {
//         gsap.to('.plant-search > .add-option', {duration: .2, ease: 'power2.inOut', clearProps: 'backgroundColor'})
//       }
//     });
//   })
// };
//
// // This function adds a search item to the no-parent container for new search items
// function addPlantOption(plantObj) {
//   let itemCount = document.querySelectorAll('.grab-item').length;
//
//   // Select a color from the label color array given the total items % the number of items in the label color array
//   let labelColor = labelColors[itemCount%labelColors.length];
//
//   // Add the item to the no-parent container
//   let newPlantCount = document.querySelectorAll('.grab-item').length + 1;
//   let newItem = '<div class="grab-item" data-label-color="' + labelColor + '" id="plant_' + newPlantCount + '" data-cell="-1" draggable="true">' + plantObj.plant_name + '</div>';
//   console.log('plantCount: ' + newPlantCount)
//   // Add the drag and drop event listeners to the new item
//   document.querySelector('#no_bed_plants').insertAdjacentHTML('afterbegin', newItem);
//   addDragAndDrop('#plant_' + newPlantCount);
//
//   // Move the bed area to just below the search results
//   gsap.to('.bed-area',{duration: .125, ease: 'power2-inOut', top: ((document.querySelector('.search-wrapper').offsetHeight + 10) + 'px'), height: ((document.querySelector('.panel-content').offsetHeight - (document.querySelector('.search-wrapper').offsetHeight + 10)) + 'px')});
// }
//
// // This is the drag and drop data transfer format
// class DnDItem {
//   constructor(id, container, place, text, color) {
//     this.id = id;
//     this.container = container;
//     this.place = place;
//     this.text = text;
//     this.color = color;
//   }
// }
//
// function dragStart(ev) {
//   // Style this element to indicate it is being dragged
//   gsap.to(this, {duration: .2, ease: 'power2.inOut', opacity: .5});
//
//   // Add the drag item's data to the drag-info div
//   let dragInfoElement = document.querySelector('#drag-info');
//
//   let dragItem = new DnDItem(this.id, this.parentNode.id, this.getAttribute('data-cell'), this.textContent, this.getAttribute('data-label-color'));
//   dragInfoElement.setAttribute('data-drag', JSON.stringify(dragItem));
//
//   // Style the search area components
//   styleSearch('dragging');
// }
//
// function dragEnd(ev) {
//   // Style this element to indicate it is being dragged
//   gsap.to(this, {duration: .2, ease: 'power2.inOut', clearProps: 'opacity'});
//
//   // Style the search area components
//   styleSearch('default');
//
//   // Grab drag data
//   let dragData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-drag'));
//   let targetData = document.querySelector('#drag-info').getAttribute('data-target');
//
//   // Determine what action will be taken
//   // Check to see if anything happened
//   if(targetData !== null) {
//     // Something happened
//     targetData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-target'));
//     if(targetData.id == 'remove-zone') {
//       // The drag item should be removed
//       if(dragData.place !== null && dragData.place !== '-1') {
//         // The drag item is in a cell, replace it with an empty item
//         // Replace the drag item with a blank item
//         document.querySelector('#' + dragData.id).setAttribute('class', 'blank-item');
//         document.querySelector('#' + dragData.id).removeAttribute('data-label-color');
//         document.querySelector('#' + dragData.id).removeAttribute('draggable');
//         document.querySelector('#' + dragData.id).textContent = '';
//
//         // Remove all event listeners
//         removeDragAndDrop('#' + dragData.id);
//
//         // Add new event listeners
//         addDragAndDrop('#' + dragData.id);
//
//         document.querySelector('#' + dragData.id).setAttribute('id', 'empty_' + dragData.container.split('_')[1] + '_' + dragData.place);
//
//         // Determine the cell id of the drag item
//         let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//
//         // Set the drag cell fill
//         SVG(dragCellID).animate(250, 0, 'now').ease('<>').fill({color: '#596475', opacity: 0});
//
//         // If remove x exists, remove it
//         if(SVG('#x_icon') !== null) {
//           SVG('#x_icon').remove();
//         }
//
//       } else {
//         // Just remove the item
//         document.querySelector('#' + dragData.id).remove();
//       }
//     }
//
//     if(targetData.id == 'search-container-dropzone') {
//       // The drag item should be moved to the no bed list
//       if(dragData.place !== null && dragData.place !== '-1') {
//         // The drag item is in a cell, replace it with an empty item
//         // Replace the drag item with an empty cell
//         document.querySelector('#' + dragData.id).setAttribute('class', 'blank-item');
//         document.querySelector('#' + dragData.id).removeAttribute('data-label-color');
//         document.querySelector('#' + dragData.id).removeAttribute('draggable');
//         document.querySelector('#' + dragData.id).textContent = '';
//
//         // Determine the cell id of the drag item
//         let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//
//         // Set the drag cell fill
//         SVG(dragCellID).animate(250, 0, 'now').ease('<>').fill({color: '#596475', opacity: 0});
//
//         // Remove all event listeners
//         removeDragAndDrop('#' + dragData.id);
//
//         // Add new event listeners
//         addDragAndDrop('#' + dragData.id);
//
//         document.querySelector('#' + dragData.id).setAttribute('id', 'empty_' + dragData.container.split('_')[1] + '_' + dragData.place);
//
//         // Add the plant item back into the no bed list
//         // Set the label color from the old drag item
//         let labelColor = dragData.color;
//
//         // Add the item to the no-parent container
//         let newPlantCount = (document.querySelector('#no_bed_plants').childElementCount-1) + 1;
//         let newItem = '<div class="grab-item" data-label-color="' + labelColor + '" id="plant_' + newPlantCount + '" data-cell="-1" draggable="true">' + dragData.text + '</div>';
//         // Add the drag and drop event listeners to the new item
//         document.querySelector('#no_bed_plants').insertAdjacentHTML('afterbegin', newItem);
//         addDragAndDrop('#plant_' + newPlantCount);
//
//         // Move the bed area to just below the search results
//         gsap.to('.bed-area',{duration: .125, ease: 'power2-inOut', top: ((document.querySelector('.search-wrapper').offsetHeight + 10) + 'px'), height: ((document.querySelector('.panel-content').offsetHeight - (document.querySelector('.search-wrapper').offsetHeight + 10)) + 'px')});
//
//         // If remove x exists, remove it
//         if(SVG('#x_icon') !== null) {
//           SVG('#x_icon').remove();
//         }
//
//       } else {
//         // Do nothing as the plant is already in the list
//       }
//     }
//
//     if(targetData.place !== null && targetData.place !== '-1') {
//       // The target item is a cell reference
//
//       if(dragData.place !== null && dragData.place !== '-1') {
//         // The drag item is also a cell reference
//
//         if(targetData.text !== '') {
//           // The target is a cell reference and is not empty
//           // Set the target cell color to the drag item color and the drag cell to the target item color
//
//           // Determine the cell id of the target item
//           let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place;
//           // Determine the cell id of the drag item
//           let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//
//           // Set the target cell fill
//           SVG(targetCellID).animate(250, 0, 'now').ease('<>').fill({color: dragData.color, opacity: 1});
//           // Set the drag cell fill
//           SVG(dragCellID).animate(250, 0, 'now').ease('<>').fill({color: targetData.color, opacity: 1});
//
//           // Replace the target item with the drag item
//           document.querySelector('#' + targetData.id).setAttribute('class', 'grab-item');
//           document.querySelector('#' + targetData.id).setAttribute('data-label-color', dragData.color);
//           document.querySelector('#' + targetData.id).setAttribute('draggable', 'true');
//           document.querySelector('#' + targetData.id).textContent = dragData.text;
//           document.querySelector('#' + targetData.id).setAttribute('id', 'NEWDRAG');
//
//           // Replace the drag item with the target item
//           document.querySelector('#' + dragData.id).setAttribute('class', 'grab-item');
//           document.querySelector('#' + dragData.id).setAttribute('data-label-color', targetData.color);
//           document.querySelector('#' + dragData.id).setAttribute('draggable', 'true');
//           document.querySelector('#' + dragData.id).textContent = targetData.text;
//           document.querySelector('#' + dragData.id).setAttribute('id',  targetData.id);
//
//           document.querySelector('#NEWDRAG').setAttribute('id', dragData.id);
//
//           // Remove all event listeners
//           removeDragAndDrop('#' + dragData.id)
//           removeDragAndDrop('#' + targetData.id)
//
//           // Add new event listeners
//           addDragAndDrop('#' + dragData.id)
//           addDragAndDrop('#' + targetData.id)
//
//
//           // Remove swap arrows
//           if(SVG('#swap_arrows') !== null) {
//             SVG('#swap_arrows').remove();
//           }
//
//           // If remove x exists, remove it
//           if(SVG('#x_icon') !== null) {
//             SVG('#x_icon').remove();
//           }
//
//         } else {
//           // The target is a cell reference but is empty
//           // Set the target cell color to the drag item color
//
//           // Determine the cell id of the target item
//           let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place;
//           // Determine the cell id of the drag item
//           let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//
//           // Set the target cell fill
//           SVG(targetCellID).animate(250, 0, 'now').ease('<>').fill({color: dragData.color, opacity: 1});
//           // Set the drag cell fill
//           SVG(dragCellID).animate(250, 0, 'now').ease('<>').fill({color: '#596475', opacity: 0});
//
//           // Replace the target item with the drag item
//           document.querySelector('#' + targetData.id).setAttribute('class', 'grab-item');
//           document.querySelector('#' + targetData.id).setAttribute('data-label-color', dragData.color);
//           document.querySelector('#' + targetData.id).setAttribute('draggable', 'true');
//           document.querySelector('#' + targetData.id).textContent = dragData.text;
//           document.querySelector('#' + targetData.id).setAttribute('id', 'NEWDRAG');
//
//           // Replace the drag item with the target item
//           document.querySelector('#' + dragData.id).setAttribute('class', 'blank-item');
//           document.querySelector('#' + dragData.id).removeAttribute('data-label-color');
//           document.querySelector('#' + dragData.id).removeAttribute('draggable');
//           document.querySelector('#' + dragData.id).textContent = '';
//           document.querySelector('#' + dragData.id).setAttribute('id', 'empty_' + dragData.container.split('_')[1] + '_' + dragData.place);
//
//           document.querySelector('#NEWDRAG').setAttribute('id', dragData.id);
//
//           // Remove all event listeners
//           removeDragAndDrop('#' + dragData.id)
//           removeDragAndDrop('#' + targetData.id)
//
//           // Add new event listeners
//           addDragAndDrop('#' + dragData.id)
//           document.querySelector('#empty_' + dragData.container.split('_')[1] + '_' + dragData.place).addEventListener('dragenter', handleDragEnter, false);
//           document.querySelector('#empty_' + dragData.container.split('_')[1] + '_' + dragData.place).addEventListener('dragover', allowDrop, false);
//           document.querySelector('#empty_' + dragData.container.split('_')[1] + '_' + dragData.place).addEventListener('dragleave', handleDragLeave, false);
//
//           // Remove swap arrows
//           if(SVG('#swap_arrows') !== null) {
//             SVG('#swap_arrows').remove();
//           }
//
//           // If remove x exists, remove it
//           if(SVG('#x_icon') !== null) {
//             SVG('#x_icon').remove();
//           }
//         }
//
//       } else {
//         // The drag item is not a cell reference
//         // Set the cell color to the drag item color
//
//         // Determine the cell id of the target item
//         let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place;
//
//         // Set the cell fill
//         SVG(targetCellID).animate(250, 0, 'now').ease('<>').fill({color: dragData.color, opacity: 1});
//
//         // Replace the target item with the drag item
//         document.querySelector('#' + targetData.id).setAttribute('class', 'grab-item');
//         document.querySelector('#' + targetData.id).setAttribute('data-label-color', dragData.color);
//         document.querySelector('#' + targetData.id).setAttribute('draggable', 'true');
//         document.querySelector('#' + targetData.id).textContent = dragData.text;
//         document.querySelector('#' + targetData.id).setAttribute('id', 'NEWDRAG');
//
//         // Replace the drag item with the target item
//         document.querySelector('#' + dragData.id).setAttribute('class', 'grab-item');
//         document.querySelector('#' + dragData.id).setAttribute('data-label-color', targetData.color);
//         document.querySelector('#' + dragData.id).setAttribute('draggable', 'true');
//         document.querySelector('#' + dragData.id).textContent = targetData.text;
//         document.querySelector('#' + dragData.id).setAttribute('id',  targetData.id);
//
//         document.querySelector('#NEWDRAG').setAttribute('id', dragData.id);
//
//         // Remove all event listeners
//         removeDragAndDrop('#' + dragData.id)
//         removeDragAndDrop('#' + targetData.id)
//
//         // Add new event listeners
//         addDragAndDrop('#' + dragData.id)
//         addDragAndDrop('#' + targetData.id)
//
//         // Remove swap arrows
//         if(SVG('#swap_arrows') !== null) {
//           SVG('#swap_arrows').remove();
//         }
//
//         // If remove x exists, remove it
//         if(SVG('#x_icon') !== null) {
//           SVG('#x_icon').remove();
//         }
//
//         if(targetData.id.split('_')[0] == 'empty') {
//           // The target item was an empty cell, remove it from the no bed list
//           document.querySelector('#' + targetData.id).remove();
//         }
//
//       }
//     }
//
//     // Once finished, remove all the drag and target data
//     document.querySelector('#drag-info').removeAttribute('data-drag');
//     document.querySelector('#drag-info').removeAttribute('data-target');
//   }
//
//   // Once all is finished
//   // If any items in the viewport have a data-ghost tag on them, set their fills to their old fill data
//   if(document.querySelectorAll('rect[data-ghost="true"]').length !== null || document.querySelectorAll('rect[data-ghost="true"]').length !== 0) {
//     console.log('Clearing ghost items');
//     // Iterate over the items
//     document.querySelectorAll('rect[data-ghost="true"]').forEach(function(e) {
//       let currentID = '#' + e.id;
//
//       // Remove the ghost and old fill attributes
//       document.querySelector(currentID).removeAttribute('data-ghost');
//       document.querySelector(currentID).removeAttribute('data-old-fill');
//     });
//
//     // Reset the search height offset for the beds
//     styleSearch('default');
//
//     // If there are no plants in the beds, remove the primary forward style on the forward button
//     if(document.querySelectorAll('.bed-wrapper > .grab-item').length == 0) {
//       // Change the style of the forward button (Grey)
//       document.querySelector('.button-forward').setAttribute('class', 'button-no-select button-forward');
//     } else {
//       // Change the style of the forward button (Green)
//       document.querySelector('.button-forward').setAttribute('class', 'button-primary button-forward');
//     }
//   }
// }
//
// function allowDrop(ev) {
//   ev.preventDefault();
//   return false;
// }
//
// function handleDragEnter(ev) {
//   ev.preventDefault();
//   // A dragging item has entered a target
//
//   // Add the target item's data to the drag-info div
//   let dragInfoElement = document.querySelector('#drag-info');
//
//   let targetItem = new DnDItem(this.id, this.parentNode.id, this.getAttribute('data-cell'), this.textContent, this.getAttribute('data-label-color'));
//   dragInfoElement.setAttribute('data-target', JSON.stringify(targetItem));
//
//   // Here if the drag target is a cell reference, display the cell change in the viewport
//   // If the drag item is also from a cell, include reference arrows and style the drag cell as well
//   // If a cell is showing data preview, add a data-ghost tag to it
//   // Store the old fill data to a fill data tag
//
//   // Grab drag data
//   let dragData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-drag'));
//   let targetData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-target'));
//
//   if(targetData.id == dragData.id && targetData.place == dragData.place) {
//     // The items are the same, do nothing
//   } else {
//     // The items are not the same
//     if(targetData.id == 'remove-zone') {
//       // The drag item should be removed
//       if(dragData.place !== null && dragData.place !== '-1') {
//         // The drag item is in a cell, show a remove x
//         // Add a remove x
//         let cellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//         let cellCenter = {x: SVG(cellID).bbox().cx, y: SVG(cellID).bbox().cy};
//         generateRemoveX(cellCenter);
//       }
//     }
//
//     if(targetData.id == 'search-container-dropzone') {
//       // The drag item should be moved to the no bed list
//       if(dragData.place !== null && dragData.place !== '-1') {
//         // The drag item is in a cell, show a remove x
//         // Add a remove x
//         let cellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//         let cellCenter = {x: SVG(cellID).bbox().cx, y: SVG(cellID).bbox().cy};
//         generateRemoveX(cellCenter);
//       }
//     }
//
//     if(targetData.place !== null && targetData.place !== '-1') {
//       // The target item is a cell reference
//       if(dragData.place !== null && dragData.place !== '-1') {
//         // The drag item is also a cell reference
//         if(targetData.text !== '') {
//           // The target is a cell reference and is not empty
//           // Preview the drag item color in the target cell and the target cell color in the drag cell
//           // Determine the cell id of the target item
//           let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place;
//           // Store the old fill data
//           SVG(targetCellID).data('ghost', 'true', true);
//           let oldTargetFillData = JSON.stringify({fill: SVG(targetCellID).attr('fill'), opacity: SVG(targetCellID).attr('fill-opacity')});
//           SVG(targetCellID).data('old-fill', oldTargetFillData, true);
//
//           // Determine the cell id of the drag item
//           let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//           // Store the old fill data
//           SVG(dragCellID).data('ghost', 'true', true);
//           let oldDragFillData = JSON.stringify({fill: SVG(dragCellID).attr('fill'), opacity: SVG(dragCellID).attr('fill-opacity')});
//           SVG(dragCellID).data('old-fill', oldDragFillData, true);
//
//           // Set the preview fill
//           SVG(targetCellID).animate(250, 0, 'now').ease('<>').fill({color: dragData.color, opacity: .5});
//           SVG(dragCellID).animate(250, 0, 'now').ease('<>').fill({color: targetData.color, opacity: .5});
//
//           // Add swap arrows
//           let dragCellCenter = {x: SVG(dragCellID).bbox().cx, y: SVG(dragCellID).bbox().cy};
//           let targetCellCenter = {x: SVG(targetCellID).bbox().cx, y: SVG(targetCellID).bbox().cy};
//           generateSwapArrows(dragCellCenter, targetCellCenter)
//
//         } else {
//           // The target is a cell reference but is empty
//           // Preview the drag item color in the cell
//
//           // Determine the cell id of the target item
//           let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place;
//           // Store the old fill data
//           SVG(targetCellID).data('ghost', 'true', true);
//           let oldTargetFillData = JSON.stringify({fill: SVG(targetCellID).attr('fill'), opacity: SVG(targetCellID).attr('fill-opacity')});
//           SVG(targetCellID).data('old-fill', oldTargetFillData, true);
//
//           // Determine the cell id of the drag item
//           let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
//           // Store the old fill data
//           SVG(dragCellID).data('ghost', 'true', true);
//           let oldDragFillData = JSON.stringify({fill: SVG(dragCellID).attr('fill'), opacity: SVG(dragCellID).attr('fill-opacity')});
//           SVG(dragCellID).data('old-fill', oldDragFillData, true);
//
//           // Set the preview fill
//           SVG(targetCellID).animate(250, 0, 'now').ease('<>').fill({color: dragData.color, opacity: .5});
//           SVG(dragCellID).animate(250, 0, 'now').ease('<>').fill({color: dragData.color, opacity: 0});
//
//           // Add swap arrows
//           let dragCellCenter = {x: SVG(dragCellID).bbox().cx, y: SVG(dragCellID).bbox().cy};
//           let targetCellCenter = {x: SVG(targetCellID).bbox().cx, y: SVG(targetCellID).bbox().cy};
//           generateSwapArrows(dragCellCenter, targetCellCenter)
//         }
//       } else {
//         // The drag item is not a cell reference
//         // Preview the drag item color in the cell
//
//         // Determine the cell id of the target item
//         let cellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place;
//         // Store the old fill data
//         SVG(cellID).data('ghost', 'true', true);
//         let oldFillData = JSON.stringify({fill: SVG(cellID).attr('fill'), opacity: SVG(cellID).attr('fill-opacity')});
//         SVG(cellID).data('old-fill', oldFillData, true);
//
//         // Set the preview fill
//         SVG(cellID).animate(250, 0, 'now').ease('<>').fill({color: dragData.color, opacity: .5});
//       }
//     }
//   }
// }
//
// function handleDragLeave(ev) {
//   ev.preventDefault();
//   // A dragging item has left a target
//
//   // Add the target item's data to the drag-info div
//   let dragInfoElement = document.querySelector('#drag-info');
//
//   dragInfoElement.removeAttribute('data-target');
//
//   // If any items in the viewport have a data-ghost tag on them, set their fills to their old fill data
//   if(document.querySelectorAll('rect[data-ghost="true"]').length !== null || document.querySelectorAll('rect[data-ghost="true"]').length !== 0) {
//     console.log('Clearing ghost items');
//     // Iterate over the items
//     document.querySelectorAll('rect[data-ghost="true"]').forEach(function(e) {
//       let currentID = '#' + e.id;
//
//       // Set the fill back to the old fill
//       let fillData = SVG(currentID).data('old-fill');
//       SVG(currentID).animate(250, 0, 'now').ease('<>').fill({color: fillData.fill, opacity: fillData.opacity});
//
//       // Remove the ghost and old fill attributes
//       document.querySelector(currentID).removeAttribute('data-ghost');
//       document.querySelector(currentID).removeAttribute('data-old-fill');
//     })
//   }
//
//   // Remove swap arrows
//   if(SVG('#swap_arrows') !== null) {
//     SVG('#swap_arrows').remove();
//   }
//
//   // If remove x exists, remove it
//   if(SVG('#x_icon') !== null) {
//     SVG('#x_icon').remove();
//   }
// }
//
// // This function adds the standard set of event listeners to a drag and drop item
// function addDragAndDrop(elements) {
//   let dragableItems = document.querySelectorAll(elements);
//     dragableItems.forEach(function(item) {
//       item.addEventListener('dragstart', dragStart, false);
//       item.addEventListener('dragend', dragEnd, false);
//       item.addEventListener('dragenter', handleDragEnter, false);
//       item.addEventListener('dragover', allowDrop, false);
//       item.addEventListener('dragleave', handleDragLeave, false);
//       // item.addEventListener('drop', handleDrop, false);
//   });
// }
//
// // This function adds the standard set of event listeners to a drag and drop item
// function removeDragAndDrop(elements) {
//   let dragableItems = document.querySelectorAll(elements);
//     dragableItems.forEach(function(item) {
//       item.removeEventListener('dragstart', dragStart);
//       item.removeEventListener('dragend', dragEnd);
//       item.removeEventListener('dragenter', handleDragEnter);
//       item.removeEventListener('dragover', allowDrop);
//       item.removeEventListener('dragleave', handleDragLeave);
//   });
// }
//
// // This function styles the search area components into their standard or dragging states
// function styleSearch(state) {
//   // Test the state
//   if(state == 'dragging') {
//     // Display the drop area for search and the remove area
//     gsap.timeline()
//       .to('#search-container-dropzone', {duration: .375, ease: 'power2.inOut', height: 'calc(1.1em + 13px)', paddingTop: '8px', paddingBottom: '5px', marginTop: '12px'})
//       .to('#search-container-dropzone', {duration: .375, ease: 'power2.inOut', opacity: .2}, "-=.125")
//       .call(optionClassSwap, ['remove-option'])
//       .to('.search-box', {duration: .5, ease: 'power2.inOut', width: '0px', marginRight: '0px', opacity: 0}, "-=.25")
//       .to('.bed-area', {duration: .375, ease: 'power2.inOut', top: ((document.querySelector('.search-wrapper').offsetHeight + 30) + 'px'), height: ((document.querySelector('.panel-content').offsetHeight - (document.querySelector('.search-wrapper').offsetHeight + 30)) + 'px')}, "-=1")
//   } else {
//     // Reset the search components
//     gsap.timeline()
//       .to('#search-container-dropzone', {duration: .375, ease: 'power2.inOut', opacity: .0})
//       .to('#search-container-dropzone', {duration: .375, ease: 'power2.inOut', height: '0px', paddingTop: '0px', paddingBottom: '0px', marginTop: '0px'}, "-=.125")
//       .call(optionClassSwap, ['default'])
//       .to('.search-box', {duration: .375, ease: 'power2.inOut', width: 'calc(100% - 38px)', marginRight: '8px', opacity: 1}, "-=.25")
//       .to('.bed-area', {duration: .375, ease: 'power2.inOut', top: ((document.querySelector('.search-wrapper').offsetHeight + 10) + 'px'), height: ((document.querySelector('.panel-content').offsetHeight - (document.querySelector('.search-wrapper').offsetHeight + 10)) + 'px')}, "-=.5")
//   }
//
//   // This function swaps the classes of the add-option/remove option button
//   function optionClassSwap(swapTo) {
//     if(swapTo == 'remove-option') {
//       document.querySelector('.add-option').classList.add('remove-option');
//       document.querySelector('.add-option').classList.remove('add-option');
//       document.querySelector('.remove-option').textContent = 'Drop Here to Remove';
//     } else {
//       document.querySelector('.remove-option').classList.add('add-option');
//       document.querySelector('.remove-option').classList.remove('remove-option');
//       document.querySelector('.add-option').textContent = '';
//     }
//   }
// }
//
//
// // END PLANT SELECTION
//
// // Auto-save function
// function autoSave() {
//   // Display the autosave notification and hide it after save completion
//   gsap.timeline()
//     .to('.autosave-wrapper', {duration: .75, ease: 'power2.inOut', opacity: 1})
//     .to('.autosave-wrapper', {duration: 1, ease: 'power2.out', scale: 1}, "-=.75")
//     .to('.autosave-wrapper', {duration: .625, ease: 'power2.inOut', scale: .9}, "+=2.75")
//     .to('.autosave-wrapper', {duration: .375, ease: 'linear', opacity: 0}, "-=.5");
//
//
//   let saveData = saveState();
//
//   // Save the file to local storage as a temp file
//   // First determine how many auto saves exist
//   let autoSaveCount = -1;
//   for(var i=0; i < 3; i++) {
//     // If an autosave with the current name exists add to the auto-save count
//     if(checkLocalStorage('sqFtGdn_autoSave_' + i) == true) {
//       autoSaveCount = autoSaveCount+1;
//     }
//   }
//
//   if(autoSaveCount >= 2) {
//     // There are already 3 autosaves
//     // Find the oldest auto save and save over it with new data
//     // Add each exipry to an array
//     let autoSaveTimes = [];
//     for(var i=0; i < 3; i++) {
//       autoSaveTimes.push(readLocalStorage('sqFtGdn_autoSave_' + i).expiry);
//     }
//
//     // Determine which auto save is the oldest
//     autoSaveCount = indexOfSmallest(autoSaveTimes);
//
//     // This function returns the index of the lowest value in a given array
//     function indexOfSmallest(a) {
//      var lowest = 0;
//      for (var i = 1; i < a.length; i++) {
//       if (a[i] < a[lowest]) lowest = i;
//      }
//      return lowest;
//     }
//
//     // Save the new auto save over the oldest save
//     writeLocalStorage('sqFtGdn_autoSave_' + autoSaveCount, JSON.stringify(saveData), ['never'], 'Auto Save');
//     console.log('Auto-saved progress to: "autoSave_' + autoSaveCount + '" on ' + moment().format('L [at] h:mm:ssa'));
//   } else {
//     // There are less than 3 autosaves present, save to a new auto save slot
//     autoSaveCount = autoSaveCount+1;
//     writeLocalStorage('sqFtGdn_autoSave_' + autoSaveCount, JSON.stringify(saveData), ['never'], 'Auto Save');
//     console.log('Auto-saved progress to: "autoSave_' + autoSaveCount + '" on ' + moment().format('L [at] h:mm:ssa'));
//   }
//
// }
//
// var autoSaveInterval = setInterval(function() {
//   autoSave();
// }, 120000);
//
// // This function returns an object of save data
// function saveState(fileName) {
//   // Save Info
//   let save_date = moment().unix();
//   let save_name = '_autosave-1';
//   let autosave = true;
//   let saveObject = {
//     save_date,
//     save_name,
//     autosave
//   }
//   // Location Info
//   let type = 'lat/long';
//   let value = [-35.59673, 78.02848];
//   let hardiness = 4;
//   let locationObject = {
//     type,
//     value,
//     hardiness
//   }
//   // Current Step
//   let step = document.querySelector('body').getAttribute('data-step');
//   let view = '';
//   let currentStepObject = {
//     step,
//     view
//   }
//   // Crops
//   // CODE HERE
//
//   // Beds
//   let bedsArray = [];
//   // Iterate over each bed, adding a bed object to the bed array
//   document.querySelectorAll('.content-bed-item').forEach(function(e) {
//     let bed_id = e.getAttribute('data-bed-id');
//     let bed_name = document.querySelector('#' + bed_id + '_name').value;
//     let bed_width = document.querySelector('#' + bed_id + '_width').value;
//     let bed_height = document.querySelector('#' + bed_id + '_height').value;
//     let bed_cells = {};
//     // Iterate over each row, adding its rows to the cells object
//     for(var i=0; i < bed_height; i++) {
//       let row_name = 'row_' + (i+1);
//       let rowArray = [];
//       // Iterate over each cell within the row, adding its data to the row array
//       for(var j=0; j < bed_width; j++) {
//         let cell_id = i + j;
//         let cell_contents = [];
//         let cell_object = {
//           cell_id,
//           cell_contents
//         }
//
//         // Add the cell object to the row array
//         rowArray.push(cell_object);
//       }
//       bed_cells[row_name] = rowArray;
//     }
//
//     let bedObject = {
//       bed_id,
//       bed_name,
//       bed_width,
//       bed_height,
//       bed_cells
//     }
//
//     // Add the current bed object to the bed array
//     bedsArray.push(bedObject);
//   })
//
//   let saveFile = new SaveFile(saveObject, locationObject, currentStepObject, bedsArray)
//
//   return saveFile;
// }

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
    let date = moment().unix();
    let exp = date + (10000000000 * 3600000);

    expiringEpoch =  Math.floor(exp);
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
