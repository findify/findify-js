
import debug from 'debug';

export const injectComponents = async (components) => {
    console.log('[MJS]: inject updated components', components);
    const newComponents = Object.keys(components).reduce((acc: any[], k) => {
        const key = components[k].hash ? components[k].hash : k;
        let component;
        if (!components[k]) {
            return acc;
        } else if (typeof components[k] === 'string') {
            component = new Function('return ' + components[k]);
        } else if (typeof components[k] === 'object') {
            component = typeof components[k].code === 'string' ? new Function('return ' + components[k].code) : components[k].code;
        }
        acc[key] = component;
        return acc;
    }, [])
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
