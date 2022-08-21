/**
 * key -> process.env.key
 */

export function getEnv(key: string): string {
  if (process.env[key] !== undefined) {
    return process.env[key] as string;
  } else {
    throw Error(`Error: dotenv not found key: ${key} !`);
  }
}
