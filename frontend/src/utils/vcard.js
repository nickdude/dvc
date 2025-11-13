// utilities to create and save vCard (.vcf) files
export function escapeV(value = '') {
    return String(value || '').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

export function makeVCard({ name, phone, email, address, company, jobTitle, website, note, photoBase64, photoMime }) {
    const lines = ['BEGIN:VCARD', 'VERSION:3.0'];
    if (name) lines.push(`FN:${escapeV(name)}`);
    if (jobTitle) lines.push(`TITLE:${escapeV(jobTitle)}`);
    if (company) lines.push(`ORG:${escapeV(company)}`);
    if (phone) lines.push(`TEL;TYPE=CELL:${escapeV(phone)}`);
    if (email) lines.push(`EMAIL;TYPE=WORK:${escapeV(email)}`);
    if (address) lines.push(`ADR;TYPE=WORK:;;${escapeV(address)}`);
    if (website) lines.push(`URL:${escapeV(website)}`);
    if (note) lines.push(`NOTE:${escapeV(note)}`);

    if (photoBase64 && photoMime) {
        // PHOTO;ENCODING=b;TYPE=JPEG:<base64>
        const type = (photoMime.split('/')[1] || '').toUpperCase();
        lines.push(`PHOTO;ENCODING=b;TYPE=${type}:${photoBase64}`);
    }

    lines.push('END:VCARD');
    return lines.join('\r\n');
}

// fetch an image URL and convert to base64 string (without data: prefix)
export async function fetchImageAsBase64(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const blob = await res.blob();
        const mime = blob.type || 'image/jpeg';
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result;
                const m = dataUrl.match(/^data:(.*);base64,(.*)$/);
                if (m) resolve({ base64: m[2], mime: m[1] });
                else resolve(null);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (err) {
        console.debug('fetchImageAsBase64 error', err);
        return null;
    }
}

export async function saveVCard(vcardText, filename = 'contact.vcf') {
    const blob = new Blob([vcardText], { type: 'text/vcard' });

    // Try Web Share API with files first
    try {
        const file = new File([blob], filename, { type: blob.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'Save contact', text: 'Save this contact' });
            return;
        }
    } catch (err) {
        console.debug('Web Share API failed, falling back to download', err);
    }

    // Fallback download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
}
