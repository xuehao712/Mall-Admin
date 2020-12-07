import React, { useRef, useState } from 'react';

import './index.scss';

function CScrollbar(props){
    const {className} = props;
    const delta = 15;
    const [top,setTop] = useState(0);

    const scrollContainer = useRef();
    const scrollWrapper = useRef();
    let handleScroll = (e) =>{
        const eventDelta = e.wheelDelta || -e.deltaY * 3;
        const $container = scrollContainer;
        const $containerHeight = $container.offsetHeight;
        const $wrapper = scrollWrapper;
        const $wrapperHeight = $wrapper.offsetHeight;
        if (eventDelta > 0) {
            setTop(Math.min(0, top + eventDelta));
        } else {
            if ($containerHeight - delta < $wrapperHeight) {
              if (top < -($wrapperHeight - $containerHeight + delta)) {
                setTop(top);
              } else {
                setTop(Math.max(top + eventDelta, $containerHeight - $wrapperHeight - delta));
              }
            } else {
                setTop(0);
            }
        }
    }
    return(
        <div className={`scroll-container ${className}`} ref={scrollContainer} onWheel={handleScroll}>
            <div className="scroll-wrapper" ref={scrollWrapper} style={{top:top+'px'}}>
                {props.children}
            </div>
        </div>
    )
}
export default CScrollbar;