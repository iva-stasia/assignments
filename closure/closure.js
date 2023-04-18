function addNumToCurrentSum() {
  let result = 0;
  return function (num) {
    return (result += num);
  };
}

const sum = addNumToCurrentSum();
