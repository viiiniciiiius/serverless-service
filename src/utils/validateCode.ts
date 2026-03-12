import crypto from 'crypto';
import { validateClientId } from './validateClientId';

const key1 = process.env.KEY1;
const key2 = process.env.KEY2;
const key3 = process.env.KEY3;

export const validateCode = (clientTime, clientCode, ClientId) => {

  if (!validateClientId(ClientId)) {
    return false;
  }

  const serverTime = Math.floor(Date.now() / 1000);
  const difference = Math.abs(serverTime - parseInt(clientTime));
  
  if (difference > 60) {
    return false;
  }

  const masterKey = key1 + key2 + key3;

  const hmac = crypto.createHmac('sha256', masterKey);
  hmac.update(clientTime.toString());
  const hashHex = hmac.digest('hex');

  const bigNum = BigInt('0x' + hashHex);
  const serverCode = (bigNum % 1000000n).toString().padStart(6, '0');

  return serverCode === clientCode;
}