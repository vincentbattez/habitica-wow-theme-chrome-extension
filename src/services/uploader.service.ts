import { blobToBase64 } from "../utils/string.utils";

export const UploaderService = {
  image: (blob: string): Promise<string> => {
    const url = 'https://api.imgur.com/3/image'
    const headers = new Headers();
    const body = new FormData();

    body.append("image", blobToBase64(blob));
    headers.append("Authorization", `Client-ID ${process.env.IMGUR_CLIENT_ID}`);

    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow'
    };

    return fetch(url, requestOptions)
      .then(response => {
        console.log("✅️ uploadToImgur")
        return response.json()
      })
      .then(result => result.data.link)
      .catch(error => {
        console.log("error", error)
        return blob
      });
  }
}
