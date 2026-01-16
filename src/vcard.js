// Generate vCard (.vcf) file content from contact data
export function generateVCard(data) {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.companyName}`,
    `ORG:${data.companyName}`,
    `TITLE:${data.jobTitle}`,
    `TEL;TYPE=WORK,VOICE:${data.phone}`,
    `EMAIL;TYPE=WORK:${data.email}`,
    `URL:${data.website.startsWith('http') ? data.website : 'https://' + data.website}`,
    `ADR;TYPE=WORK:;;${data.address.street};${data.address.city};${data.address.state};${data.address.zip};${data.address.country}`,
    `NOTE:${data.bio.replace(/\n/g, '\\n')}`,
  ];

  // Add social media URLs
  if (data.social.facebook) {
    vcard.push(`X-SOCIALPROFILE;TYPE=facebook:${data.social.facebook}`);
  }
  if (data.social.x) {
    vcard.push(`X-SOCIALPROFILE;TYPE=twitter:${data.social.x}`);
  }
  if (data.social.linkedin) {
    vcard.push(`X-SOCIALPROFILE;TYPE=linkedin:${data.social.linkedin}`);
  }
  if (data.social.instagram) {
    vcard.push(`X-SOCIALPROFILE;TYPE=instagram:${data.social.instagram}`);
  }

  vcard.push('END:VCARD');
  
  return vcard.join('\r\n');
}

// Download vCard file
export function downloadVCard(data) {
  const vcardContent = generateVCard(data);
  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.companyName.replace(/\s+/g, '_')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Share page using Web Share API or fallback to clipboard
export async function sharePage(data) {
  const shareData = {
    title: data.companyName,
    text: `${data.companyName} - ${data.jobTitle}`,
    url: window.location.href
  };

  // Check if Web Share API is supported
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'share' };
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  }

  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(window.location.href);
    return { success: true, method: 'clipboard' };
  } catch (err) {
    console.error('Clipboard failed:', err);
    return { success: false, error: err };
  }
}
