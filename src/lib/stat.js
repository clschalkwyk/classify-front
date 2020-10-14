export default function getStat(item, statName) {
  if (item.stat && item.stat['count'].length > 0) {
    return (item.stat.count.filter((it) => {
      return Object.keys(it)[0] === statName;
    })).map((i) => {
      return i[statName];
    }).pop();
  }
}
