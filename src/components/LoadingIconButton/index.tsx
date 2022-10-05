import { FC } from 'react';
import { Box, CircularProgress, Button, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export interface LoadingIconButtonProps {
  onClick: () => void;
  isLoaded: boolean;
  isLoading: boolean;
  title: string;
  actionIcon: JSX.Element;
  disabled?: boolean;
}

export const LoadingIconButton: FC<LoadingIconButtonProps> = ({ onClick, isLoaded, isLoading, disabled, title, actionIcon }) => {
  return (
    <Box>
      <Button onClick={onClick} disabled={disabled}>
        <Typography variant='body2' sx={{ mr: 1 }}>
          {title}
        </Typography>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : isLoaded ? (
          <CheckIcon />
        ) : actionIcon}
      </Button>
    </Box>
  );
};

export default LoadingIconButton;