export interface ILink {
    Relation: string;
    HREF: string;
    Title: string;
    Method: "GET" | "PUT" | "POST" | "DELETE";
}

export namespace ILink {

    export function getEmptyLink(): ILink {
        return {
            "Relation": "",
            "HREF": "#",
            "Title": "",
            "Method": "GET"
        };
    }

    export function setQueryTerms(link: ILink | undefined, queryTerms: { "key": string; "value": string }[]) {
        if (link && link.HREF && queryTerms) {
            return {
                "Relation": link.Relation,
                "HREF": `${link.HREF}${link.HREF.indexOf("?") === -1 ? "?" : "&"}${queryTerms.map((queryTerm) => {
                    if (queryTerm && queryTerm.key && queryTerm.value) {
                        return `${queryTerm.key}=${queryTerm.value}`;
                    } else {
                        return "";
                    }
                }).join("&")}`,
                "Title": link.Title,
                "Method": link.Method
            };
        } else {
            return link;
        }
    }

}
