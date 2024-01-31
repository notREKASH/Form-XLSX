export default function base64ToBlob(base64, contentType) {
  var byteCharacters = atob(base64);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += 1024) {
    var slice = byteCharacters.slice(offset, offset + 1024);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
