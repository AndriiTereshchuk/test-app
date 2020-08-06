// @flow
import React from 'react';
import { Node, Shaders } from 'gl-react';

type Props = {
    factor: number,
}


const shaders = Shaders.create({
    Negative: {
        frag: `precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float factor;
void main () {
  vec4 c = texture2D(t, uv);
  gl_FragColor = vec4(mix(c.rgb, 1.0 - c.rgb, factor), c.a);
}`
    }
});

const Colorify =  ({ children: t, factor }) => {
    return(
        <Node
            shader={shaders.Negative}
            uniforms={{ t, factor }}
        />
    )
};

export default (props: Props) => {
    const { factor } = props
    return(
        <Colorify factor={factor} >
            {props.children}
        </Colorify>
    )
}