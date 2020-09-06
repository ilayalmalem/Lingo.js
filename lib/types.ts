export interface Component {
    name: String,
}

export interface DOMparser {

}

export type LingoDOMobject = {
    name: String,
    className: String,
    id: String,
    parent?: HTMLElement,
    children?: NodeList,
    hasChildren: Boolean,
    hasParent: Boolean,
}

export default Component;