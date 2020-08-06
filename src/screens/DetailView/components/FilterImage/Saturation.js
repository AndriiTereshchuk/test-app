// @flow
import React from 'react';
import { Node, Shaders } from 'gl-react';

type Props = {
    saturation: number
}

const shaders = Shaders.create({
    Saturation: {
        frag: `precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float contrast;
uniform float saturation;
uniform float brightness;
const vec3 L = vec3(0.2125, 0.7154, 0.0721);
void main () {
  vec4 c = texture2D(t, uv);
	vec3 brt = c.rgb * brightness;
	gl_FragColor = vec4(mix(
    vec3(0.5),
    mix(vec3(dot(brt, L)), brt, saturation),
    contrast), c.a);
}`
    }
});

const Colorify =  ({ children: t, saturation }) => {
    return(
        <Node
            shader={shaders.Saturation}
            uniforms={{ t, saturation, contrast: 1, brightness: 1 }}
        />
    )
};

export default (props: Props) => {
    const { saturation } = props;

    return (
        <Colorify saturation={saturation}>
            {props.children}
        </Colorify>
    )
}