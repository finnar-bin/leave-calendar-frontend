export const getLegendClass = type => {
  let classes = ["legend"];

  switch (type) {
    case "Approved":
      classes.push("approved");
      break;

    case "Pending":
      classes.push("pending");
      break;

    case "Holiday":
      classes.push("holiday");
      break;

    default:
      break;
  }
  return classes;
};
