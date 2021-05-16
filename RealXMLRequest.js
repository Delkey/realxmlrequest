/**
 * 2021-05-16
 * create by wonillee
 * @returns XMLHttpRequest
 */
const RealXMLRequest = function () {
  const xhr = new XMLHttpRequest();

  const _get = (url, data) => {
    return _conn({ method: "GET", url: new URL(url), data });
  };

  const _post = (url, data, headers) => {
    return _conn({ method: "POST", url, data, headers });
  };

  const _conn = ({ method, url, data, headers }) => {
    return new Promise((resolve, reject) => {
      xhr.open(method, url);

      if (headers) {
        headers.forEach((header) => {
          const { key, value } = header;
          xhr.setRequestHeader(key, value);
        });
      }

      /**
       * "" (default) – get as string,
       * "text" – get as string,
       * "arraybuffer" – get as ArrayBuffer (for binary data, see chapter ArrayBuffer, binary arrays),
       * "blob" – get as Blob (for binary data, see chapter Blob),
       * "document" – get as XML document (can use XPath and other XML methods) or HTML document (based on the MIME type of the received data),
       * "json" – get as JSON (parsed automatically).
       */
      xhr.responseType = "json";

      if (method === "GET") {
        if (data) {
          Object.keys(data).forEach((key) => {
            url.searchParams.set(key, data[key]);
          });
        }
        xhr.send();
      } else {
        const {
          constructor: { name: dataType },
        } = data;

        if (dataType === "Object") {
          xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send(data);
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject({ message: "reject error message..." });
        }
      };
      xhr.onerror = () => {
        reject({ message: "reject error message..." });
      };
      xhr.onprogress = (event) => {
        console.log(`Received ${event.loaded} of ${event.total}`);
      };
    });
  };

  return {
    get: (url, data = undefined) => {
      return _get(url, data);
    },
    post: (url, data = undefined, headers = undefined) => {
      return _post(url, data, headers);
    },
  };
};

export default new RealXMLRequest();
