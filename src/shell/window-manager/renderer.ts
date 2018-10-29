import * as React from 'react';

export class Renderer {

    public static render(jsx: any): JSX.Element {
        if (jsx && typeof jsx === 'object') {
            if (Array.isArray(jsx)) {
                jsx = jsx.map(el => el = React.createElement(el.type, Object.assign({}, el.props), el.props ? Renderer.render(el.props.children) : null))
            }
            else {
                jsx = React.createElement(jsx.type, Object.assign({}, jsx.props), jsx.props ? Renderer.render(jsx.props.children) : null);
            }
        }
        return jsx;
    }
}