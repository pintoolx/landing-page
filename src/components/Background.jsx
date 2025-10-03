import React from 'react';
import imgGroup from '/images/imgGroup.svg';
import imgVector from '/images/imgVector.svg';
import imgVector1 from '/images/imgVector1.svg';


export default function Background() {
  return (
    <div className="relative size-full" data-name="bg" data-node-id="12:162">
      <div className="absolute contents inset-0" data-name="Group" data-node-id="12:163">
        <div className="absolute contents inset-0" data-name="?惜 1" data-node-id="12:164">
          <div className="absolute contents inset-0" data-name="Clip path group" data-node-id="12:165">
            <div className="absolute bottom-0 contents left-[-22.07%] right-[-22.07%] top-0" data-name="Group" data-node-id="12:168">
              <div
                className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[1280px_1439px]"
                data-name="Vector"
                data-node-id="12:169"
                style={{ maskImage: `url('${imgVector}')` }}
              >
                <img alt="" className="block max-w-none size-full" src={imgVector1} />
              </div>
              <div
                className="absolute bottom-0 left-[-22.07%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[282.533px_0px] mask-size-[1280px_1439px] mix-blend-color-dodge right-[-22.07%] top-0"
                data-name="Group"
                data-node-id="12:170"
                style={{ maskImage: `url('${imgGroup}')` }}
              >
                <img alt="" className="block max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


