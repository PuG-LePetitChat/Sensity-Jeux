// Simple password verification system
const ADMIN_PASSWORD = '12345';

export const verifyAdminPassword = async (password: string): Promise<boolean> => {
  // Simple direct comparison for the demo password
  return password === ADMIN_PASSWORD;
};