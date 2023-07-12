export function findFirstNPrimes(n: number): number[] {
  const primes = [];
  let currentNumber = 2;
  while (primes.length < n) {
    if (isPrime(currentNumber)) primes.push(currentNumber);
    currentNumber++;
  }
  return primes;
}

function isPrime(n: number): boolean {
  if (n % 1 !== 0) return false; // only integers can be prime
  for (let possibleFactor = n - 1; possibleFactor > 1; possibleFactor--) {
    if (n % possibleFactor === 0) return false;
  }
  return true;
}
