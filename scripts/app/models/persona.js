import Collection  from 'ampersand-collection';
import lodashMixin from 'ampersand-collection-lodash-mixin';
import Model       from 'ampersand-model';

let PersonaCollection = Collection.extend(lodashMixin, {
    model: PersonaModel
});

let PersonaModel = Model.extend({

    props: {
      id            : 'string',
      firstName     : 'string',
      lastName      : 'string',
      primaryText   : 'string',
      secondaryText : 'string',
      tertiaryText  : 'string',
      optionalText  : 'string',
      phonePersonal : 'string',
      phoneWork     : 'string',
      emailPersonal : 'string',
      emailWork     : 'string',
      lyncAccount   : 'string',
      skypeAccount  : 'string',
      imageSmall    : 'string',
      imageMedium   : 'string',
      imageBig      : 'string',
      orgChartList  : 'any'
    }

});

module.exports = {
    PersonaCollection : PersonaCollection,
    PersonaModel      : PersonaModel
};