// Only works for all Object type

module.exports = class NestedPropertyProc {
  static getValue(obj, path) {
    let ref = path.split('.');
    let end = obj;
    for (let item of ref) {
      if (!end[item]) {
        end = undefined;
        break;
      } else
        end = end[item];
    }
    return end;
  }

  static setValue(obj, path, val) {
    let ref = path.split('.');
    let end = obj;

    for (let i = 0; i < ref.length - 1; i++) {
      if (!end[ref[i]]) {
        end[ref[i]] = {};
      }
      end = end[ref[i]];
    }
    end[ref[ref.length - 1]] = val;
  }
};