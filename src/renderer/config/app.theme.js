export default function($mdThemingProvider) {
  $mdThemingProvider
  .definePalette('pmra-primary', {
    '50': '48905B',
    '100': '48905B',
    '200': '48905B',
    '300': '29743D',
    '400': '29743D',
    '500': '29743D',
    '600': '29743D',
    '700': '145A26',
    '800': '145A26',
    '900': '145A26',
    'A100': '145A26',
    'A200': '145A26',
    'A400': '145A26',
    'A700': '145A26',
    'contrastDefaultColor': 'light',
    'contrastLightColors': ['50', '100', '200', '300', '400', 'A100']
  })
  .definePalette('pmra-secondary', {
    '50': '3D6D78',
    '100': '3D6D78',
    '200': '3D6D78',
    '300': '245560',
    '400': '245560',
    '500': '245560',
    '600': '245560',
    '700': '12404B',
    '800': '12404B',
    '900': '12404B',
    'A100': '12404B',
    'A200': '12404B',
    'A400': '12404B',
    'A700': '12404B',
    'contrastDefaultColor': 'light',
    'contrastLightColors': ['50', '100', '200', '300', '400', 'A100']
  })
  .theme('default')
  .primaryPalette('pmra-primary')
  .accentPalette('pmra-secondary');
}