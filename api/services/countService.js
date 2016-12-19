let count = 0;

export function addCount() {
  count += 1;
  return Promise.resolve({ amount: count });
}

export function getCount() {
  return Promise.resolve({ amount: count });
}
