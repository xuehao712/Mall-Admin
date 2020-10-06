import React, { useRef, useState } from 'react';

import './index.scss';

function CScrollbar({ children }){
    
    const [top,setTop] = useState(0);

    const scrollContainer = useRef();
    const scrollWrapper = useRef();
    let handleScroll = (e) =>{
        const eventDelta = e.wheelDelta || -e.deltaY * 3;
        const $container = scrollContainer.current;
        const $containerHeight = $container.offsetHeight;
        const $wrapper = scrollWrapper.current;
        const $wrapperHeight = $wrapper.offsetHeight;
        if (eventDelta > 0) {
            setTop(Math.min(0, top + eventDelta));
        } else {
            if ($containerHeight - delta < $wrapperHeight) {
              if (this.top < -($wrapperHeight - $containerHeight + delta)) {
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
        <div className="scroll-container" ref={scrollContainer} onWheel={handleScroll}>
            <div className="scroll-wrapper" ref={scrollWrapper} style={{top:top}}>
                { children }
            </div>
        </div>
    )
}
export { CScrollbar };