import { Trash2 } from 'lucide-react';
import {Action, ActionProps} from '../Action';

export function Remove(props: ActionProps) {
  return (
    <Action
      {...props}
    >
      <Trash2 width={20} />
    </Action>
  );
}
