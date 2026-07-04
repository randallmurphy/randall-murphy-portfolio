declare module 'react-vertical-timeline-component' {
  import { ReactNode, CSSProperties } from 'react';

  interface VerticalTimelineProps {
    animate?: boolean;
    className?: string;
    layout?: '1-column' | '1-column-left' | '2-columns';
    lineColor?: string;
    children?: ReactNode;
  }

  interface VerticalTimelineElementProps {
    children?: ReactNode;
    className?: string;
    contentArrowStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    date?: ReactNode;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconOnClick?: () => void;
    iconStyle?: CSSProperties;
    id?: string;
    onTimelineElementClick?: () => void;
    position?: string;
    style?: CSSProperties;
    textClassName?: string;
    visible?: boolean;
  }

  export const VerticalTimeline: React.FC<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps>;
}
