//æøå
//libary made by me to formart fetch requests so that the asp.net core mvc server understands the request
export class Http {
    public static post<T>(url: string, data: any): Promise<T> {
        return fetch(url, {
            body: Object.keys(data).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&"),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: 'POST',
        }).then(async response => {
            data = await response.text();
            try {
                return JSON.parse(data);
            }
            catch (ex) {
                throw new Error("response not compatable: " + data);
            }
        });
    }
}