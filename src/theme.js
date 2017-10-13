/**
 * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
 */

import {
    pink500, pink700,
    cyanA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from '../node_modules/material-ui/styles/colors';
import {fade} from '../node_modules/material-ui/utils/colorManipulator';
import spacing from '../node_modules/material-ui/styles/spacing';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: pink500,
        primary2Color: pink700,
        primary3Color: grey400,
        accent1Color: cyanA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        secondaryTextColor: fade(darkBlack, 0.54),
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: pink500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
};