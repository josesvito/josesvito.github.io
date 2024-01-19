const createHMAC = (key: string, data: string) => {
	const encoder = new TextEncoder();
	const encodedKey = encoder.encode(key);
	const encodedData = encoder.encode(data);

	return window.crypto.subtle.importKey(
		'raw',
		encodedKey,
		{ name: 'HMAC', hash: 'SHA-256' },
		true,
		['sign']
	).then(key => {
		return window.crypto.subtle.sign('HMAC', key, encodedData);
	}).then(signature => {
		return Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
	});
};

export const Crypto = {
	createHMAC
}

export default Crypto;
