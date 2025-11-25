export class MyHtml {

    constructor() {}

    static createElement(type, style) {
        const element = document.createElement(type);
        element.classList.add(style);
        return element;
    }

    static createSubElement(parent, type, styles, numElements, direction) {
        const element = document.createElement(type);
        if (styles)
        {
            for (const style of styles.split(" "))
                element.classList.add(style);
        }
        if (numElements && numElements > 1)
        {
            if (direction === "hor" || null) // row
                element.style.width = (100 / numElements) + "%";
            if (direction === "ver" || null) // column
                element.style.height = (100 / numElements) + "%";
        }
        parent.appendChild(element);
        return element;
    }
}