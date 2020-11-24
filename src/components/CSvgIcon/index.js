import React, { useMemo } from 'react';
import './index.scss';
import icons from '../../icons/svg/icons.svg';
function CSvgIcon(props){
    const {iconClass,className} = props;

    const iconName = useMemo(() => {
        return `${icons}#${iconClass}`;
    }, [iconClass]);

    const svgClass = useMemo(() => {
        if(className){
            return 'svg-icon anticon ' + className;
        }else {
            return 'svg-icon anticon ';
        }
    }, [className]);
    
    return( 
        <svg className={svgClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink" >
            <use xlinkHref={iconName} fill="currentColor"></use>
        </svg>
        

    )
}
export default CSvgIcon ;