
import debug from 'debug';

export const injectComponents = async (components) => {
    console.log('[MJS]: inject updated components', components);
    const newComponents = Object.keys(components).reduce((acc: { [key: string]: any }, k) => {
        const key = components[k].hash ? components[k].hash : k;
        const component = components[k].code ? components[k].code : (typeof components[k] === 'string' ? new Function('return ' + components[k]) : components[k]);
        acc[key] = component;
        return acc;
    }, {})
    window.findifyJsonp.push([['extra'], newComponents]);
    await __root.invalidate();
    debug('bundle')('customizations:', newComponents.toString());
}

export const injectStyles = ({ compiled }) => {
    if (compiled) {
        console.log('[MJS]: inject new styles');
        let styleTag = document.createElement('style');
        document.body.appendChild(styleTag);

        //Remove previous styleTag
        const element = document.getElementById('findify-styles');
        if (element && element.parentNode) element.parentNode.removeChild(element);

        styleTag.innerHTML = compiled;
    }
}
