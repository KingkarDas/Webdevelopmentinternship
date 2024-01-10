function transformDictionary(inputDict) {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const outputDict = {};
  
    // Convert input string to dictionary
    const inputDictObj = {};
    inputDict.split(',').forEach(entry => {
      const [date, value] = entry.split(':');
      inputDictObj[date] = parseInt(value);
    });
  
    // Iterate through each day of the week
    daysOfWeek.forEach((day, index) => {
      const currentDate = new Date(`1970-01-05T00:00:00Z`); // A Monday
      currentDate.setDate(currentDate.getDate() + index);
  
      const currentDateString = currentDate.toISOString().slice(0, 10);
  
      if (inputDictObj[currentDateString] !== undefined) {
        // If the day exists in the input dictionary, use its value
        outputDict[day] = inputDictObj[currentDateString];
      } else {
        // If the day is missing, calculate the mean of the adjacent days
        const prevDay = new Date(currentDate);
        prevDay.setDate(prevDay.getDate() - 1);
        const prevDayString = prevDay.toISOString().slice(0, 10);
  
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayString = nextDay.toISOString().slice(0, 10);
  
        const meanValue = Math.round((inputDictObj[prevDayString] + inputDictObj[nextDayString]) / 2);
        outputDict[day] = meanValue;
      }
    });
  
    return outputDict;
  }
  
  // Example usage
  const inputDictionary = '2020-01-01:4,2020-01-02:4,2020-01-03:6,2020-01-04:8,2020-01-05:2,2020-01-06:-6,2020-01-07:2,2020-01-08:-2';
  const outputDictionary = transformDictionary(inputDictionary);
  console.log(outputDictionary);
  