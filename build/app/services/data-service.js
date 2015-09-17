let log = require('bows')('DataService');

export default class DataService {
  constructor(config){
    if(!config)throw new Error('no config!');
    this._config = config;
    this.init(this._config);
  }
  init(config){
    log('initialized');
  }
  getUserInfo(){
    return fetch('http://api.randomuser.me/').then(function(res){
      return res.json();
    }).catch(function(err){
      log(JSON.stringify(err, null, 4));
    });
  }
  getOrgChartData(){
    return [
            {
              firstName     : 'Evan',
              lastName      : 'Vasquez',
              primaryText   : 'Evan Vasquez',
              secondaryText : 'Software Developer, RactiveJS Corp.',
              tertiaryText  : 'Office: 23/1999',
              optionalText  : '',
              phonePersonal : '555-123-456',
              phoneWork     : '444-23-567',
              emailPersonal : 'evan.vasquez@yahoo.com',
              emailWork     : 'evan.vasquez@ractivejs.org',
              lyncAccount   : 'evan@lync.com',
              skypeAccount  : 'evan@skype.com',
              imageSmall    : 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
              imageMedium   : 'https://randomuser.me/api/portraits/med/men/1.jpg',
              imageBig      : 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            {
              firstName     : 'Jack',
              lastName      : 'Woods',
              primaryText   : 'Jack Woods',
              secondaryText : 'Software Developer, RactiveJS Corp.',
              tertiaryText  : 'Office: 55/2999',
              optionalText  : '',
              phonePersonal : '555-456-567',
              phoneWork     : '333-23-567',
              emailPersonal : 'jack.woods@hotmail.com',
              emailWork     : 'jack.woods@ractivejs.org',
              lyncAccount   : 'jack@lync.com',
              skypeAccount  : 'jack@skype.com',
              imageSmall    : 'https://randomuser.me/api/portraits/thumb/men/15.jpg',
              imageMedium   : 'https://randomuser.me/api/portraits/med/men/15.jpg',
              imageBig      : 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            {
              firstName     : 'Leslie',
              lastName      : 'Reyes',
              primaryText   : 'Leslie Reyes',
              secondaryText : 'CTO, RactiveJS Corp.',
              tertiaryText  : 'Office: 77/5999',
              optionalText  : '',
              phonePersonal : '555-555-007',
              phoneWork     : '123-23-567',
              emailPersonal : 'leslie.reyes@yahoo.com',
              emailWork     : 'leslie.reyes@ractivejs.org',
              lyncAccount   : 'leslie@lync.com',
              skypeAccount  : 'leslie@skype.com',
              imageSmall    : 'https://randomuser.me/api/portraits/thumb/women/66.jpg',
              imageMedium   : 'https://randomuser.me/api/portraits/med/women/66.jpg',
              imageBig      : 'https://randomuser.me/api/portraits/women/66.jpg'
            },
            {
              firstName     : 'Anna',
              lastName      : 'Dennis',
              primaryText   : 'Anna Dennis',
              secondaryText : 'Heard of Marketing, RactiveJS Corp.',
              tertiaryText  : 'Office: 99/1999',
              optionalText  : '',
              phonePersonal : '555-123-456',
              phoneWork     : '444-23-567',
              emailPersonal : 'anna.dennisa@yahoo.com',
              emailWork     : 'anna.dennis@ractivejs.org',
              lyncAccount   : 'anna@lync.com',
              skypeAccount  : 'anna@skype.com',
              imageSmall    : 'https://randomuser.me/api/portraits/thumb/women/83.jpg',
              imageMedium   : 'https://randomuser.me/api/portraits/med/women/83.jpg',
              imageBig      : 'https://randomuser.me/api/portraits/women/83.jpg'
            },
            {
              firstName     : 'Charline',
              lastName      : 'Moulin',
              primaryText   : 'Charline Moulin',
              secondaryText : 'Heard of Sales, RactiveJS Corp.',
              tertiaryText  : 'Office: 14/1999',
              optionalText  : '',
              phonePersonal : '555-908-888',
              phoneWork     : '444-77-567',
              emailPersonal : 'charline.moulin@yahoo.com',
              emailWork     : 'charline.moulin@ractivejs.org',
              lyncAccount   : 'charline@lync.com',
              skypeAccount  : 'charline@skype.com',
              imageSmall    : 'https://randomuser.me/api/portraits/thumb/women/13.jpg',
              imageMedium   : 'https://randomuser.me/api/portraits/med/women/13.jpg',
              imageBig      : 'https://randomuser.me/api/portraits/women/13.jpg'
            },
            {
              firstName     : 'Donna',
              lastName      : 'Brewer',
              primaryText   : 'Donna Brewer',
              secondaryText : 'Software Engineer, RactiveJS Corp.',
              tertiaryText  : 'Office: 49/1999',
              optionalText  : '',
              phonePersonal : '555-098-456',
              phoneWork     : '44-44-789',
              emailPersonal : 'donna.brewer@yahoo.com',
              emailWork     : 'donna.brewer@ractivejs.org',
              lyncAccount   : 'donna@lync.com',
              skypeAccount  : 'donna@skype.com',
              imageSmall    : 'https://randomuser.me/api/portraits/thumb/women/23.jpg',
              imageMedium   : 'https://randomuser.me/api/portraits/med/women/23.jpg',
              imageBig      : 'https://randomuser.me/api/portraits/women/23.jpg'
            }
          ];
        }
}