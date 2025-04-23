import {forwardRef} from 'react';

import {Action, ActionProps} from '../Action';
import { GripVertical } from 'lucide-react';

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <Action
        ref={ref}
        cursor="grab"
        data-cypress="draggable-handle"
        {...props}
      >
        <GripVertical width={20} />
      </Action>
    );
  }
);
