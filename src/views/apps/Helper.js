function base64ToFile(base64, filename, mimeType) {
    const byteString = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: mimeType});
    return new File([blob], filename, {type: mimeType, lastModified: new Date().getTime()});
}

export default base64ToFile;