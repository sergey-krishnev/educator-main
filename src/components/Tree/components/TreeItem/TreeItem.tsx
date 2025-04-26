import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './TreeItem.module.css';
import { Handle } from '../Handle';
import { Action, ActionProps } from '../Action';
import { ChevronDown, Pencil, Trash2 } from 'lucide-react';
import { AddTheory } from '@/features/theories/add-theory';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  id: UniqueIdentifier;
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  skill?: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: ActionProps;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    return (
      <li
        className={classNames(
          styles.Wrapper,
          clone && styles.clone,
          ghost && styles.ghost,
          indicator && styles.indicator,
          disableSelection && styles.disableSelection,
          disableInteraction && styles.disableInteraction
        )}
        ref={wrapperRef}
        style={
          {
            '--spacing': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className={styles.TreeItem} ref={ref} style={style}>
          <Handle {...handleProps} />
          {onCollapse && (
            <Action
              onClick={onCollapse}
              className={classNames(
                'text-muted-foreground hover:text-foreground cursor-pointer',
                styles.Collapse,
                collapsed && styles.collapsed
              )}
            >
              <ChevronDown width={20} />
            </Action>
          )}
          <span
            className="text-foreground text-base font-medium"
            style={{ maxWidth: '170px', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            title={value.length > 20 ? value : undefined}
          >
            {value}
          </span>
          {!clone &&
            <div className='flex items-center gap-1 ml-auto'>
              <AddTheory skillId={props.skill as number} parentTheory={{ id: id, title: value }} />
              <button className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => { }}
              >
                <Pencil width={18} />
              </button>
              <button className="text-muted-foreground hover:text-destructive cursor-pointer"
                onClick={onRemove}
              >
                <Trash2 width={18} />
              </button>
            </div>}
          {clone && childCount && childCount > 1 ? (
            <span className={styles.Count}>{childCount}</span>
          ) : null}
        </div>
      </li>
    );
  }
);