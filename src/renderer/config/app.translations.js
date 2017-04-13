import {picklists_en, propNames_en, statuses_en} from '../../configs/translations';

export default function($translateProvider) {
  $translateProvider.useSanitizeValueStrategy('escapeParameters');
  $translateProvider.translations('en', Object.assign({},
    picklists_en,
    propNames_en,
    statuses_en
  ));

  $translateProvider.translations('fr', {});

  $translateProvider.preferredLanguage('en');
}