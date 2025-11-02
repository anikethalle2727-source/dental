export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action, contact, patientObj, contactOrUID } = req.body;
  
  const payload = { action };
  if (contact) payload.contact = contact;
  if (patientObj) payload.patientObj = patientObj;
  if (contactOrUID) payload.contactOrUID = contactOrUID;

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxQz-BL5mxHcSMSS-uyC_MblnMpS_ye5_VYUqm9QHmdYWV16izKNCFmrVceR-3rtlMBpw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
