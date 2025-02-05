export const mapToRoleID = (role: string) => {
  switch (role) {
    case 'member':
      return 1;
    case 'manager':
      return 2;
    case 'wwner':
      return 3;
    default:
      throw new Error(`Invalid role: ${role}`);
  }
};
