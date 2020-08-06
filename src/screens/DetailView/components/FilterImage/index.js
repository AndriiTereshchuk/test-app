import React from 'react';
import { Surface} from "gl-react-native";
import Sepia from './Sepia';
import Blur from './Blur';
import Negative from './Negative';
import Saturation from './Saturation';

type Props = {
    imageUrl: string,
    width: number,
    height: number,

    factor: number,
    sepia: number,
    negative: number,
    saturation: number,
}

const BlurImage = (props: Props) => {
    const {
        imageUrl,
        width,
        height,
        sepia,
        factor,
        negative,
        saturation,
    } = props;
    console.log(imageUrl, 'imageUrl')
    return(
        <Surface style={{  width, height, }}>
            <Blur factor={factor}>
                <Sepia sepia={sepia}>
                    <Negative factor={negative}>
                        <Saturation saturation={saturation}>
                            {{ uri: imageUrl }}
                        </Saturation>
                    </Negative>
                </Sepia>
            </Blur>
        </Surface>
    )
}



export default BlurImage;