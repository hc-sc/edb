
const IMG_DIR = 'img/ic_';
const SUF = '_black_24px.svg';

export default function($mdIconProvider) {
  $mdIconProvider
  .icon('home', `${IMG_DIR}home${SUF}`)
  .icon('search', `${IMG_DIR}search${SUF}`)
  .icon('up', `${IMG_DIR}expand_less${SUF}`)
  .icon('down', `${IMG_DIR}expand_more${SUF}`)
  .icon('left', `${IMG_DIR}chevron_left${SUF}`)
  .icon('right', `${IMG_DIR}chevron_right${SUF}`)
  .icon('add', `${IMG_DIR}add${SUF}`)
  .icon('package', `${IMG_DIR}archive${SUF}`)
  .icon('product', `${IMG_DIR}assignment${SUF}`)
  .icon('file', `${IMG_DIR}attach_file${SUF}`)
  .icon('legalEntity', `${IMG_DIR}business${SUF}`)
  .icon('check', `${IMG_DIR}check${SUF}`)
  .icon('edit', `${IMG_DIR}mode_edit${SUF}`)
  .icon('close', `${IMG_DIR}close${SUF}`)
  .icon('delete', `${IMG_DIR}delete${SUF}`)
  .icon('submission', `${IMG_DIR}description${SUF}`)
  .icon('error', `${IMG_DIR}error${SUF}`)
  .icon('dossier', `${IMG_DIR}folder${SUF}`)
  .icon('receiver', `${IMG_DIR}group${SUF}`)
  .icon('help', `${IMG_DIR}help${SUF}`)
  .icon('person', `${IMG_DIR}person${SUF}`)
  .icon('validate', `${IMG_DIR}report${SUF}`)
  .icon('save', `${IMG_DIR}save${SUF}`)
  .icon('settings', `${IMG_DIR}settings${SUF}`)
  .icon('toc', `${IMG_DIR}toc${SUF}`)
  .icon('diff', `${IMG_DIR}track_changes${SUF}`)
  .icon('view', `${IMG_DIR}visibility${SUF}`)
  .icon('project', `${IMG_DIR}work${SUF}`)
  .icon('load', `${IMG_DIR}unarchive${SUF}`)
  .icon('local', `${IMG_DIR}bookmark${SUF}`)
  .icon('global', `${IMG_DIR}language${SUF}`)
  .icon('template', `${IMG_DIR}code${SUF}`)
  .icon('substance', `${IMG_DIR}adjust${SUF}`);
}