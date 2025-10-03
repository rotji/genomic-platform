// Simple test to verify backend upload functionality
// Run this in browser console when frontend is running

async function testBackendUpload() {
  // Test if backend is running
  try {
    const healthResponse = await fetch('http://localhost:3001/health');
    const healthData = await healthResponse.json();
    console.log('✅ Backend health check:', healthData);
  } catch (error) {
    console.error('❌ Backend not running:', error);
    return;
  }

  // Test API info endpoint
  try {
    const apiResponse = await fetch('http://localhost:3001/api');
    const apiData = await apiResponse.json();
    console.log('✅ API info:', apiData);
  } catch (error) {
    console.error('❌ API info failed:', error);
  }

  // Create a test file for upload
  const testContent = `>Test_Sequence
ATCGATCGATCGATCGATCGATCGATCGATCGATCG
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT`;
  
  const testFile = new File([testContent], 'test.fasta', { type: 'text/plain' });
  
  // Test file upload
  try {
    const formData = new FormData();
    formData.append('file', testFile);
    
    const uploadResponse = await fetch('http://localhost:3001/api/files/upload', {
      method: 'POST',
      body: formData
    });
    
    const uploadData = await uploadResponse.json();
    console.log('✅ File upload test:', uploadData);
  } catch (error) {
    console.error('❌ File upload failed:', error);
  }
}

// Run the test
testBackendUpload();