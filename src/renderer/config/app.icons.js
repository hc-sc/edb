const SUF = '_black_24px.svg';
const IMG_DIR = 'img/ic_';

export default function($mdIconProvider) {
  $mdIconProvider
  .icon('home', `${IMG_DIR}home${SUF}`)
  .icon('search', `${IMG_DIR}search${SUF}`)
  .icon('help', `${IMG_DIR}help${SUF}`)
  .icon('up', `${IMG_DIR}expand_less${SUF}`)
  .icon('down', `${IMG_DIR}expand_more${SUF}`)
  .icon('left', `${IMG_DIR}chevron_left${SUF}`)
  .icon('right', `${IMG_DIR}chevron_right${SUF}`)
  .icon('add', `${IMG_DIR}add${SUF}`)
  .icon('email', `${IMG_DIR}email${SUF}`)
  .icon('delete', `${IMG_DIR}delete${SUF}`)
  .icon('list', `${IMG_DIR}list${SUF}`)
  .icon('filter', `${IMG_DIR}filter_list${SUF}`)
  .icon('back', `${IMG_DIR}arrow_back${SUF}`)
  .icon('forward', `${IMG_DIR}arrow_forward${SUF}`)
  .icon('globals', `${IMG_DIR}code${SUF}`)
  .icon('compare', `${IMG_DIR}compare_arrows${SUF}`)
  .icon('save', `${IMG_DIR}save${SUF}`)
  .icon('check', `${IMG_DIR}check${SUF}`)
  .icon('archive', `${IMG_DIR}archive${SUF}`)
  .icon('settings', `${IMG_DIR}settings${SUF}`)
  .icon('edit', `${IMG_DIR}edit${SUF}`)
  .icon('close', `${IMG_DIR}close${SUF}`)
  .icon('copy', `${IMG_DIR}content_copy${SUF}`)
  .icon('menu', `${IMG_DIR}menu${SUF}`)
  .icon('view', `${IMG_DIR}visibility${SUF}`)
  .icon('description', `${IMG_DIR}description${SUF}`);
}
