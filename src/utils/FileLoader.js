export const loadFile = (fileName, fileType) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.open('GET', fileName);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              const blob = xhr.response;
              resolve(new File([blob], fileName, {type: fileType, lastModified: Date.now()}));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}