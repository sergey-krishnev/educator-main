import {forwardRef} from 'react';

import {Action, ActionProps} from '../Action';
import { GripVertical } from 'lucide-react';

export const Handle = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <Action
        className="text-muted-foreground hover:text-foreground cursor-pointer"
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
