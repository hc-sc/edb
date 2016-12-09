export default class QueryCtrl {
  constructor(PicklistService, AppDataService) {
    this.picklistService = PicklistService.getService();
    this.appDataService = AppDataService.getService();
  }

  mapIdToEntities(ids, url, TYPE_NAME) {
    console.log(ids, url, TYPE_NAME);
    let mappings = [];
    if (!Array.isArray(ids)) ids = [ids];
    if (url === 'picklists') {
      return this.picklistService.edb_get({TYPE_NAME})
      .then(results => {
        const data = JSON.parse(results.data);
        console.log(data);
        ids.forEach(id => {
          let index = -1;
          for (let i = 0; i < data.length; ++i) {
            if (data[i]._id === id) {
              console.log('here');
              index = i;
              break;
            }
          }
          if (index >= 0) {
            mappings.push({id, name: data[index].valuedecode});
          }
        });

        return mappings;
      });
    }
    else {
      return this.appDataService.edb_get({_url: url})
      .then(results => {
        console.log(JSON.parse(results.data));

        return mappings;
      });
    }
  }
}