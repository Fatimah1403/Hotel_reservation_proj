export const daysCalculator = (date) => {
    const newStartDate = new Date(date[0].startDate);
    const newEndDate = new Date(date[0].endDate);
  
    const timeDifference = newStartDate.getTime() - newEndDate.getTime();
    const daysDifference = Math.abs(timeDifference / (1000 * 60 * 60 * 24));
    return (daysDifference + 1)
  };
  