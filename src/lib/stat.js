export default function getStat(item, statName){

    if (item.stat?.count) {
      return (item.stat.count.filter((it) => {
        return it.attrib === statName;
      })).map((i) => {
        return i.val;
      }).pop();
    }
}
