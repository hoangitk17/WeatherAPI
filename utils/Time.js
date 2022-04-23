module.exports = {
  mutateObjectProperty(prop, value, obj) {
    obj.constructor === Object &&
      Object.keys(obj).forEach((key) => {
        if (key === prop) obj[key] = typeof value === "function" ? value(obj[key]) : value;
        this.mutateObjectProperty(prop, value, obj[key]);
      });
  },

  //https://stackoverflow.com/questions/11893083/convert-normal-date-to-unix-timestamp
  convertDateToUnixTime(date) {
    return Math.floor(new Date(date).getTime() / 1000);
  },
  //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  convertUnixTimeToDate(unixTime) {
    var myDate = new Date(unixTime * 1000);
    return myDate.toGMTString() + " " + myDate.toLocaleString();
  }
}
