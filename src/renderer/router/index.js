import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/home/home.vue';
import Dossiers from '@/pages/dossiers/dossiers.vue';
import Globals from '@/pages/globals/globals.vue';
import Settings from '@/pages/settings/settings.vue';
import Help from '@/pages/help/help.vue';
import Page404 from '@/pages/404/404.vue';
import Submission from '@/pages/submission/submission.vue';
import SendersReceivers from '@/pages/submission/senders-receivers/senders-receivers.vue';
import Dossier from '@/pages/submission/dossier/dossier.vue';
import Product from '@/pages/submission/product/product.vue';
import Files from '@/pages/submission/files/files.vue';
import Documents from '@/pages/submission/documents/documents.vue';
import TOC from '@/pages/submission/toc/toc.vue';
import LegalEntities from '@/pages/globals/legal-entities/legal-entities.vue';
import Senders from '@/pages/globals/senders/senders.vue';
import Receivers from '@/pages/globals/receivers/receivers.vue';
import Substances from '@/pages/globals/substances/substances.vue';
import Products from '@/pages/globals/products/products.vue';
import Picklists from '@/pages/globals/picklists/picklists.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Home},
  {path: '/dossiers', component: Dossiers},
  {
    path: '/submission',
    component: Submission,
    children: [
      // {path: '/', component: SubmissionNode},
      {path: 'senders-receivers', component: SendersReceivers},
      {path: 'dossier', component: Dossier},
      {path: 'product', component: Product},
      {path: 'files', component: Files},
      {path: 'documents', component: Documents},
      {path: 'toc', component: TOC}
    ]
  },
  {
    path: '/globals',
    component: Globals,
    children: [
      {path: '/', redirect: 'legal-entities'},
      {path: 'legal-entities', component: LegalEntities},
      {path: 'senders', component: Senders},
      {path: 'receivers', component: Receivers},
      {path: 'substances', component: Substances},
      {path: 'products', component: Products},
      {path: 'picklists', component: Picklists}
    ]
  },
  {path: '/settings', component: Settings},
  {path: '/help', component: Help},
  {path: '/404', component: Page404},
  {path: '*', redirect: '/'}
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export {router};
