import React from 'react';
import Header from 'components/Header';
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';
import parts from 'data/test1';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const ResultPageView = () => {
    const styles = useStyles();

    const DisplayParts = (part) => {
        return (
            <Box className={styles.partContainer}>
                <Box className={styles.leftContainer}>
                    <Typography className={styles.partLabel}>{part}</Typography>
                </Box>
                <Box className={styles.middleContainer}>
                    <img src={parts[part].image} className={styles.image} />
                    <Typography className={styles.partName}>
                        {parts[part].name}
                    </Typography>
                </Box>
                <Box className={styles.rightContainer}>
                    <Box>
                        <Typography className={styles.priceAndStore}>
                            {parts[part].price}
                        </Typography>
                        <Typography className={styles.priceAndStore}>
                            {parts[part].store}
                        </Typography>
                    </Box>
                    <ShoppingCartIcon
                        className={styles.cartIcon}
                        onClick={() => {
                            window.open(parts[part].link);
                        }}
                    />
                </Box>
            </Box>
        );
    };

    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Box className={styles.contentContainer}>
                    {Object.keys(parts).map((part) => DisplayParts(part))}
                </Box>
            </Box>
        </Box>
    );
};

export default ResultPageView;
