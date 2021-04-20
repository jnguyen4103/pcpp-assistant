/* eslint-disable react/prop-types */
import React from 'react';
import Header from 'components/Header';
import { Box, Card, Typography } from '@material-ui/core';
import useStyles from './styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const ResultPageView = (props) => {
    const styles = useStyles();

    const DisplayParts = (part, key) => {
        return (
            <Card className={styles.partContainer} variant="outlined" key={key}>
                <Box className={styles.leftContainer}>
                    <Typography className={styles.partLabel}>{part}</Typography>
                </Box>
                <Box className={styles.middleContainer}>
                    {props.parts[part].image != '' ? (
                        <img
                            src={props.parts[part].image}
                            className={styles.image}
                        />
                    ) : (
                        <img
                            src="https://blackmantkd.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                            className={styles.image}
                        />
                    )}
                    <Typography className={styles.partName}>
                        {props.parts[part].name}
                    </Typography>
                </Box>
                <Box className={styles.rightContainer}>
                    <Box>
                        <Typography className={styles.priceAndStore}>
                            {props.parts[part].price}
                        </Typography>
                        <Typography className={styles.priceAndStore}>
                            {props.parts[part].store}
                        </Typography>
                    </Box>
                    <ShoppingCartIcon
                        className={styles.cartIcon}
                        onClick={() => {
                            window.open(props.parts[part].link);
                        }}
                    />
                </Box>
            </Card>
        );
    };

    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Box className={styles.contentContainer}>
                    {Object.keys(props.parts).map((part, key) =>
                        DisplayParts(part, key)
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ResultPageView;
