export function genPayload() {

  const inputs = document.getElementsByTagName('input');
  const selects = document.getElementsByTagName('select');
  const description = document.getElementById('description').value;

  let obj = {};
  if (description !== '') {
    obj['description'] = description;
  }

  const parseElmList = (obj, elmList) => {
    for (let elm in elmList) {
      if (elmList[elm] instanceof HTMLElement) {
        let thisItem = elmList[elm];
        let stat = thisItem.getAttribute('data-stat');
        let dataId = thisItem.getAttribute('id');

        if (stat === null && thisItem.value !== '') {
          obj[dataId] = thisItem.value;
        }
        if (stat !== null) {
          let statPos = thisItem.id.split('.');

          if (!obj[statPos[0]]) {
            obj[statPos[0]] = {};
          }
          if (!obj[statPos[0]][statPos[1]]) {
            obj[statPos[0]][statPos[1]] = {};
          }
          if (thisItem.type === 'checkbox' && thisItem.checked) {
            obj[statPos[0]][statPos[1]][statPos[2]] = thisItem.checked;
          } else {
            if (thisItem.type !== 'checkbox' && thisItem.value !== '') {
              obj[statPos[0]][statPos[1]][statPos[2]] = thisItem.value;
            }
          }
        }
      }
    }
  };

  parseElmList(obj, inputs);
  parseElmList(obj, selects);

  return obj;
}

export default genPayload;