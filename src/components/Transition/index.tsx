import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export const InnerTransition = (
  props: TransitionProps & {
    children: JSX.Element;
  },
  ref: React.Ref<any>,
) => {
  return <Slide direction='up' ref={ref} {...props} />;
}

export const Transition = forwardRef(InnerTransition);

export default Transition;