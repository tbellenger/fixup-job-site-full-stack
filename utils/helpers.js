//module helpers to format the date
module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_date1: (date) => {
    return new Date(date).toLocaleTimeString();
  },
};
