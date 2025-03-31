// Reference: https://stackoverflow.com/questions/33076177/getting-name-initials-using-js
export const getInitials = (name) => {
  return name
    .match(/(^\S\S?|\b\S)?/g)
    .join("")
    .match(/(^\S|\S$)?/g)
    .join("")
    .toUpperCase();
};
