import { readFile } from "node:fs/promises";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
export default async function Page() {
 const markdown = await readFile(process.cwd() + "/../README.md", "utf8");
 const html = sanitizeHtml(marked.parse(markdown), { allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "table", "thead", "tbody", "tr", "th", "td", "pre", "code"], allowedAttributes: { a: ["href", "name", "target", "rel"], img: ["src", "alt", "title", "width", "height"], "*": ["id"] }, allowedSchemes: ["http", "https", "mailto"] });
 return <main><article dangerouslySetInnerHTML={{__html:html}} /></main>;
}
