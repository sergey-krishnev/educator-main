import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './TreeItem.module.css';
import { Handle } from '../Handle';
import { Action, ActionProps } from '../Action';
import { ChevronDown } from 'lucide-react';
import { AddTheory } from '@/features/theories/add-theory';
import { UniqueIdentifier } from '@dnd-kit/core';
import EditTheory from '@/features/theories/edit-theory';
import DeleteTheory from '@/features/theories/delete-theory';

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
      content,
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
            className="text-foreground text-base font-medium mr-2"
          >
            {value}
          </span>
          {!clone &&
            <div className='flex items-center gap-1 ml-auto'>
              <AddTheory skillId={props.skill as number} parentTheory={{ id: id, title: value }} />
              <EditTheory theory={{ id: id, title: value, content: content }}/>
              <DeleteTheory onRemove={onRemove} theory={{id: id, title: value}}/> 
            </div>}
          {clone && childCount && childCount > 1 ? (
            <span className={styles.Count}>{childCount}</span>
          ) : null}
        </div>
      </li>
    );
  }
);