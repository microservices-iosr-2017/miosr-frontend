
export function createException(name, message) {
  const msg = message || '';
  const err = new Error(msg);
  err.name = name;
  return err;
}

