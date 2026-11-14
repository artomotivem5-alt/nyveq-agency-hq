/**
 * NYVEQ SOVEREIGN SECURITY // CLIENT-SIDE CRYPTOGRAPHIC GATE
 * Implements SHA-256 verification, brute-force rate-limiting, and session management.
 */

// Authorized Passcode Hashes (SHA-256)
// Default Passcodes:
// 1. "nyveq2026"
// 2. "NYVEQ2026"
// 3. "nyveq@sovereign"
const AUTHORIZED_HASHES = new Set<string>([
  '00d348e14c809558589fe3eab3d1c1534463dd827a672dbc87b2981307ed79a9', // nyveq2026
  '62080b90809c2c26cf8f02519f819b36e7f40acff7c8d5e81ed9c154910475a5', // NYVEQ2026
  'f6bc7d65ead1dd3495644f765c834e9e0b25f9f0c3f73548dd5d386910ec30e4'  // nyveq@sovereign
]);

const SESSION_STORAGE_KEY = 'nyveq_hq_auth_session';
const FAILED_ATTEMPTS_KEY = 'nyveq_failed_auth_attempts';
const LOCKOUT_UNTIL_KEY = 'nyveq_lockout_until';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15000; // 15 seconds cooldown

/**
 * Compute SHA-256 hash using browser's native Web Crypto API
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim());
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Check if the user is currently locked out due to brute-force attempts
 */
export function getLockoutRemainingSeconds(): number {
  const lockoutUntil = sessionStorage.getItem(LOCKOUT_UNTIL_KEY);
  if (!lockoutUntil) return 0;

  const remaining = Math.ceil((parseInt(lockoutUntil, 10) - Date.now()) / 1000);
  if (remaining <= 0) {
    sessionStorage.removeItem(LOCKOUT_UNTIL_KEY);
    sessionStorage.removeItem(FAILED_ATTEMPTS_KEY);
    return 0;
  }
  return remaining;
}

/**
 * Record a failed authentication attempt
 */
export function recordFailedAttempt(): { remainingAttempts: number; isLocked: boolean; lockoutSeconds: number } {
  const currentAttempts = parseInt(sessionStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10) + 1;
  sessionStorage.setItem(FAILED_ATTEMPTS_KEY, currentAttempts.toString());

  if (currentAttempts >= MAX_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
    sessionStorage.setItem(LOCKOUT_UNTIL_KEY, lockoutUntil.toString());
    return {
      remainingAttempts: 0,
      isLocked: true,
      lockoutSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000)
    };
  }

  return {
    remainingAttempts: MAX_ATTEMPTS - currentAttempts,
    isLocked: false,
    lockoutSeconds: 0
  };
}

/**
 * Clear failed attempts upon successful login
 */
export function clearFailedAttempts(): void {
  sessionStorage.removeItem(FAILED_ATTEMPTS_KEY);
  sessionStorage.removeItem(LOCKOUT_UNTIL_KEY);
}

/**
 * Authenticate against authorized SHA-256 hashes
 */
export async function verifyPasscode(passcode: string): Promise<{ success: boolean; error?: string }> {
  const remainingCooldown = getLockoutRemainingSeconds();
  if (remainingCooldown > 0) {
    return {
      success: false,
      error: `Security lockout active. Please wait ${remainingCooldown}s before retrying.`
    };
  }

  if (!passcode || passcode.trim().length === 0) {
    return { success: false, error: 'Please enter the sovereign passcode.' };
  }

  const hash = await sha256(passcode);

  // Check built-in authorized hashes
  let isAuthorized = AUTHORIZED_HASHES.has(hash);

  // Check optional custom hash saved by founder in localStorage
  const customHash = localStorage.getItem('nyveq_custom_passcode_hash');
  if (customHash && hash === customHash) {
    isAuthorized = true;
  }

  if (isAuthorized) {
    clearFailedAttempts();
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      authenticated: true,
      timestamp: Date.now()
    }));
    return { success: true };
  }

  const attemptStatus = recordFailedAttempt();
  if (attemptStatus.isLocked) {
    return {
      success: false,
      error: `Too many failed attempts. Console locked for ${attemptStatus.lockoutSeconds}s.`
    };
  }

  return {
    success: false,
    error: `Incorrect passcode. ${attemptStatus.remainingAttempts} attempts remaining.`
  };
}

/**
 * Check if the active session is valid
 */
export function isAuthenticated(): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session && session.authenticated === true);
  } catch {
    return false;
  }
}

/**
 * Terminate active session (Lock HQ)
 */
export function logout(): void {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}
