const Utils = {
  capitalizeFirstLetter(str: string | undefined) {
    if (str !== undefined) {
      return str.replace(/^\w/, (c) => c.toUpperCase());
    } else {
      return "";
    }
  },

  valideField(str: any) {
    if (str.toString() === "" || str === null || str === undefined) {
      return false
    } else {
      return true
    }
  }
}

export default Utils;
