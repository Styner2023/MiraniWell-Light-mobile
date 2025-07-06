import https from 'https';

const projectId = '68683fa6000c18b4ce3c';
const devKey = '***REMOVED***';

// First, let's try to list existing platforms to understand the structure
const listPlatforms = () => {
  const postData = JSON.stringify({});
  
  const options = {
    hostname: 'nyc.cloud.appwrite.io',
    port: 443,
    path: `/v1/projects/${projectId}/platforms`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': devKey
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Current platforms:', JSON.parse(data));
      // Now try to add the new platform
      addPlatform();
    });
  });

  req.on('error', (error) => {
    console.error('Error listing platforms:', error);
  });

  req.write(postData);
  req.end();
};

// Add the Vercel platform
const addPlatform = () => {
  const postData = JSON.stringify({
    type: 'web',
    name: 'Vercel Production',
    hostname: 'miriani-well-mobile.vercel.app'
  });
  
  const options = {
    hostname: 'nyc.cloud.appwrite.io',
    port: 443,
    path: `/v1/projects/${projectId}/platforms`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': devKey,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('Add platform response:', JSON.parse(data));
    });
  });

  req.on('error', (error) => {
    console.error('Error adding platform:', error);
  });

  req.write(postData);
  req.end();
};

// Start by listing platforms
listPlatforms();
