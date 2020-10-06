import React from 'react';

import './index.scss';

function CSvgIcon(props){
    props.iconClass = {
        type: String,
        required: true
    }

    props.className = {
        type: String
    }

    const iconName = useMemo(() => {
        return `#icon-${iconClass}`;
    }, [iconClass]);

    const svgClass = useMemo(() => {
        if(className){
            return 'svg-icon' + className;
        }else {
            return 'svg-icon';
        }
    }, [className]);
    
    return(
        <svg className={`${svgClass}`} aria-hidden="true">
            <use xlinkHref={iconName}></use>
        </svg>
    )
}
export { CSvgIcon };