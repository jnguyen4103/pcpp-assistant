import React from "react";
import { Box, Typography } from "@material-ui/core";
import AndroidIcon from '@material-ui/icons/Android';
import useStyles from './styles';

const Header = () => {
  const styles = useStyles();
  return (
    <Box className={styles.container}>
      <Box className={styles.logoContainer}>
        <AndroidIcon className={styles.logoIcon} />
        <Typography className={styles.logoText}>PCPP-ASSISTANT</Typography>
      </Box>
      <Typography className={styles.accountText}>sign in | register</Typography>
    </Box>
  );
};

export default Header;
