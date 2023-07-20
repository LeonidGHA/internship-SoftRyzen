import { ReactNode } from 'react';
import cn from 'classnames';

import s from './Title.module.scss';

interface IProps {
  Tag: 'h1' | 'h2';
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export const Title = ({ Tag, children, accent, className }: IProps) => {
  return (
    <Tag
      className={cn(
        s.title,
        { [s.mainTitle]: Tag === 'h1', [s.subTitle]: Tag === 'h2', [s.accent]: accent },
        className
      )}
    >
      {children}
    </Tag>
  );
};
