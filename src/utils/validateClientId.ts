export const validateClientId = (clientId: string): boolean => {
  const validClientIds: string[] = [];
  let i = 1;

  while (true) {
    const envValue = process.env[`CLIENT_ID_${i}`];

    if (!envValue) {
      break; 
    }

    validClientIds.push(envValue);
    i++;
  }

  return validClientIds.includes(clientId);
};