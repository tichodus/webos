import * as React from 'react';

export class Renderer {

   public static render(jsx: any): JSX.Element {
        if (jsx && typeof jsx === 'object'){
            jsx = React.createElement(jsx.type, Object.assign({}, jsx.props), Renderer.render(jsx.props.children));
        }
        return jsx;
    }
}