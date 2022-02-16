export const sortData = (data) => {
  const sorteddata = [...data];
  sorteddata.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1; //sorts a before b
    } else {
      return 1; //sorts b before a
    }
  });
  return sorteddata;
};
