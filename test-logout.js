// Test script to verify logout functionality
console.log('🧪 Testing logout functionality...');

// Test 1: Check if we can access the logout button
setTimeout(() => {
  const logoutButton = document.querySelector('button[onclick*="handleSignOut"]');
  if (logoutButton) {
    console.log('✅ Logout button found in DOM');
  } else {
    console.log('❌ Logout button not found');
  }
}, 2000);

// Test 2: Check if Clerk is available
setTimeout(() => {
  if (window.Clerk) {
    console.log('✅ Clerk is available globally');
    console.log('📄 Clerk user status:', window.Clerk.user ? 'Logged in' : 'Not logged in');
  } else {
    console.log('❌ Clerk not available globally');
  }
}, 3000);

// Test 3: Check localStorage
setTimeout(() => {
  console.log('📦 Current localStorage keys:', Object.keys(localStorage));
}, 1000);
