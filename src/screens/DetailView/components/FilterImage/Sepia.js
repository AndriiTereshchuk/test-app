import React, { Component } from "react";
import { Shaders, Node, GLSL } from "gl-react";

type Props = {
    sepia: number,
}

const shaders = Shaders.create({
    colorify: {
        frag: GLSL`
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        uniform mat4 sepia;
        void main () {
            gl_FragColor = sepia * texture2D(t, uv);
        }`
    }
});

const Colorify =  ({ children: t, sepia: s }) => {
    const mixArrays = (arr1, arr2, m) => arr1.map((v, i) => (1-m) * v + m * arr2[i]);
    const sepia = mixArrays([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ], [
        .3, .3, .3, 0,
        .6, .6, .6, 0,
        .1, .1, .1, 0,
        0.2, 0, -0.2, 1
    ], s);
    return(
        <Node
            shader={shaders.colorify}
            uniforms={{ t, sepia }}
        />
    )
};

export default (props: Props) => {
    const { sepia } = props;
    return (
        <Colorify sepia={sepia}>
            {props.children}
        </Colorify>
    )
}