//æøå
//libary made by me to handle cookies in the browser
export class Cookie {
    public static getCookie(cname: string): string | null {
        let name: string = cname + "=";
        let decodedCookie: string = decodeURIComponent(document.cookie);
        let ca: string[] = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            let c: string = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }
    public static setCookie(cname: string, cvalue: string | null, exsec: number): void {
        if (cvalue == null) {
            cvalue = "";
        }

        let d: Date = new Date();
        d.setTime(d.getTime() + (exsec * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
}