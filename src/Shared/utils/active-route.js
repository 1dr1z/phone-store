export const isActiveRoute = (navData, styles) => {
  return navData.isActive ? styles.active : '';
};
