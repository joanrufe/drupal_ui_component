export const t = (str) => (typeof Drupal === "object")? 
  Drupal.t(str) : str